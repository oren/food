<svelte:head>
	<title>Food</title>
</svelte:head>

<style>
	input[type=button] {
		display: block;
    width: 100%;
	}

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

	let name = ''
	let protein = ''
  let carbs = ''
  let fat = ''
	let food = []
	let mode = 'add'
	let oldName = ''
	let errorMessage = ''
	let successMessage = ''

	$: buttonValue = mode === 'add'? 'Add' : 'Update'

	onMount(async () => {
	})

	function handleDelete() {
	}
</script>

<h2>Manage Food</h2>

<div class="wrapper">
	<a class="box a" href="/food/manage-food/add-food"><div>Add Food</div></a>
	<a class="box b" href="/food/manage-food/update-food"><div>Update Food</div></a>
	<a class="box c" href="/food/manage-food/add-meal"><div>Add Meal</div></a>
</div>
