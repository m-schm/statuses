<script>
	import Main from './Main.svelte';

	let state = 'ready';
	let user;
	let username = '';
</script>

<style>
	input {
		min-height: 100%;
		max-width: 100%;
		background-color: #3b3b3d;
		color: #fff;
		border: none;
		resize: none;
	}
</style>

<main>
	{#if state === 'login'}
		<!-- TODO -->
		<input bind:value={username} />
	{:else if state === 'ready'}
		<Main {user} />
	{:else}
		Something went wrong!
	{/if}
</main>
