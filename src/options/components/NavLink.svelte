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
    background-color: #b00f30;
  }

  a {
    display: block;
    padding: 10px 15px 10px 30px;
    color: #f5f5f5;
    width: 100%;
    text-decoration: none;
    margin-bottom: 20px;
    position: relative;
    z-index: 1;
  }

  .bg {
    position: absolute;
    top: 0;
    right: 100%;
    left: 0;
    bottom: 0;
    background-color: #960e29;
    transition: right 0.2s ease;
    z-index: 0;
  }

  .bg.animate {
    right: 0;
  }

  .bg.active.active::after {
    content: "";
    position: absolute;
    top: 0;
    right: calc(100% - 5px);
    bottom: 0;
    left: 0;
    background-color: #f5f5f5;
  }
</style>

<div class="container">
  <span class="bg" class:animate class:active />
  <a
    href={`?path=${name}`}
    on:click={onClick}
    on:mouseover={animateIn}
    on:mouseleave={animateOut}
    on:focus={animateIn}
    on:blur={animateOut}>
    <slot />
  </a>
</div>
