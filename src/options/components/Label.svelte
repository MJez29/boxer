<script>
  export let labelFor;
</script>

<style>
  label {
    font-size: 0.8rem;
    margin-bottom: 6px;
    display: block;
  }
</style>

<label for={labelFor}>
  <slot />
</label>
