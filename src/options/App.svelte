<script>
  import Aliases from "./sections/Aliases";
  import About from "./sections/About";
  import ToastPortal from "./sections/ToastPortal";
  import Nav from "./sections/Nav";
  import Route from "./components/Route";
  import ModalPortal from "./components/ModalPortal";
  import Redirect from "./components/Redirect";
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

<ToastPortal>
  <ModalPortal>
    <Nav />

    <!-- <Hero /> -->
    <div class="content">
      <Route name="aliases" component={Aliases} />
      <Route name="about" component={About} />
      <Redirect name="aliases" />
    </div>

  </ModalPortal>
</ToastPortal>
