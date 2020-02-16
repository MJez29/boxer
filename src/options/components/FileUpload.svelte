<script>
  let fileInput = null;

  function onClick() {
    console.log("CLICK");
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

<input type="file" bind:this={fileInput} />
<span on:click={onClick}>
  <slot />
</span>
