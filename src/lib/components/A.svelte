<script>
  export let href = "";
  export let newTab = false;
  export let padded = false;
  export let transparent = false;

  let rel;
  let target;

  $: {
    if (newTab) {
      rel = "noopener noreferrer";
      target = "_blank";
    } else {
      rel = undefined;
      target = undefined;
    }
  }
</script>

<style>
  a {
    text-decoration: none;
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

  .padded {
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

<a {href} {rel} {target} class:padded class:transparent>
  <slot />
</a>
