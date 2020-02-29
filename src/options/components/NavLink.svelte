<script>
  import { router } from "../stores/router";

  export let name;

  const onClick = e => {
    e.preventDefault();

    router.goTo(name);
  };
</script>

<style>
  a {
    display: block;
    padding: 10px 15px;
    background-color: rgba(0, 0, 0, 0.2);
    color: #f5f5f5;
    width: 100%;
    text-decoration: none;
    margin-bottom: 20px;
  }
</style>

<a href={`?path=${name}`} on:click={onClick}>
  <slot />
</a>
