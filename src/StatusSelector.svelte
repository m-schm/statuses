<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { OnlineStatus } from './user';
	import Status from './Status.svelte';
	export let status: OnlineStatus;

	const dispatch = createEventDispatcher();

	const setStatus = s => {
		status = s;
		dispatch('update', s);
	};
</script>

<style>
	.status {
		margin-bottom: 0.2em;
	}

	.clickable {
		cursor: pointer;
	}

	.root {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>

<div class="root">
	{#each ["online", "away", "offline"] as s}
		<div
			class="status {status !== s && "clickable"}"
			on:click={status !== s && (() => setStatus(s))}
		>
			<Status status={s} selected={status === s} />
		</div>
	{/each}
</div>
