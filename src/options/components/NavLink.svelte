<script>
  import { router } from "../stores/router";

  export let name;

  const onClick = e => {
    e.preventDefault();

    router.goTo(name);
    animateOut();
  };

  $: active = $router === name;

  let animate = false;

  function animateIn() {
    animate = true;
  }

  function animateOut() {
    animate = false;
  }
</script>

<style>
  .container {
    position: relative;
  }

  a {
    display: block;
    padding: 10px 15px 10px 30px;
    color: #f5f5f5;
    width: 100%;
    text-decoration: none;
    margin-bottom: 20px;
    position: relative;
    transition: all 0.2s ease;
  }

  a:hover {
    background-color: #b00f30;
  }

  .container::before {
    content: "";
    position: absolute;
    top: 0;
    right: 100%;
    bottom: 0;
    left: 0;
    z-index: 9;
    background-color: #f5f5f5;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    transition: all 0.2s ease;
    right: calc(100% - 5px);
    opacity: 0;
  }

  .container.active::before {
    opacity: 1;
  }
</style>

<div class="container" class:active>
  <a
    aria-current={active ? 'page' : 'false'}
    href={`?path=${name}`}
    on:click={onClick}
    on:mouseover={animateIn}
    on:mouseleave={animateOut}
    on:focus={animateIn}
    on:blur={animateOut}>
    <slot />
  </a>
</div>
