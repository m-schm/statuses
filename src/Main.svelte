<script lang="ts">
	import { flip } from 'svelte/animate';

	import User from './User.svelte';
	import type { OnlineStatus } from './user';
	import { ws } from './websocket';

	let users = new Map();

	export let user;

	const send = ({detail: obj}) => {
		console.log("SEND: ", obj);
		$ws = JSON.stringify(obj);
	};

	ws.subscribe(deltas => {
		if(!deltas) return;
		deltas.forEach(delta => update(delta));
		users = users;
	});

	let order = 0;
	const fields = {
		"USERNAME": "name",
		"STATUS": "message",
		"PICTURE": "pfp",
	}

	const statuses: { [key: string]: OnlineStatus } = {
		"ONLINE": "online",
		"AWAY": "away",
		"OFFLINE": "offline",
	}

	const update = obj => {
		let u;
		if(users.has(obj.USER)) u = users.get(obj.USER);
		else {
			u = {};
			users.set(obj.USER, u);
		}
		for(let k in fields)
			if(obj[k])
				u[fields[k]] = obj[k]
		if(obj.ONLINE)
			u.status = statuses[obj.ONLINE];
		u.order = ++order;
	}

</script>

<style>
	.me {
		margin-bottom: 1em;
	}

	.users {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(25em, 1fr));
		gap: 0.5em;
	}

	.user {
		flex: 1 1 0;
		min-width: 25em;
	}
</style>

<div class="me">
	<User bind:user={user} on:update={send} me />
</div>
<div class="users">
	{#each [...users] as [id, user] (id)}
		<div
			class="user"
			animate:flip={{duration: 250}}
			style="order: {-user.order};"
		>
			<User {user} />
		</div>
	{:else}
		friends would go here
	{/each}
</div>
