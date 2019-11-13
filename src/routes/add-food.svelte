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

<h1>Add Food!</h1>

<form on:submit|preventDefault={handleClick}>
	<label>
		Name:
		<input type="text" bind:value={name} />
	</label>
	<br />
	<label>
		Protein:
		<input type="text" bind:value={protein} />
	</label>
	<br />
	<label>
		Carbs:
		<input type="text" bind:value={carbs} />
	</label>
	<br />
	<label>
		Fat:
		<input type="text"  bind:value={fat} />
	</label>
	<br />
	<br />
	<input type="submit" value="Add" />
</form>
