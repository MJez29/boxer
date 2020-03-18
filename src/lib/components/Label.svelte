<script>
  export let labelFor;
</script>

<style>
  label {
    font-size: 0.75rem;
    display: block;
    margin-bottom: 10px;
  }
</style>

<label for={labelFor}>
  <slot />
</label>
