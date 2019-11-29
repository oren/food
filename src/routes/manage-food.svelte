<svelte:head>
	<title>Food</title>
</svelte:head>

<style>
	nav div {
		@apply bg-blue-500 py-4 mb-2;
	}
</style>

<script>
	import { onMount } from 'svelte';

	let food = []

	onMount(async () => {
		food = JSON.parse(localStorage.getItem('food')) || []
	})
</script>


<nav class="text-white font-bold text-center">
	<div><a href="/food/manage-food/add-food">Add Food</a></div>
{#if (food.length !== 0)}
	<div><a href="/food/manage-food/update-food">Update Food</a></div>
	<div><a href="/food/manage-food/export">Export Food</a></div>
{/if}
	<div><a href="/food/manage-food/import">Import Food</a></div>
</nav>

