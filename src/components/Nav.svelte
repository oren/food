<script>
	export let segment;
	import Icon from 'svelte-awesome/components/Icon.svelte'
  import { cog } from 'svelte-awesome/icons';
	import { faUtensils, faAppleAlt } from '@fortawesome/free-solid-svg-icons';
</script>

<style>
	nav {
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index:1000;
	}
	.selected {
		@apply bg-pink-200;
		border-bottom: 2px solid black;
	}
	a {
		@apply block py-2 px-4;
	}
</style>

<nav class="bg-pink-400">
	<ul class="flex">
		<li class="flex-1 mr-2">
			<a class="{segment === undefined ? "selected" : ""} text-center block py-2 px-4" href="/food">Eat<Icon class="ml-2 mb-1" data={faUtensils}/></a>
		</li>
		<li class="flex-1 mr-2">
			<a class="{segment === "manage-food" ? "selected" : ""} text-center block py-2 px-4" href="manage-food">Food<Icon class="ml-2 mb-1" data={faAppleAlt}/></a>
		</li>
		<li class="text-center flex-1">
			<a class="{segment === "settings" ? "selected" : ""} text-center block py-2 px-4" href="settings">Settings<Icon class="ml-2 mb-1" data={cog}/></a>
		</li>
	</ul>
</nav>
