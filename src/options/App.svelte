<script>
  import Hero from "./sections/Hero";
  import Aliases from "./sections/Aliases";
  import ToastPortal from "./sections/ToastPortal";
  import Nav from "./sections/Nav";
</script>

<style>
  :global(body) {
    margin: 0;
    font-size: 1em;
    background-color: #f5f0f1;
  }

  :global(*) {
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
  }
</style>

<ToastPortal>
  <Nav />

  <!-- <Hero /> -->
  <div class="content">
    <Aliases />
  </div>

</ToastPortal>
