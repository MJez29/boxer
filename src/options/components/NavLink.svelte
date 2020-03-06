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
    background-color: rgb(183, 17, 50);
  }

  a {
    display: block;
    padding: 10px 15px;
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
    background-color: rgb(157, 14, 43);
    transition: right 0.2s ease;
    z-index: 0;
  }

  .bg.active {
    right: calc(50%);
  }

  .bg.animate {
    right: 0;
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
