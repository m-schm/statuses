<script lang="ts">
	import type { OnlineStatus } from './user';

	export let status: OnlineStatus;
	export let selected: boolean | undefined = undefined;

</script>

<style>
	div {
		width: 1em;
		height: 1em;
		border-radius: 50%;
	}

	.online { background-color: #0f0; }
	.away { background-color: #fb0; }
	.offline { background-color: #555; }

	.true, .false { border: 2px solid; }
	.true { border-color: #eee; }
	.false { border-color: #222; }
</style>

<div class="{status} {selected}" />
