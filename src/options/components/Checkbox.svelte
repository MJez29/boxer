<script>
  import Button from "./Button";
  import { createEventDispatcher, onMount, afterUpdate } from "svelte";
  import { fade } from "svelte/transition";

  export let value = false;

  const dispatch = createEventDispatcher();

  let outerDiv;
  let innerDiv;

  afterUpdate(() => {
    const style = getComputedStyle(outerDiv);
    if (outerDiv) {
      outerDiv.style.borderColor = style.color;
    }
    if (innerDiv) {
      innerDiv.style.backgroundColor = style.color;
    }
  });

  const onClick = () => {
    dispatch("check", !value);
  };
</script>

<style>
  input {
    display: none;
  }

  .outer {
    border-width: 2px;
    border-style: solid;
    width: 16px;
    height: 16px;
    border-radius: 4px;
    margin: 0 auto;
  }

  .inner {
    margin: 2px;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    border-radius: 2px;
  }
</style>

<input type="checkbox" checked={value} on:click={onClick} />
<Button transparent on:click={onClick} ariaHidden>
  <div class="outer" bind:this={outerDiv}>
    {#if value}
      <div
        class="inner"
        bind:this={innerDiv}
        transition:fade={{ duration: 100 }} />
    {/if}
  </div>
</Button>
