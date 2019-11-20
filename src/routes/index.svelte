<svelte:head>
	<title>Eat</title>
</svelte:head>

<style>
	span {
		margin-right: 5px
	}
	.total, .goal {
		/*	background-color: #ffe9f4; */
	}
	.total {
		margin-bottom: 20px;
	}
	.today {
		margin-top: 20px;
	}
	.clear {
		font-size: 100%;
		float: right;
	}
	.remaining {

		background-color: #ffcccc;
	}
	.add {
		margin-top: 20px;
	}
	.filter {
		font-size: 150%;
		margin-top: 20px;
		margin-bottom: 10px;
	}
	.ate {
		color: green;
	}
	.wrapper {
		display: grid;
		grid-template-columns: 50% 50%;
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
	$: calories = parseFloat(Number(protein*4 + carbs*4 + fat*9).toFixed(1))
	let filter = ''
	let filteredFood = []

	function handleFoodClick(foodClicked) {
		filteredFood = food
		filter = ''

		let index = foodIAte.findIndex(f => f.name === foodClicked.name);

		// first time you eat this food - add to array
		if(index === -1) {
			foodClicked.count = 1
			foodIAte = [...foodIAte, foodClicked ]
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
		filteredFood = food
		foodIAte = JSON.parse(localStorage.getItem('ate')) || []
		countCalories(foodIAte)
	})

	function handleClear() {
		localStorage.removeItem('ate')
		protein = 0
		carbs = 0
		fat = 0
		foodIAte = []
	}

	function handleFilter() {
		if(filter === '') {
			filteredFood = food
		}

		filteredFood = food.filter(f => f.name.includes(filter));
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

		protein = foodIAte.reduce(sumProtein, 0)
		carbs = foodIAte.reduce(sumCarb, 0)
		fat = foodIAte.reduce(sumFat, 0)
	}
</script>

{#if food.length === 0}
	<p>You have no food.</p>
	<p><a href="/food/manage-food/add-food">Add some food first</a>.</p>
{:else}

	<button class='clear' on:click={handleClear}>Clear</button>

	{#if isGoal}
	<div class='goal'>
		<span>Goal: {goal}</span>
		<span>Left:</span><span class={remaining}> {Math.round(goal-calories)}</span>
	</div>
	{/if}

	<div class='total'>
		<span>Cal: {Math.round(calories)}</span>
		<span>Pro:{Math.round(protein)}</span>
		<span>Car:{Math.round(carbs)}</span>
		<span>Fat:{Math.round(fat)}</span>
	</div>


	{#each foodIAte as { id, name, count }, i}
	<div class='ate'> {count} {name} </div>
	{/each}

	<input bind:value={filter} class='filter' type='text' placeholder='filter' on:input={handleFilter} maxlength="5" size="3" />

	<div class="wrapper">
	{#each filteredFood as { id, name }, i}
		<button class='box' on:click={() => handleFoodClick(food[i])}>{name}</button>
	{/each}
	</div>
{/if}
