<svelte:head>
	<title>Add Food</title>
</svelte:head>

<script>
	import { onMount } from 'svelte';
	import { validate, foodExist } from './validate.js';
	import { addFoodToRecent } from './recentFood.js';

	let name = ''
	let protein = ''
  let carbs = ''
  let fat = ''
	let food = []
	let recentFood = []
	let oldName = ''
	let errorMessage = ''
	let successMessage = ''

	function handleAdd() {
		event.preventDefault()

		let validReturn = {}

		successMessage = ''
		errorMessage = ''

		validReturn = validate({name, protein, carbs, fat})

		if(!validReturn.valid) {
			errorMessage = validReturn.message
			console.log('error', errorMessage)
			return
		}

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
	}

	onMount(async () => {
		const sortAlpha = (a, b) => {
			return a.name > b.name
		}

		food = JSON.parse(localStorage.getItem('food')) || []
		recentFood = JSON.parse(localStorage.getItem('recentFood') || '[]').sort(sortAlpha) || []
	})

	function validateProtein() {
		// only 4 chars are allowed - 43.22 and only numbers
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

	input {
		font-size: 100%;
	}
	form input {
		font-size: 150%;
		padding: 5px;
		margin-bottom: 5px;
	}
	form input[type=number], form input[type=text] {
		padding: 5px;
		margin-bottom: 5px;
		@apply bg-gray-200;
	}
	input[type='number'] {
		width: 100px;
	}
</style>

<h2 class="text-xl mb-2">Add Food</h2>

{#if successMessage !== ''}
	<p class='success'>{successMessage}</p>
{/if}

{#if errorMessage !== ''}
	<p class='error'>{errorMessage}</p>
{/if}

<form>
	<input type="text" bind:value={name} placeholder="Name" maxlength="20" size="20"/>
	<br />
	<input type="number" bind:value={protein} placeholder="Protein" on:keyup={validateProtein} min="0" max="999"/>
	<br />
	<input type="number" bind:value={carbs} placeholder="Carbs" on:keyup={validateCarbs} min="0" max="999"/>
	<br />
	<input type="number"  bind:value={fat} placeholder="Fat" on:keyup={validateFat} min="0" max="999"/>
	<br />
	<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3" on:click|preventDefault={handleAdd}>Add</button>
</form>
