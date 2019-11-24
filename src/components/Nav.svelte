<script>
	export let segment;
	import Icon from 'svelte-awesome/components/Icon.svelte'
  import { cog , spoon } from 'svelte-awesome/icons';
	import { faUtensils } from '@fortawesome/free-solid-svg-icons';
</script>

<style>
	nav {
		position: fixed;
		bottom: 0;
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		padding: 0 1em;
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
	}

	.selected::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255,62,0);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
	.tmp {
		width: 15px;
		height: 15px;
	}
</style>

<nav>
	<ul>
		<li><a class='{segment === undefined ? "selected" : ""}' href='.'><div class="tmp"><Icon data={faUtensils}/></div></a></li>
		<li><a class='{segment === "manage-food" ? "selected" : ""}' href='manage-food'>Food</a></li>
		<li><a class='{segment === "settings" ? "selected" : ""}' href='settings'><Icon data={cog}/></a></li>
	</ul>
</nav>
