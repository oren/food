<svelte:head>
	<title>Upload Food</title>
</svelte:head>

<style>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
	float: right;
	margin-right: 22px;
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
	import Icon from 'svelte-awesome/components/Icon.svelte'
  import { upload } from 'svelte-awesome/icons';
	import { validate, foodExist, deleteFood, addFood } from './validate.js';
	import { onMount } from 'svelte';

	let food = []
	let done = false
	let validFood = 0
	let overrides = 0
	let ignores = 0
	let errors = 0
	let ignoreDuplicates = true

	onMount(async () => {
		food = JSON.parse(localStorage.getItem('food')) || []
		ignoreDuplicates = localStorage.getItem('ignoreDuplicates') ? localStorage.getItem('ignoreDuplicates') === 'true' : true
	})

	function handleFile() {
		validFood = 0
		overrides = 0
		ignores = 0
		errors = 0

		const file = document.getElementById('input').files[0];
		let foodItem = {}
		let isValid = false
		let foodIndex = false
		let validationResults = {}

		var reader = new FileReader();
			reader.onload = function(progressEvent){
				var lines = this.result.split('\n');
				for(var line = 0; line < lines.length; line++) {
					var f = lines[line].split(',');
					foodItem = {name: f[0], protein: Number(f[1]), carbs: Number(f[2]), fat: Number(f[3])}
					validationResults = validate(foodItem)
					if (!validationResults.valid) {
						errors = errors + 1
						continue;
					}

					validFood = validFood + 1

					foodIndex = foodExist(foodItem.name, food)
					if(foodIndex != -1) {
					  if(ignoreDuplicates) {
							ignores = ignores +1
							continue
					  }
						overrides = overrides + 1
					  food = deleteFood(foodItem.name, food)
					}

					food = addFood(foodItem, food)
				}

				localStorage.setItem('food', JSON.stringify(food))
				done = true
			};

		reader.onerror = function(event) {
			console.error("File could not be read! Code " + event.target.error.code);
		};

		reader.readAsText(file);
	}

	function toggleIgnoreDuplicates() {
		done = false

		if(ignoreDuplicates) {
			ignoreDuplicates = false
			localStorage.setItem('ignoreDuplicates', false)
			return
		}

		ignoreDuplicates = true
		localStorage.setItem('ignoreDuplicates', true)
	}
</script>

<h2 class="text-xl mb-3">Upload Food</h2>

<p class="mb-4">Upload a text file with a list of food. Each row represents a food. For example: milk, 3, 4, 2.</p>

<div class="">
	{#if ignoreDuplicates}
		<span class="mt-1 mr-2 float-left">Ignore food with the same name:</span>
		<label class="switch">
			<input type="checkbox" checked on:change={toggleIgnoreDuplicates}>
			<span class="slider round"></span>
		</label>
	{:else}
		<span class="mt-1 mr-2 float-left">Override food with the same name:</span>
		<label class="switch">
			<input type="checkbox" on:change={toggleIgnoreDuplicates}>
			<span class="slider round"></span>
		</label>
	{/if}
</div>

<div style="clear: both;"></div>

<form class="mt-0">
	<label for="image_uploads">Choose file to upload (.txt)</label>
	<input id="input" type="file" on:change={handleFile} accept=".txt">
</form>

{#if done}
	<h2 class="mt-5 text-blue-500">Upload Summary:</h2>
	<p>Food items in the file: {validFood}</p>
	{#if ignoreDuplicates}
		<p>Food items that were ignored: {ignores}</p>
	{:else}
		<p>Food items that were overrided: {overrides}</p>
	{/if}
{/if}
