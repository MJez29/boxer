<script>
  export let accept = "";
  export let multiple = false;

  let fileInput = null;

  function onClick() {
    if (fileInput) {
      fileInput.click();
    }
  }
</script>

<style>
  input {
    display: none;
  }
</style>

<input type="file" bind:this={fileInput} {accept} {multiple} on:input />
<span on:click={onClick}>
  <slot />
</span>
