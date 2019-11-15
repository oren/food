<script>
	let name = ''
	let protein = ''
  let carbs = ''
  let fat = ''

	function handleClick() {
		// save in the browser
    const food = JSON.parse(localStorage.getItem('food')) || []
		food.push({name, protein, carbs, fat})
    localStorage.setItem('food', JSON.stringify(food))
    event.preventDefault()
	}
</script>

<svelte:head>
	<title>Add Food</title>
</svelte:head>

<style>
	.labels { grid-area: labels; }
	.inputs { grid-area: inputs; }
	.grid-container {
		display: grid;
		grid-template-areas:
			'labels inputs';
		grid-gap: 10px;
		background-color: #2196F3;
		padding: 10px;
	}
	.grid-container > div {
		background-color: rgba(255,255,255,0.8);
		text-align: center;
	}
</style>

<h1>Add Food!</h1>

<form on:submit|preventDefault={handleClick}>
		<input type="text" bind:value={name} placeholder="Name"/>
	<br />
		<input type="text" bind:value={protein} placeholder="Protein"/>
	<br />
		<input type="text" bind:value={carbs} placeholder="Carbs"/>
	<br />
		<input type="text"  bind:value={fat} placeholder="Fat"/>
	<br />
	<br />
	<input type="submit" value="Add" />
</form>

<h1>Food</h1>
