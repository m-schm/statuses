<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let message: string;

	const send = (msg: string) => dispatch('message', msg);

	const keydown = e => {
    // ctrl-enter
		if(e.keyCode === 13 && e.ctrlKey) {
      e.preventDefault();
			send(message);
      return;
    }
		if(e.keyCode === 27) {
      e.preventDefault();
			send(null);
      return;
    }
  }
</script>

<style>
  .root {
    display: flex;
    align-items: stretch;
    justify-content: stretch;
  }

  textarea {
    flex-grow: 1;
    min-height: 100%;
    max-width: 100%;
    background-color: #3b3b3d;
    color: #fff;
    border: none;
    resize: none;
  }

  .buttons {
    display: flex;
    flex-direction: column;
  }

  button {
    margin: 0;
  }
</style>

<div class="root">
  <!-- svelte-ignore a11y-autofocus  -->
	<textarea
    bind:value={message}
    on:keydown={keydown}
    placeholder="Ctrl-Enter to update, Esc to undo changes"
    autofocus
  />
  <div class="buttons">
    <button on:click={() => send(null)}>Undo changes</button>
    <button on:click={() => send(message)}>Update</button>
  </div>
</div>
