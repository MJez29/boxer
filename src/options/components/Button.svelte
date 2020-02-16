<script>
  export let transparent = false;
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
  }

  .transparent {
    background-color: transparent;
  }

  .transparent:hover {
    background-color: rgba(41, 4, 11, 0.1);
  }

  .transparent:active {
    background-color: rgba(41, 4, 11, 0.2);
  }
</style>

<button on:click class:transparent>
  <slot />
</button>
