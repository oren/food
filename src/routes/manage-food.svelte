<svelte:head>
	<title>Food</title>
</svelte:head>

<style>
	.wrapper {
		display: grid;
		grid-template-columns: fit-content;
		grid-gap: 5px;
	}

	.box {
		border: 1px solid black;
		padding: 20px;
	}

	.wrapper a {
		text-decoration: none;
	}
</style>

<script>
	import { onMount } from 'svelte';

	let food = []

	onMount(async () => {
		food = JSON.parse(localStorage.getItem('food')) || []
	})
</script>

<h2>Manage Food</h2>

<div class="wrapper">
	<a class="box a" href="/food/manage-food/add-food"><div>Add Food</div></a>
{#if !(food.length === 0)}
	<a class="box b" href="/food/manage-food/update-food"><div>Update Food</div></a>
{/if}
	<a class="box c" href="/food/manage-food/add-meal"><div>Add Meal</div></a>
{#if !(food.length === 0)}
	<a class="box d" href="/food/manage-food/export"><div>Export</div></a>
{/if}
	<a class="box e" href="/food/manage-food/import"><div>Import</div></a>
</div>
