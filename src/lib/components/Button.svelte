<script>
  export let transparent = false;
  export let tabIndex = 0;
  export let ariaHidden = false;
</script>

<style>
  button {
    outline: none;
    position: relative;
    cursor: pointer;
    border: none;
    font-size: 16px;
    min-width: 24px;
    min-height: 24px;
    border-radius: 4px;
    color: inherit;
    padding: 0;
  }

  .transparent {
    background-color: transparent;
    transition: background-color ease 0.2s;
  }

  .transparent:hover,
  .transparent:focus,
  .transparent:focus-within {
    background-color: rgba(41, 4, 11, 0.1);
  }

  .transparent:active {
    background-color: rgba(41, 4, 11, 0.2);
  }
</style>

<button on:click class:transparent tabindex={tabIndex} aria-hidden={ariaHidden}>
  <slot />
</button>
