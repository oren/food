<svelte:head>
	<title>Eat</title>
</svelte:head>

<style>
	span {
		margin-right: 5px
	}
	.today {
		margin-top: 20px;
	}
	.clear {
		font-size: 100%;
		float: right;
		margin-bottom: 5px;
	}
	.remaining {
		@apply text-red-700;
	}
	.add {
		margin-top: 20px;
	}
	.filter {
		float: right;
		font-size: 150%;
		margin-top: 20px;
		margin-bottom: 10px;
		@apply bg-gray-200 w-24 px-2;
	}
	.ate {
		color: green;
	}
	.ate-wrapper {
		float: left;
		display: grid;
		grid-template-columns: 10px 91% 2%;
		grid-gap: 5px;
	}
	.wrapper {
		float: right;
		display: grid;
		grid-template-columns: 100%;
		grid-gap: 5px;
	}
	.box {
		padding: 5px;
		@apply bg-blue-100;
	}
</style>

<script>
	import { onMount } from 'svelte';
	import Icon from 'svelte-awesome/components/Icon.svelte'
  import { trash } from 'svelte-awesome/icons';

	let firstTime = false
	let columns = '50% 50%'
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
		firstTime = localStorage.getItem('firstTime') || 'true'
		firstTime = (firstTime === 'true'); //localStorage keep everything as string so I convert it to bool

		isGoal = localStorage.getItem('isGoal') || false
		goal = localStorage.getItem('goal') || 2000
		columns = localStorage.getItem('columns') || '50% 50%'
		food = JSON.parse(localStorage.getItem('food')) || []
		filteredFood = food
		filteredFood = filteredFood.slice(0,15)
		foodIAte = JSON.parse(localStorage.getItem('ate')) || []

		if(firstTime && food.length === 0) {
			console.log('first time and no food')
			food = [
				{name: 'cup milk 2%', protein: 5, carbs: 6, fat: 7},
				{name: 'cup oatmeal', protein: 6, carbs: 7.3, fat: 7.2},
				{name: 'egg', protein: 6, carbs: 0, fat: 7.2},
				{name: '100g chicken breast', protein: 20, carbs: 3.2, fat: 5.1},
				{name: '100g brown rice', protein: 4, carbs: 6.8, fat: 4.7},
				{name: '100g japanese yams', protein: 4, carbs: 6.8, fat: 4.7},
				{name: 'avocado', protein: 4, carbs: 6.8, fat: 4.7},
				{name: 'olive oil', protein: 2, carbs: 3.8, fat: 8},
				{name: 'apple', protein: 1, carbs: 5.8, fat: 3},
				{name: 'cottage cheese', protein: 1, carbs: 5.8, fat: 3},
				{name: '100g greek yugurt', protein: 1, carbs: 5.8, fat: 3},
				{name: '1 tbsp peanut butter', protein: 1, carbs: 5.8, fat: 3},
				{name: '100g salmon', protein: 1, carbs: 5.8, fat: 3},
				{name: '100g steak', protein: 1, carbs: 5.8, fat: 3},

			]

			localStorage.setItem('firstTime', 'false')
			localStorage.setItem('food', JSON.stringify(food))
		  filteredFood = food
			filteredFood = filteredFood.slice(0,15)
		}

		countCalories(foodIAte)
		console.log('food', food)
	})

	function handleClear() {
		localStorage.removeItem('ate')
		protein = 0
		carbs = 0
		fat = 0
		foodIAte = []
	}

	function handleDelete(foodItem) {
		console.log('delete', foodItem)

		let filtered = foodIAte.filter(function(f, index, arr){
			return f.name !== foodItem.name;
		});

		foodIAte = filtered

    localStorage.setItem('ate', JSON.stringify(filtered))
		countCalories(foodIAte)
	}

	function handleFilter() {
		if(filter === '') {
			filteredFood = food
		}

		filteredFood = food.filter(f => f.name.toLowerCase().includes(filter.toLowerCase()));
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

	<div class="wrapper">
		{#each filteredFood as { id, name }, i}
			<button class='box' on:click={() => handleFoodClick(filteredFood[i])}>{name}</button>
		{/each}
		{#if food.length >= 10}
			<input bind:value={filter} class='bg-gray-200 px-2 py-2' type='text' placeholder='Search' on:input={handleFilter} maxlength="5" size="3" />
		{/if}
	</div>

	{#if isGoal}
		<div>
			<span>Goal:{goal}</span>
			<span class={remaining}>Left:</span><span class={remaining}>{Math.round(goal-calories)}</span>
		</div>
	{/if}

	<div>
		<span>Cal:{Math.round(calories)}</span>
		<span>P:{Math.round(protein)}</span>
		<span>C:{Math.round(carbs)}</span>
		<span>F:{Math.round(fat)}</span>
	</div>

	{#if foodIAte.length > 0}
		<div><button class="bg-red-400 py-1 mt-2 w-48" href="#" on:click={handleClear}>Clear All</button></div>
	{/if}

	<div class='ate-wrapper mt-1'>
		{#each foodIAte as { id, name, count }, i}
			<button class="text-red-400" href="#" on:click|preventDefault={() => handleDelete(foodIAte[i])}><Icon data={trash}/></button><div>{name}</div><div>{count}</div>
		{/each}
	</div>
{/if}
