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
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
	margin-right: 10px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
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

</script>

<div>
	<span class="mt-1 mr-2 float-left">Calories Goal:</span>
	{#if isGoal}
		<label class="switch float-left">
			<input type="checkbox" checked on:change={toggleGoal}>
			<span class="slider round"></span>
		</label>
	{:else}
		<label class="switch float-left">
			<input type="checkbox" on:change={toggleGoal}>
			<span class="slider round"></span>
		</label>
	{/if}

	<input class={isGoal ? "goal float-left mt-1" : "no-goal float-left mt-1"} type="text" name="goal-text" bind:value={goal} on:keyup={goalChange} disabled={isGoal ? "" : "disabled"} maxlength="4" size="3">
</div>

<div style="clear: both;"></div>

<h2 class="text-xl mt-4">About</h2>
<p>This is a simple and fast calorie counter app. If you have feature request contact me: <a href="mailto:orengolan@gmail.com?subject=I love the calorie counter app!">orengolan@gmail.com</a><p/>
