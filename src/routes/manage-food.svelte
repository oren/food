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
	import Icon from 'svelte-awesome/components/Icon.svelte'
  import { upload, download, plus, edit } from 'svelte-awesome/icons';

	let food = []

	onMount(async () => {
		food = JSON.parse(localStorage.getItem('food')) || []
	})
</script>


<nav class="text-white font-bold text-center">
	<a href="/food/manage-food/add-food">Add Food<Icon style="margin-left: 0.5rem;" data={plus}/></a>
	<a href="/food/manage-food/add-meal">Add Meal<Icon style="margin-left: 0.5rem;" data={plus}/></a>
{#if (food.length !== 0)}
	<a href="/food/manage-food/update-food">Update Food<Icon style="margin-left: 0.5rem;" data={edit}/></a>
	<a href="/food/manage-food/download">Download Food<Icon style="margin-left: 0.5rem;" data={download}/></a>
{/if}
	<a href="/food/manage-food/upload">Upload Food<Icon style="margin-left: 0.5rem;" data={upload}/></a>
</nav>

