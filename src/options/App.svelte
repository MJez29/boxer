<script>
  import Aliases from "./sections/Aliases";
  import About from "./sections/About";
  import ToastPortal from "./sections/ToastPortal";
  import Nav from "./sections/Nav";
  import { Router, Route } from "svelte-routing";
</script>

<style>
  :global(body) {
    margin: 0;
    font-size: 1em;
    background-color: #f5f5f5;
  }

  :global(*) {
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
  }

  .content {
    margin-left: 200px;
    padding: 50px;
    /* max-width: 1200px; */
  }
</style>

<Router>
  <ToastPortal>
    <Nav />

    <!-- <Hero /> -->
    <div class="content">
      <Route path="options.html" component={Aliases} />
      <Route path="about.html" component={About} />
    </div>

  </ToastPortal>
</Router>
