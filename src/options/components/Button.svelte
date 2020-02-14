<style>
  button {
    outline: none;
    padding: 15px 10px;
    text-align: center;
    min-width: 60px;
    position: relative;
    background-color: lightgreen;
    border: 5px solid lightgreen;
    box-shadow: 5px 5px 0px lightgray;
    cursor: pointer;
    transition: box-shadow ease 0.2s, background-color ease 0.2s;
  }

  button:hover,
  button:focus {
    box-shadow: 5px 5px 0px lightslategray;
  }

  button:active {
    background-color: white;
  }
</style>

<button on:click>
  <slot />
</button>
