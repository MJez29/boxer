<script>
  import NavLink from "../components/NavLink";
</script>

<style>
  nav {
    position: fixed;
    top: 0;
    left: 0;
    right: calc(100% - 200px);
    bottom: 0;
    background-color: #dc143c;
    /* box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.25); */
    z-index: 10;
    padding-top: 100px;
  }
</style>

<nav>
  <NavLink name="aliases">Aliases</NavLink>
  <NavLink name="about">About</NavLink>
</nav>
