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
		border-top: 1px solid #edf2f7;
		@apply bg-white;
	}
	.selected {
		@apply text-blue-500;
	}
	a {
		@apply block py-2 px-4;
	}
</style>

<nav>
	<ul class="flex">
		<li class="flex-1 mr-2">
			<a class="{segment === undefined || segment ==="eat" ? "selected" : ""} text-center block py-2 px-4" href="/food">Eat<Icon style="margin-left: 0.5rem; margin-bottom: 0.25rem;" data={faUtensils}/></a>
		</li>
		<li class="flex-1 mr-2">
			<a class="{segment === "manage-food" ? "selected" : ""} text-center block py-2 px-4" href="manage-food">Food<Icon style="margin-left: 0.5rem; margin-bottom: 0.25rem;" data={faAppleAlt}/></a>
		</li>
		<li class="text-center flex-1">
			<a class="{segment === "settings" ? "selected" : ""} text-center block py-2 px-4" href="settings">Settings<Icon style="margin-left: 0.5rem; margin-bottom: 0.25rem;" data={cog}/></a>
		</li>
	</ul>
</nav>
