import { writable } from "svelte/store";

function createRouter() {
  const { subscribe, set } = writable("");

  const goTo = (newPath: string) => {
    history.pushState(null, "", `?path=${newPath}`);
    set(newPath);
  };

  return {
    subscribe,
    goTo
  };
}

export const router = createRouter();
