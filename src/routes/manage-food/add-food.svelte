<svelte:head>
	<title>Food</title>
</svelte:head>

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

	input[type='number'] {
		width: 100px;
	}
	.add {
		margin-top: 20px;
	}
</style>

<script>
	import { onMount } from 'svelte';

	let name = ''
	let protein = ''
  let carbs = ''
  let fat = ''
	let food = []
	let oldName = ''
	let errorMessage = ''
	let successMessage = ''


	function validate() {
		errorMessage = ''

		if(name === '') {
			errorMessage = 'Name is missing'
			return false
		}

		if(protein === '') {
			errorMessage = 'Protein is missing'
			return false
		}

		if(!Number.isInteger(Number(protein))) {
			errorMessage = 'Protein should be a number'
			return false
		}

		if(carbs === '') {
			errorMessage = 'Carbs is missing'
			return false
		}

		if(!Number.isInteger(Number(carbs))) {
			errorMessage = 'Carbs should be a number'
			return false
		}

		if(fat === '') {
			errorMessage = 'Fat is missing'
			return false
		}

		if(!Number.isInteger(Number(fat))) {
			errorMessage = 'Fat should be a number'
			return false
		}

		return true
	}

	function handleAddUpdate() {
		successMessage = ''
		errorMessage = ''

		let valid = validate()
		if(!valid) {
			return
		}

		// save in the browser
		const allFood = JSON.parse(localStorage.getItem('food')) || []
		allFood.push({name, protein, carbs, fat})
		localStorage.setItem('food', JSON.stringify(allFood))
		food = allFood
		name = ''
		protein = ''
		carbs = ''
		fat = ''
		successMessage = 'Food was added'
		event.preventDefault()
		return
	}

	onMount(async () => {
		food = JSON.parse(localStorage.getItem('food')) || []
	})

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


<h2>Add Food</h2>

{#if successMessage !== ''}
	<p class='success'>{successMessage}</p>
{/if}

{#if errorMessage !== ''}
	<p class='error'>{errorMessage}</p>
{/if}

<form>
	<input type="text" bind:value={name} placeholder="Name" maxlength="20" size="20"/>
	<input type="number" bind:value={protein} placeholder="Protein" on:keyup={validateProtein} min="0" max="999"/>
	<input type="number" bind:value={carbs} placeholder="Carbs" on:keyup={validateCarbs} min="0" max="999"/>
	<input type="number"  bind:value={fat} placeholder="Fat" on:keyup={validateFat} min="0" max="999"/>
	<br />
	<input class='add' type="button" value="Add" on:click={handleAddUpdate} maxlength="2" size="2" />
</form>
