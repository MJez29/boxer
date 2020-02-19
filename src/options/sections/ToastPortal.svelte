<script>
  import { setContext } from "svelte";
  import { TOAST_KEY } from "../contexts";
  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  let toasts = [];

  const popToast = () => {
    console.log(toasts);
    toasts = toasts.slice(1);
  };

  const displayToast = text => {
    toasts = [...toasts, text];
    console.log(toasts);
    setTimeout(popToast, 3000);
  };

  function flyUp(node, { from, to }, params) {
    const dx = from.left - to.left;
    const dy = from.top - to.top;

    return {
      delay: 20,
      duration: 500,
      easing: cubicOut,
      css: (t, u) => `transform: translate(${dx * u}px, ${dy * u}px)`
    };
  }

  setContext(TOAST_KEY, { displayToast });
</script>

<style>
  .toast-container {
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
  }
</style>

<slot />

<div class="toast-container">
  {#each toasts as toast, index (toast)}
    <div transition:fly|local={{ x: 200, duration: 500 }}>{toast}</div>
  {/each}
</div>
