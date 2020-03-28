<script>
  export let transparent = false;
  export let tabIndex = 0;
  export let ariaHidden = false;
  export let fullWidth = false;
  export let primary = false;
  export let padded = false;
  export let disabled = false;
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

  button.fullWidth {
    width: 100%;
  }

  button.primary {
    background-color: #dc143c;
    color: #f5f5f5;
  }

  button.primary:hover,
  button.primary:focus,
  button.primary:focus-within {
    background-color: #c61136;
  }

  button.primary:active {
    background-color: #b00f30;
  }

  button.primary:disabled {
    background-color: #960e29;
    cursor: default;
  }

  button.padded {
    padding: 10px 15px;
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

<button
  on:click
  class:transparent
  tabindex={tabIndex}
  aria-hidden={ariaHidden}
  {disabled}
  class:fullWidth
  class:primary
  class:padded>
  <slot />
</button>
