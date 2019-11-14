<style>
</style>

<svelte:head>
	<title>Food</title>
</svelte:head>

<script>
	import { onMount } from 'svelte';

	let foodIAte = []
	let food = []
	let macros = {}
	let protein = 0
	let carbs = 0
	let fat = 0
	$: calories = protein*4 + carbs*4 + fat*9

	function handleFoodClick(food) {
		let index = foodIAte.findIndex(f => f.name === food.name);

		// first time you eat this food - add to array
		if(index === -1) {
			food.count = 1
			foodIAte = [...foodIAte, food ]
		} else {
			foodIAte[index].count = foodIAte[index].count + 1
		}

		localStorage.setItem('ate', JSON.stringify(foodIAte))
		countCalories(foodIAte)
	}

	onMount(async () => {
		food = JSON.parse(localStorage.getItem('food')) || []
		foodIAte = JSON.parse(localStorage.getItem('ate')) || []
		countCalories(foodIAte)
	})

	const countCalories = (food) => {
		let macros = {}

		function sumProtein(total, f) {
			return total + (f.protein * f.count)
		}

		function sumCarb(total, f) {
			return total + (f.carbs * f.count)
		}

		function sumFat(total, f) {
			return total + (f.fat * f.count)
		}

		protein = Number(foodIAte.reduce(sumProtein, 0))
		carbs = Number(foodIAte.reduce(sumCarb, 0))
		fat = Number(foodIAte.reduce(sumFat, 0))
	}

</script>

<h1>Macros</h1>
Calories: {calories}
Protein:{protein}
Carbs:{carbs}
Fat:{fat}

<h1>Food I Ate</h1>

<ul>
	{#each foodIAte as { id, name, count }, i}
		<li>
			{count} {name}
		</li>
	{/each}
</ul>

<h1>Food</h1>

<ul>
	{#each food as { id, name }, i}
		<li>
			<button on:click={() => handleFoodClick(food[i])}>{name}</button>
		</li>
	{/each}
</ul>
