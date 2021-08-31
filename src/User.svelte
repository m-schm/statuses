<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { User, OnlineStatus } from './user';
	import Input from './Input.svelte';
	import StatusSelector from './StatusSelector.svelte';
	import Status from './Status.svelte';

	const dispatcher = createEventDispatcher();
  const dispatch = (type, content) => dispatcher('update', {type, content});

	export let user: User;
  export let me: boolean = false;
  let editing = false;

  const setMessage = (msg: string | undefined) => {
    if(msg) {
      user.message = msg;
      dispatch('message', msg);
    }
    editing = false;
  };

  const setStatus = (status: OnlineStatus) => dispatch('status', status);
</script>

<style>
  .root {
    border-radius: 1em;
    padding: 1em;
    display: grid;
    grid-template:
      "a b c d" auto
      "a e e d" auto
      / 0fr max-content 1fr 0fr;
    gap: 0.5em;
    border: 2px #444 solid;
    cursor: default;
  }

  .root.me {
    border-color: #bbb;
  }

  img {
    border-radius: 50%;
    height: auto;
    width: 4em;
    grid-area: a;
    margin-right: 0.5em;
  }

  .name {
    color: #bbb;
    font-size: 120%;
    font-weight: bold;
    grid-area: b;
    align-self: center;
  }

  .spacer {
    grid-column: 3 / span 1;
    grid-area: c;
  }

  .status {
    align-self: flex-start;
    grid-area: d;
  }

  .message {
    grid-area: e;
  }

  .me .message {
    cursor: pointer;
  }

  .me .message span:hover {
    text-decoration: underline solid;
  }

  .online { background-color: #aaffaa18; }
  .away { background-color: #ffcc6618; }
  .offline { background-color: #3336; }
</style>

<div class="root {user.status} {me && "me"}">
  <img
		src="{user.pfp}"
		alt="{user.name}"
	/>
  <div class="name">{user.name}</div>
  <div class="spacer" />

  <div class="status">
    {#if me}
      <StatusSelector
        bind:status={user.status}
        on:update={({detail: status}) => setStatus(status)}
      />
    {:else}
      <Status status={user.status} />
    {/if}
  </div>

  <div class="message" on:click={() => me && (editing = true)}>
    {#if me && editing}
      <Input
        on:message={({detail: msg}) => setMessage(msg)}
        message={user.message}
      />
    {:else}
      <span class="{me && "me"}">{user.message}</span>
    {/if}
  </div>
</div>
