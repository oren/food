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
	input, button {
		font-size: 100%;
	}
	input[type='number'] {
		width: 100px;
	}
	.food {
		margin-bottom: 0px;
	}
	.wrapper {
		display: grid;
		grid-template-columns: fit-content;
		grid-gap: 5px;
	}

	.box {
		border: 1px solid black;
		padding: 10px;
	}
</style>

<script>
	import { onMount } from 'svelte';

	let name = ''
	let protein = ''
  let carbs = ''
  let fat = ''
	let food = []
	let mode = 'add'
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

	function handleUpdate() {
		successMessage = ''
		errorMessage = ''

		let valid = validate()
		if(!valid) {
			return
		}

		let index = food.findIndex(f => f.name === oldName);
		console.log(index)
		console.log(oldName)

		food[index].name = name
		food[index].protein = protein
		food[index].carbs = carbs
		food[index].fat = fat

		localStorage.setItem('food', JSON.stringify(food))
		successMessage = 'Food was updated'
	}

	onMount(async () => {
		food = JSON.parse(localStorage.getItem('food')) || []
	})

	function handleFoodClick(food) {
		successMessage = ''
		errorMessage = ''

		oldName = food.name
		name = food.name
		protein = food.protein
		carbs = food.carbs
		fat = food.fat
		mode = 'update'
	}

	function handleDelete() {
		successMessage = ''
		errorMessage = ''
		let filtered = food.filter(function(f, index, arr){
			return f.name !== name;
		});

    localStorage.setItem('food', JSON.stringify(filtered))
		food = filtered
		mode = 'add'
		name = ''
		protein = ''
		carbs = ''
		fat = ''
		successMessage = 'Food was deleted'
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


<h2>Update Food</h2>

{#if successMessage !== ''}
	<p class='success'>{successMessage}</p>
{/if}

{#if errorMessage !== ''}
	<p class='error'>{errorMessage}</p>
{/if}

{#if food.length === 0}
<p>You have no food. <a href="/food/manage-food/add-food">Add some food first</a>.</p>
{:else}
<form>
	<input type="text" bind:value={name} placeholder="Name" maxlength="20" size="20"/>
	<br />
	<input type="number" bind:value={protein} placeholder="Protein" on:keyup={validateProtein} min="0" max="999"/>
	<br />
	<input type="number" bind:value={carbs} placeholder="Carbs" on:keyup={validateCarbs} min="0" max="999"/>
	<br />
	<input type="number"  bind:value={fat} placeholder="Fat" on:keyup={validateFat} min="0" max="999"/>
	<br />

	{#if mode === "update"}
		<input type="button" value="Update" on:click={handleUpdate} maxlength="2" size="2" />
		<input type="button" value="delete" on:click={handleDelete} />
	{/if}
</form>

<p class='food'>Pick food to update:</p>

<div class="wrapper">
{#each food as { id, name }, i}
	<button class='box' on:click={() => handleFoodClick(food[i])}>{name}</button>
{/each}
</div>
{/if}
