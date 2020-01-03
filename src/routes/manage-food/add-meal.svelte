<svelte:head>
	<title>Update Food</title>
</svelte:head>

<script>
	import { onMount } from 'svelte';
	import { validateMeal, foodExist } from './validate.js';
	import Icon from 'svelte-awesome/components/Icon.svelte'
  import { plus, trash } from 'svelte-awesome/icons';
	import { addFoodToRecent } from './recentFood.js';
	import { countCalories } from './helpers.js';

	let name = ''
	let food = []
	let mode = 'view'
	let oldName = ''
	let errorMessage = ''
	let successMessage = ''
	let showUpdateForm = false
	let filter = ''
	let filteredFood = []
	let recentFood = []
	let meal = {name: '', protein: 0, carbs: 0, fat: 0, food: []}
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

	function handleAdd() {
		event.preventDefault()

		successMessage = ''
		errorMessage = ''

		const index = foodExist(name, food)
		console.log(name)
		console.log(food)
		console.log(index)
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

	function handleFoodClick(food) {
		// if food exist, increment the count
		const index = foodExist(food.name, foodForMeal)
		if (index !== -1) {
			foodForMeal[index].count = foodForMeal[index].count + 1
		} else {
			food.count = 1
			foodForMeal.push(food)
		}

		foodForMeal = foodForMeal // needed for svelte

		meal.protein = meal.protein + food.protein
		meal.carbs = meal.carbs + food.carbs
		meal.fat = meal.fat + food.fat

		meal.food.push(food)

		const result = countCalories(foodForMeal)
		protein = result.protein
		carbs = result.carbs
		fat = result.fat
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

	function handleDelete(foodItem) {
		let filtered = foodForMeal.filter(function(f, index, arr){
			return f.name !== foodItem.name;
		});

		foodForMeal = filtered

		const result = countCalories(foodForMeal)
		protein = result.protein
		carbs = result.carbs
		fat = result.fat
	}

	function handlePlus(foodClicked) {
		let index = foodForMeal.findIndex(f => f.name === foodClicked.name);

		foodForMeal[index].count = foodForMeal[index].count + 1

		const result = countCalories(foodForMeal)
		protein = result.protein
		carbs = result.carbs
		fat = result.fat

	}
</script>

<style>
	.success {
		color: green;
	}
	.error {
		color: red;
	}
	input[type=text] {
		padding: 5px;
		margin-bottom: 5px;
		@apply bg-gray-200;
		font-size: 150%;
	}
	.filter {
		font-size: 150%;
		margin-bottom: 10px;
	}
	.box {
		@apply bg-blue-100;
		padding: 10px;
		margin-bottom: 10px;
	}
	.ate-wrapper {
		display: grid;
		grid-template-columns: 25px 70% 5% auto;
		padding-bottom: 75px;
		grid-row-gap: 4px;
	}
</style>

<h2 class="text-xl mb-2">Add Meal</h2>

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
	<input type="text" bind:value={name} placeholder="Name" maxlength="20" size="20"/>
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
			<button class="text-red-400 text-left" href="#" on:click|preventDefault={() => handleDelete(foodForMeal[i])}><Icon data={trash}/></button>
			<div>{name}</div>
			<div class="">{count}</div>
			<button class="" href="#" on:click|preventDefault={() => handlePlus(foodForMeal[i])}><Icon data={plus}/></button>
		{/each}
	</div>
	<button class="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 mb-3" on:click|preventDefault={handleAdd}>Add</button>
	<input bind:value={filter} class='filter bg-gray-200 w-24 px-2' type='text' placeholder='Search' on:input={handleFilter} maxlength="5" size="3" />
	<div class="pb-6">
		{#each filteredFood as { id, name }, i}
			<button class='box w-full' on:click={() => handleFoodClick(food[i])}>{name}</button>
		{/each}
	</div>
{/if}
