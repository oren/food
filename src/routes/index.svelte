<style>
</style>

<svelte:head>
	<title>Food</title>
</svelte:head>

<script>
	import { onMount } from 'svelte';

	let foodIAte = []
	let food = []

	function handleClick(food) {
		let index = foodIAte.findIndex(o => o.name === food.name);

		// first time you eat this food - add to array
		if(index === -1) {
			food.count = 1
			foodIAte = [...foodIAte, food ]
		} else {
			foodIAte[index].count = foodIAte[index].count + 1
		}

		localStorage.setItem('ate', JSON.stringify(foodIAte))
	}

	onMount(async () => {
		food = JSON.parse(localStorage.getItem('food')) || []
		foodIAte = JSON.parse(localStorage.getItem('ate')) || []
	})
</script>

<h1>Food I Ate:</h1>

<ul>
	{#each foodIAte as { id, name, count }, i}
		<li>
			{count} {name}
		</li>
	{/each}
</ul>

<h1>Food:</h1>

<ul>
	{#each food as { id, name }, i}
		<li>
			<button on:click={() => handleClick(food[i])} value={name}>{name}</button>
		</li>
	{/each}
</ul>
