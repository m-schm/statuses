import { websocketStore } from 'svelte-websocket-store';

export const ws = websocketStore(
	"ws://localhost:8080",
	null
);
