<svelte:head>
	<title>Download Food</title>
</svelte:head>

<script>
	import Icon from 'svelte-awesome/components/Icon.svelte'
  import { download } from 'svelte-awesome/icons';

	function export2() {
		const food = JSON.parse(localStorage.getItem('food')) || []
		let foodString = ""
		food.forEach(function(f){
			foodString += `${f.name}, ${f.protein}, ${f.carbs}, ${f.fat}\r\n`
		})

		downloadFile(foodString, "food.txt", "txt")
	}
	// Function to download data to a file
	function downloadFile(data, filename, type) {
			var file = new Blob([data], {type: type});
			if (window.navigator.msSaveOrOpenBlob) // IE10+
					window.navigator.msSaveOrOpenBlob(file, filename);
			else { // Others
					var a = document.createElement("a"),
					url = URL.createObjectURL(file);
					a.href = url;
					a.download = filename;
					document.body.appendChild(a);
					a.click();
					console.log('1')
					setTimeout(function() {
							document.body.removeChild(a);
							window.URL.revokeObjectURL(url);
							console.log('1')
					}, 0);
			}
	}
</script>

<h2 class="text-xl mb-1">Download Food</h2>

<p class="mb-3">This will download a text file with all your food. You can save it somewhere as a backup or share with a friend so they can upload it to their app.</p>

<button on:click={export2} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 inline-flex items-center">
	<span>Download</span>
	<Icon style="margin-left: 0.5rem;" data={download}/>
</button>
