<svelte:head>
	<title>Food</title>
</svelte:head>

<style>
	nav a {
		@apply block bg-blue-500 py-4 mb-2;
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
	<a href="/food/manage-food/add-food">Add Food</a>
{#if (food.length !== 0)}
	<a href="/food/manage-food/update-food">Update Food</a>
	<a href="/food/manage-food/export">Export Food</a>
{/if}
	<a href="/food/manage-food/import">Import Food</a>
</nav>

