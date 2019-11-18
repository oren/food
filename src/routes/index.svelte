<svelte:head>
	<title>Eat</title>
</svelte:head>

<style>
	input, button {
		font-size: 100%;
	}
	span {
		margin-right: 5px
	}
	ul {
		list-style-type: none
	}
	.total, .goal {
		background-color: #ffe9f4;
		margin-bottom: 10px;
		font-size: 70%;
	}
	.today {
		margin-top: 20px;
	}
	.clear {
		float: right;
	}
	.remaining {

		background-color: red;
	}
	.add {
		margin-top: 20px;
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

<h2 class='today'>Today I Ate:<button class='clear' on:click={handleClear}>Clear</button></h2>
{#if calories !== 0}
{/if}

{#if calories === 0}
	Nothing yet... Feed your muscles!
{/if}

{#each foodIAte as { id, name, count }, i}
<div> {count} {name} </div>
{/each}

<h2 class='add'>Add Food</h2>

<div class="wrapper">
{#each food as { id, name }, i}
	<button class='box' on:click={() => handleFoodClick(food[i])}>{name}</button>
{/each}
</div>
