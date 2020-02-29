<script>
  import { router } from "../stores/router";

  export let name = "";
  export let component = null;
</script>

{#if $router === name && component}
  <svelte:component this={component} />
{/if}
