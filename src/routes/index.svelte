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
		margin-bottom: 5px;
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
		@apply bg-gray-200 w-24 px-2;
	}
	.ate {
		color: green;
	}
	.ate-wrapper {
		display: grid;
		grid-template-columns: 7% 50% 5%;
		grid-gap: 5px;
	}
	.ate-box {
		color: green;
	}
	.wrapper {
		display: grid;
		grid-template-columns: 50% 50%;
		grid-gap: 5px;
	}
	.box {
		padding: 5px;
		@apply bg-blue-200;
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

			]

			localStorage.setItem('firstTime', 'false')
			localStorage.setItem('food', JSON.stringify(food))
		  filteredFood = food
		} else {
			console.log('not first time or food exist')
		}

		countCalories(foodIAte)
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

	{#if foodIAte.length > 0}
		<button class='float-right w-20 bg-blue-500 text-white font-bold py-1 px-4' on:click={handleClear}>Clear</button>
	{/if}

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

		<div style="clear:both;"></div>

		<div class='ate-wrapper mt-1'>
			{#each foodIAte as { id, name, count }, i}
				<a href="#" on:click|preventDefault={() => handleDelete(foodIAte[i])}><Icon data={trash}/></a><div class='ate-box'>{name}</div><div class='ate-box'>{count}</div>
			{/each}
		</div>

		{#if food.length >= 10}
			<input bind:value={filter} class='filter' type='text' placeholder='Search' on:input={handleFilter} maxlength="5" size="3" />
		{/if}

		<div class="wrapper" style="grid-template-columns: {columns}; margin-top: {food.length >=10 ? 0 : 20}px;">
		{#each filteredFood as { id, name }, i}
			<button class='box' on:click={() => handleFoodClick(filteredFood[i])}>{name}</button>
		{/each}
		</div>
	{/if}

