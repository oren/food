<svelte:head>
	<title>Upload Food</title>
</svelte:head>

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
					console.log('validations', validationResults)
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

				console.log('food', food)

				localStorage.setItem('food', JSON.stringify(food))
				//food = food.slice(0,20)
				//localStorage.setItem('recentFood', JSON.stringify(food))
				done = true
			};

		reader.onerror = function(event) {
			console.error("File could not be read! Code " + event.target.error.code);
		};

		reader.readAsText(file);
	}
</script>

<h2 class="text-xl mb-1">Upload Food</h2>

<p class="mb-3">The upload feature is in progress. Currently it deletes all your food and replace it with whatever you have in the text file. Also there is no validation so you might corrput your localStorage and if that's the case, you'll have to delete the website's storage to fix it</p>

<form>
	 <label for="image_uploads">Choose file to upload (.txt)</label>
	<input id="input" type="file" on:change={handleFile} accept=".txt">
</form>

{#if done}
<h2>Summary</h2>
<p>Valids: {validFood}</p>
<p>Errors: {errors}</p>
<p>Overrides: {overrides}</p>
<p>Ignores: {ignores}</p>
{/if}
