<script>
  export let labelFor;
</script>

<style>
  label {
    font-size: 1rem;
    margin-left: 15px;
    margin-bottom: 6px;
    display: block;
  }
</style>

<label for={labelFor}>
  <slot />
</label>
