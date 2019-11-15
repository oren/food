<svelte:head>
	<title>Food</title>
</svelte:head>

<style>
	.food {
		margin-top: 20px
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
	$: buttonValue = mode === 'add'? 'Add' : 'Update'

	function handleAddUpdate() {

		if(mode === 'add') {
			// save in the browser
			const allFood = JSON.parse(localStorage.getItem('food')) || []
			allFood.push({name, protein, carbs, fat})
			localStorage.setItem('food', JSON.stringify(allFood))
			food = allFood
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
	}

	onMount(async () => {
		food = JSON.parse(localStorage.getItem('food')) || []
	})

	function handleFoodClick(food) {
		oldName = food.name
		name = food.name
		protein = food.protein
		carbs = food.carbs
		fat = food.fat
		mode = 'update'
	}

	function handleDelete() {
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
	}
</script>


{#if mode === "add"}
<h1>Add Food</h1>
{:else}
<h1>Update Food</h1>
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

<h1 class='food'>Food</h1>
<p>
Click food to update
</p>

{#each food as { id, name }, i}
	<button on:click={() => handleFoodClick(food[i])}>{name}</button>
{/each}
