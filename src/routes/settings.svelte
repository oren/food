<svelte:head>
	<title>Settings</title>
</svelte:head>

<style>
.goal {
	@apply bg-gray-200;
}
.no-goal {
	@apply bg-gray-100;
}
</style>

<script>
	import { onMount } from 'svelte';

	let isGoal = false
	let goal = 2000
	let columns = "50% 50%"

	onMount(async () => {
		isGoal = localStorage.getItem('isGoal') || false
		goal = localStorage.getItem('goal') || 2000
		columns = localStorage.getItem('columns') || "50% 50%"
	})

	function toggleGoal () {
		if(isGoal) {
			isGoal = false
			localStorage.removeItem('isGoal')
			return
		}

		isGoal = true
		localStorage.setItem('isGoal', true)
	}

	function goalChange () {
		// uncheck if 0 or empty
		if(goal === '' || Number(goal) === 0) {
			localStorage.removeItem('goal')
			localStorage.removeItem('isGoal')
			isGoal = false
			return
		}

		localStorage.setItem('goal', Number(goal))
	}

	function columnChange () {
		localStorage.setItem('columns', columns)
	}
</script>

<div>
	{#if isGoal}
		Calories Goal:
		<input type="checkbox" name="goal" checked value="yes" on:change={toggleGoal}>
	{:else}
		Calories Goal:
		<input type="checkbox" name="goal" value="no" on:change={toggleGoal}>
	{/if}

	<input class={isGoal ? "goal" : "no-goal"} type="text" name="goal-text" bind:value={goal} on:keyup={goalChange} disabled={isGoal ? "" : "disabled"} maxlength="4" size="3">
</div>

<div class="mt-2">
	<label>Food Columns:</label>
	<label><input type='radio' bind:group={columns} on:change={columnChange} value="100%">1</label>
	<label><input type='radio' bind:group={columns} on:change={columnChange} value="50% 50%">2</label>
	<label><input type='radio' bind:group={columns} on:change={columnChange} value="30% 30% 30%">3</label>
</div>

<h2 class="text-xl mt-4">About</h2>
<p>This is a simple and fast calorie counter app. If you have feature request contact me: <a href="mailto:orengolan@gmail.com?subject=I love the calorie counter app!">orengolan@gmail.com</a><p/>
