<svelte:head>
	<title>Update Food</title>
</svelte:head>

<script>
	import { onMount } from 'svelte';
	import { validate } from './validate.js';
	import Icon from 'svelte-awesome/components/Icon.svelte'
  import { trash, plus } from 'svelte-awesome/icons';
	import { countCalories } from './helpers.js';

	let name = ''
	let food = []
	let oldName = ''
	let errorMessage = ''
	let successMessage = ''
	let updatingMeal = false
	let formType = 'food' // updatingFood / updatingMeal

	let filter = ''
	let filteredFood = []
	let recentFood = []
	let foodForMeal = []

	let protein = 0
	let carbs = 0
	let fat = 0
	$: calories = parseFloat(Number(protein*4 + carbs*4 + fat*9).toFixed(1))

	onMount(async () => {
		const sortAlpha = (a, b) => {
			return a.name > b.name
		}

		food = JSON.parse(localStorage.getItem('food')).sort(sortAlpha) || []
		recentFood = JSON.parse(localStorage.getItem('recentFood')) || []
		filteredFood = food
	})

	function handleUpdate() {
		filteredFood = food
		filter = ''

		let validReturn = {}

		successMessage = ''
		errorMessage = ''

		validReturn = validate({name, protein, carbs, fat})

		if(!validReturn.valid) {
			errorMessage = validReturn.message
			return
		}

		let index = food.findIndex(f => f.name === oldName);
		food[index].name = name
		food[index].protein = protein
		food[index].carbs = carbs
		food[index].fat = fat
		localStorage.setItem('food', JSON.stringify(food))

		successMessage = 'Food was updated'
		formType = 'food'

		// update recent food
		index = recentFood.findIndex(f => f.name === oldName);
		if(index === -1) return
		recentFood[index].name = name
		recentFood[index].protein = protein
		recentFood[index].carbs = carbs
		recentFood[index].fat = fat
		localStorage.setItem('recentFood', JSON.stringify(recentFood))
	}

	function handleMealUpdate() {
		let index = food.findIndex(f => f.name === name);
		food[index].food = foodForMeal
		localStorage.setItem('food', JSON.stringify(food))
	}

	function handleFoodClick(food) {
		filter = ''

		// if meal - show meal form
		if(food.food) {
			formType = 'updatingMeal'
			foodForMeal = food.food
		} else {
			formType = 'updatingFood'
		}


		successMessage = ''
		errorMessage = ''

		oldName = food.name
		name = food.name
		protein = food.protein
		carbs = food.carbs
		fat = food.fat
	}

	function handleDelete() {
		filteredFood = food
		filter = ''
		successMessage = ''
		errorMessage = ''
		let filtered = food.filter(function(f, index, arr){
			return f.name !== name;
		});

    localStorage.setItem('food', JSON.stringify(filtered))
		food = filtered

		filtered = recentFood.filter(function(f, index, arr){
			return f.name !== name;
		});

    localStorage.setItem('recentFood', JSON.stringify(filtered))
		recentFood = filtered

		name = ''
		protein = ''
		carbs = ''
		fat = ''
		successMessage = 'Food was deleted'
		formType = 'food'
	}

	const handleDeleteAll = () => {
		successMessage = 'All food was deleted'
    localStorage.removeItem('food')
    localStorage.removeItem('recentFood')
		food = []
		filteredFood = []
	}

	function handleFoodDelete(foodItem) {
		filteredFood = food
		filter = ''
		successMessage = ''
		errorMessage = ''

		let filtered = food.filter(function(f, index, arr){
			return f.name !== foodItem.name;
		});

    localStorage.setItem('food', JSON.stringify(filtered))
		food = filtered
		filteredFood = filtered

		filtered = recentFood.filter(function(f, index, arr){
			return f.name !== foodItem.name;
		});

    localStorage.setItem('recentFood', JSON.stringify(filtered))
		recentFood = filtered

		name = ''
		protein = ''
		carbs = ''
		fat = ''
		successMessage = 'Food was deleted'
		formType = 'food'
	}

	function handleFilter() {
		if(filter === '') {
			filteredFood = food
		}

		filteredFood = food.filter(f => f.name.toLowerCase().includes(filter.toLowerCase()));
	}

	function validateProtein() {
		// only 4 chars are allowed - 43.22
		let tmp = String(protein)
		protein = Number(tmp.substring(0,5))
	}
	function validateCarbs() {
		// only 4 chars are allowed - 43.22
		let tmp = String(carbs)
		carbs = Number(tmp.substring(0,5))
	}
	function validateFat() {
		// only 4 chars are allowed - 43.22
		let tmp = String(fat)
		fat = Number(tmp.substring(0,5))
	}

	// Update Meal
	function handleAdd() {
		event.preventDefault()

		successMessage = ''
		errorMessage = ''

		const index = foodExist(name, food)
		if (index !== -1) {
			errorMessage = "Food with this name already exist"
			return
		}

		let validReturn = {}
		meal.name = name
		validReturn = validateMeal(meal)

		if(!validReturn.valid) {
			errorMessage = validReturn.message
			console.log('error', errorMessage)
			return
		}

		food.push(meal)

		localStorage.setItem('food', JSON.stringify(food))
		addFoodToRecent(meal, recentFood)
		foodForMeal = []
	}

	function handlePlus(foodClicked) {
		let index = foodForMeal.findIndex(f => f.name === foodClicked.name);

		foodForMeal[index].count = foodForMeal[index].count + 1

		const result = countCalories(foodForMeal)
		protein = result.protein
		carbs = result.carbs
		fat = result.fat
	}

	function handleDeleteFoodInMeal(foodToDelete) {
		foodForMeal = foodForMeal.filter(f => f.name !== foodToDelete.name)
	}
