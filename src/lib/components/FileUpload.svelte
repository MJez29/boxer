<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let accept = "";
  export let multiple = false;

  let fileInput = null;

  const onClick = () => {
    if (fileInput) {
      fileInput.click();
    }
  };

  const onInput = e => {
    dispatch("files", Array.from(e.target.files));
  };
</script>

<style>
  input {
    display: none;
  }
</style>

<input
  type="file"
  bind:this={fileInput}
  {accept}
  {multiple}
  on:input={onInput} />
<span on:click={onClick}>
  <slot />
</span>
