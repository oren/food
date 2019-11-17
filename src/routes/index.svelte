<svelte:head>
	<title>Eat</title>
</svelte:head>

<style>
	span {
		margin-right: 5px
	}
	ul {
		list-style-type: none
	}
	.total, .goal {
		background-color: #ffe9f4;
		margin-bottom: 10px;
	}
	.today {
		margin-top: 20px
	}
	.remaining {

		background-color: red;
	}
</style>

<script>
	import { onMount } from 'svelte';

	let isGoal = false
	let goal = 2000
	$: remaining = goal-calories <=0 ? 'remaining' : ''
	let foodIAte = []
	let food = []
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
		isGoal = localStorage.getItem('isGoal') || false
		goal = localStorage.getItem('goal') || 2000
		food = JSON.parse(localStorage.getItem('food')) || []
		foodIAte = JSON.parse(localStorage.getItem('ate')) || []
		countCalories(foodIAte)
	})

	function handleClear(food) {
		localStorage.removeItem('ate')
		protein = 0
		carbs = 0
		fat = 0
		foodIAte = []
	}

	const countCalories = (food) => {
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

{#if isGoal}
<div class='goal'>
	<span>Calories Goal: {goal}</span>
	<span>Remaining:</span><span class={remaining}> {goal-calories}</span>
</div>
{/if}

<div class='total'>
	<span>Calories: {calories}</span>
	<span>Protein:{protein}</span>
	<span>Carbs:{carbs}</span>
	<span>Fat:{fat}</span>
</div>


<h1 class='today'>Today I Ate</h1>
{#if calories !== 0}
<div>
	<button on:click={handleClear}>Clear</button>
</div>
{/if}

{#if calories === 0}
	Nothing yet... Feed your muscles!
{/if}

<ul>
	{#each foodIAte as { id, name, count }, i}
		<li>
			{count} {name}
		</li>
	{/each}
</ul>

<h1>Add Food</h1>

{#each food as { id, name }, i}
		<button on:click={() => handleFoodClick(food[i])}>{name}</button>
{/each}
