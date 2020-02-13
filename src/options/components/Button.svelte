<style>
  .container {
  }

  button {
    border: none;
    outline: none;
    background-color: lightgrey;
    padding: 15px 10px;
    text-align: center;
    min-width: 60px;
    position: relative;
  }

  .top {
    position: absolute;
    top: 0;
    left: 0;
    right: 100%;
    bottom: calc(100% - 2px);
    background-color: grey;
  }

  .right {
    position: absolute;
    right: 0;
    top: 0;
  }

  .bottom {
  }

  .left {
  }
</style>

<div class="container">
  <button on:click>
    <slot />
  </button>
</div>
