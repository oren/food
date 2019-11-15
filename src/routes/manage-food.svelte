<svelte:head>
	<title>Food</title>
</svelte:head>

<style>
	.food {
		margin-top: 20px
	}
	.success {
		color: green;
	}
	.error {
		color: red;
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

	$: buttonValue = mode === 'add'? 'Add' : 'Update'

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

		if(mode === 'add') {
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

		// update food
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
</script>


{#if mode === "add"}
<h1>Add Food</h1>
{:else}
<h1>Update Food</h1>
{/if}

{#if successMessage !== ''}
	<p class='success'>{successMessage}</p>
{/if}

{#if errorMessage !== ''}
	<p class='error'>{errorMessage}</p>
{/if}

<form>
		<input type="text" bind:value={name} placeholder="Name"/>
	<br />
		<input type="text" bind:value={protein} placeholder="Protein"/>
	<br />
		<input type="text" bind:value={carbs} placeholder="Carbs"/>
	<br />
		<input type="text"  bind:value={fat} placeholder="Fat"/>
	<br />
	<br />
	<input type="button" value={buttonValue} on:click={handleAddUpdate} />
	{#if mode === "update"}
		<input type="button" value="delete" on:click={handleDelete} />
	{/if}
</form>

{#if food.length !== 0}
	<h1 class='food'>Food</h1>
	<p>Click food to update</p>
{/if}


{#each food as { id, name }, i}
	<button on:click={() => handleFoodClick(food[i])}>{name}</button>
{/each}
