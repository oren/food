<svelte:head>
	<title>Eat</title>
</svelte:head>

<script>
	import { onMount } from 'svelte';

	let firstTime = false
	let columns = '50% 50%'
	let isGoal = true
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
	let recentFood = []
	let font = window.screen.width <= 360 ? 'text-sm' : '' // small text for food on small phones
  $: screenWidth = window.screen.availWidth

	onMount(async () => {
		const sortAlpha = (a, b) => {
			return a.name > b.name
		}

		firstTime = localStorage.getItem('firstTime') || 'true'
		firstTime = (firstTime === 'true'); //localStorage keep everything as string so I convert it to bool

		isGoal = localStorage.getItem('isGoal') === "true" || false
		goal = localStorage.getItem('goal') || 2000

		columns = localStorage.getItem('columns') || '50% 50%'
		food = JSON.parse(localStorage.getItem('food')) || []
		filteredFood = JSON.parse(localStorage.getItem('recentFood') || '[]').sort(sortAlpha) || []
		recentFood = filteredFood

		foodIAte = JSON.parse(localStorage.getItem('ate')) || []

		if(firstTime && food.length === 0) {
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
				{name: 'egg white', protein: 1, carbs: 5.8, fat: 3},
				{name: 'sardins', protein: 1, carbs: 5.8, fat: 3},
				{name: 'tuna can', protein: 1, carbs: 5.8, fat: 3},
				{name: 'tuna fresh', protein: 1, carbs: 5.8, fat: 3},
				{name: '150g drum sticks', protein: 1, carbs: 5.8, fat: 3},
				{name: '100g chicken thighs', protein: 1, carbs: 5.8, fat: 3},

			]

			localStorage.setItem('firstTime', 'false')
			localStorage.setItem('isGoal', 'true')
			localStorage.setItem('food', JSON.stringify(food))
		  filteredFood = food
		}

		countCalories(foodIAte)
	})

	function handleFilter() {
		if(filter === '') {
			filteredFood = recentFood
			return
		}

		filteredFood = food.filter(f => f.name.toLowerCase().includes(filter.toLowerCase()));
	}

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

		updateRecent(foodClicked)
	}

	const updateRecent = (foodClicked) => {
		// remove food
		let filtered = recentFood.filter(function(f, index, arr){
			return f.name !== foodClicked.name;
		});

		// add to top
		filtered.unshift(foodClicked)

		// cut last food if there are more than 20
		if(filtered.length > 20) {
			filtered.splice(-1, 1)
		}

		localStorage.setItem('recentFood', JSON.stringify(filtered))
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

<style>
	span {
		margin-right: 5px
	}
	.wrapper {
		display: grid;
		grid-template-columns: 50% 50%;
		grid-gap: 3px;
		padding-bottom: 75px;
	}
	.remaining {
		@apply text-red-700;
	}
	ul {
		@apply flex fixed w-full bottom-0 mb-10 mt-20 z-50 bg-white border-t border-gray-200;
		margin-left: -12px;
	}
	ul li {
		@apply flex-1;
	}
	ul li.first {
		@apply text-center block py-2 text-blue-500;
	}
 li.second a {
		@apply text-center block py-2;
	}
</style>

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

<input bind:value={filter} class='bg-gray-200 px-2 py-1 mb-2 mt-3 w-1/2' type='text' placeholder='Search' on:input={handleFilter} maxlength="5" size="3" />

<div class="wrapper">
	{#each filteredFood as { id, name }, i}
		<button class='bg-blue-100 p-1' on:click={() => handleFoodClick(filteredFood[i])}>{name}</button>
	{/each}
	<p class="mt-2 text-center" style="grid-column: span 2">(Last 20 items you ate)</p>
</div>


<ul>
	<li class="first">Choose Food </li>
	<li class="second"> <a href="/food/eat">Ate Today</a> </li>
</ul>
