import { writable } from "svelte/store";

function createRouter() {
  let defaultPath = "";
  const match = window.location.search.match(/path=([\w]*)/);
  if (match) {
    defaultPath = match[1];
  }

  const { subscribe, set } = writable(defaultPath);

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
