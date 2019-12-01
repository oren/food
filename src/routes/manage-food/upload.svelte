<svelte:head>
	<title>Upload Food</title>
</svelte:head>

<script>
	import Icon from 'svelte-awesome/components/Icon.svelte'
  import { upload } from 'svelte-awesome/icons';
	let food = []
	let done = false

	function handleFile() {
		const file = document.getElementById('input').files[0];
		let foodItem = {}

		var reader = new FileReader();
			reader.onload = function(progressEvent){
				var lines = this.result.split('\n');
				for(var line = 0; line < lines.length; line++){
					var f = lines[line].split(',');
					foodItem = {name: f[0], protein: Number(f[1]), carbs: Number(f[2]), fat: Number(f[3])}
					// isValid = validate(foodItem)
					// if (!isValid) { continue }
					//
					// isExist = exist(foodItem.name)
					// if(isExist) {
					//   if(override) {
					//     override()
					//   }
					//   continue
					// }
					//
					// append(foodItem)
					if(f[0]) {
						food[line] =  {name: f[0], protein: Number(f[1]), carbs: Number(f[2]), fat: Number(f[3])}
					}
				}

				console.log('food', food)

				localStorage.setItem('food', JSON.stringify(food))
				food = food.slice(0,20)
				localStorage.setItem('recentFood', JSON.stringify(food))
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
<p>File contain {food.length} food items</p>
{/if}
