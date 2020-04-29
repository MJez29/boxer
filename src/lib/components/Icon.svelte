<script>
  export let name = "";
  export let red;
  export let large = false;
</script>

<style>
  i {
    font-size: 16px;
    color: inherit;
  }

  .red {
    color: #dc143c;
  }

  .large {
    font-size: 48px;
  }
</style>

<i class="fas fa-{name}" class:red class:large />
