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
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		padding: 0 1em;
		@apply bg-blue-200 ;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	.selected {
		position: relative;
		display: inline-block;
		@apply bg-blue-100;
	}

	.selected::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		background-color: rgb(255,62,0);
		height: 2px;
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
	.tmp {
		width: 25px;
		height: 25px;
		@apply text-center
	}
</style>

<nav>
	<ul>
		<li><a class='{segment === undefined ? "selected" : ""}' href='/food'><div class="tmp"><Icon data={faUtensils}/></div></a></li>
		<li><a class='{segment === "manage-food" ? "selected" : ""}' href='manage-food'><div class="tmp"><Icon data={faAppleAlt}/></div></a></li>
		<li><a class='{segment === "settings" ? "selected" : ""}' href='settings'><div class="tmp"><Icon data={cog}/></div></a></li>
	</ul>
</nav>
