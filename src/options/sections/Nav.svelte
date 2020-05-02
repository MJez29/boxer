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
  }

  .logo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    top: -15px;
  }

  .logo {
    width: 80px;
    margin-bottom: 5px;
  }

  .boxer {
    text-transform: uppercase;
    color: #f5f5f5;
    font-size: 16px;
    font-weight: normal;
    letter-spacing: 10px;
  }

  .navlinks {
    margin-top: 150px;
  }
</style>

<nav aria-label="main navigation">
  <div class="logo-container">
    <img
      class="logo"
      src="/img/logo-white-transparent.png"
      alt="A pair of boxing gloves" />
    <span class="boxer">Boxer</span>
  </div>
  <div class="navlinks" aria-label="main navigation links">
    <NavLink name="aliases">Aliases</NavLink>
    <NavLink name="about">About</NavLink>
  </div>
</nav>
