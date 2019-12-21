<svelte:head>
	<title>Update Food</title>
</svelte:head>


<script>
	import { onMount } from 'svelte';
	import { validateMeal } from './validate.js';
	import Icon from 'svelte-awesome/components/Icon.svelte'
  import { trash } from 'svelte-awesome/icons';
	import { addFoodToRecent } from './recentFood.js';

	let name = ''
	let protein = ''
  let carbs = ''
  let fat = ''
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

		/*
		// save in the browser
		const allFood = JSON.parse(localStorage.getItem('food')) || []
		const index = foodExist(name, allFood)
		if (index !== -1) {
			errorMessage = "Food with this name already exist"
			return
		}

		const newFood = {name, protein, carbs, fat}
		allFood.push(newFood)
		localStorage.setItem('food', JSON.stringify(allFood))
		addFoodToRecent(newFood, recentFood)

		food = allFood
		name = ''
		protein = ''
		carbs = ''
		fat = ''
		successMessage = 'Food was added'
		return
		*/
	}

	function handleFoodClick(food) {
		meal.protein = meal.protein + food.protein
		meal.carbs = meal.carbs + food.carbs
		meal.fat = meal.fat + food.fat

		meal.food.push(food)
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
</script>

<style>
	.success {
		color: green;
	}
	.error {
		color: red;
	}
	form input[type=text] {
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
		<form>
			<div><input class="" type="text" bind:value={name} placeholder="Name" maxlength="20" size="20"/></div>

			<div class="mt-3">
				<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3" on:click|preventDefault={handleAdd}>Add</button>
			</div>
		</form>

		<input bind:value={filter} class='filter bg-gray-200 w-24 px-2' type='text' placeholder='Search' on:input={handleFilter} maxlength="5" size="3" />
		<div style="margin-top: {food.length >=10 ? 0 : 20}px;">
			{#each filteredFood as { id, name }, i}
			<div class='box'>
				<button on:click={() => handleFoodClick(food[i])}>{name}</button>
			</div>
			{/each}
		</div>
{/if}