</script>

<style>
	.success {
		color: green;
	}
	.error {
		color: red;
	}
	input.name {
		padding: 5px;
		margin-bottom: 5px;
		@apply bg-gray-200;
		font-size: 150%;
	}
	form input[type=number], form input[type=text] {
		padding: 5px;
		margin-bottom: 5px;
		@apply bg-gray-200;
		font-size: 150%;
	}
	input[type='number'] {
		width: 100px;
	}
	.filter {
		font-size: 150%;
		margin-bottom: 10px;
	}
	.wrapper {
		display: grid;
		grid-template-columns: 10% 90%;
		grid-gap: 5px;
	}
	.wrapper-meal {
		display: grid;
		grid-template-columns: 100%;
		grid-gap: 5px;
	}
	.box {
		@apply bg-blue-100;
		padding: 10px;
	}
	.ate-wrapper {
		display: grid;
		grid-template-columns: 25px 70% 5% auto;
		padding-bottom: 75px;
		grid-row-gap: 4px;
	}
</style>

{#if formType === 'updatingMeal'}
	<h2 class="text-xl mb-2">Update Meal</h2>
{:else}
	<h2 class="text-xl mb-2">Update Food</h2>
{/if}

{#if successMessage !== ''}
	<p class='success'>{successMessage}</p>
{/if}

{#if errorMessage !== ''}
	<p class='error'>{errorMessage}</p>
{/if}

{#if food.length === 0}
	<p>You have no food.<p>
	<p></p>
{:else}
	{#if formType === 'updatingFood'}
		<form>
			<div><input class="" type="text" bind:value={name} placeholder="Name" maxlength="20" size="20"/></div>
			<div><input type="number" bind:value={protein} placeholder="Protein" on:keyup={validateProtein} min="0" max="999"/></div>
			<div><input type="number" bind:value={carbs} placeholder="Carbs" on:keyup={validateCarbs} min="0" max="999"/></div>
			<div><input type="number"  bind:value={fat} placeholder="Fat" on:keyup={validateFat} min="0" max="999"/></div>

			<div class="mt-3">
				<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3" on:click|preventDefault={handleUpdate}>Update</button>
				<button class="text-red-400 py-1 px-1" on:click={handleDelete}><Icon data={trash}/></button>
			</div>
		</form>
	{/if}

	{#if formType === 'food'}
		<input bind:value={filter} class='filter bg-gray-200 w-24 px-2' type='text' placeholder='Search' on:input={handleFilter} maxlength="5" size="3" />
		<div class="wrapper" style="margin-top: {food.length >=10 ? 0 : 20}px;">
			{#each filteredFood as { id, name }, i}
				<button class="text-red-400" on:click|preventDefault={() => handleFoodDelete(filteredFood[i])}><Icon data={trash}/></button><button class='box' on:click={() => handleFoodClick(filteredFood[i])}>{name}</button>
			{/each}
		</div>
		<div class="pb-10"><button class="bg-red-400 text-white font-bold py-1 px-3 mt-3" on:click={handleDeleteAll}>Delete All<Icon style="margin-left: 0.5rem; margin-bottom: 0.25rem;" data={trash}/></button></div>
	{/if}

	{#if formType === 'updatingMeal'}
		<input class="name" type="text" bind:value={name} placeholder="Name" maxlength="20" size="20"/>
		{#if foodForMeal.length !== 0}
			<div>
				<span>Cal:{Math.round(calories)}</span>
				<span>P:{Math.round(protein)}</span>
				<span>C:{Math.round(carbs)}</span>
				<span>F:{Math.round(fat)}</span>
			</div>
		{/if}
		<div class='ate-wrapper'>
			{#each foodForMeal as { id, name, count }, i}
				<button class="text-red-400 text-left" href="#" on:click|preventDefault={() => handleDeleteFoodInMeal(foodForMeal[i])}><Icon data={trash}/></button>
				<div>{name}</div>
				<div class="">{count}</div>
				<button class="" href="#" on:click|preventDefault={() => handlePlus(foodForMeal[i])}><Icon data={plus}/></button>
			{/each}
		</div>
		<button class="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 mb-3" on:click|preventDefault={handleMealUpdate}>Update</button>
		<input bind:value={filter} class='filter bg-gray-200 w-24 px-2' type='text' placeholder='Search' on:input={handleFilter} maxlength="5" size="3" />
		<div class="wrapper-meal pb-6">
			{#each filteredFood as { id, name }, i}
				<button class='box w-full' on:click={() => handleFoodClick(filteredFood[i])}>{name}</button>
			{/each}
		</div>
	{/if}
{/if}
