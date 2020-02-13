<script>
  export let placeholder = "";

  let value = "";

  let focused = false;

  function onFocus() {
    console.log("focus");
    focused = true;
  }

  function onBlur() {
    console.log("blur");
    focused = false;
  }

  $: focusClass = focused ? "focus" : "";
</script>

<style>
  .input {
    border: none;
    outline: none;
    background-color: lightgrey;
    padding: 15px 10px;
  }

  .underline {
    position: absolute;
    top: calc(100% - 2px);
    bottom: 0;
    left: 0;
    content: "";
  }

  .fixed {
    right: 0;
    background-color: grey;
  }

  .reactive {
    right: 100%;
    background-color: lightsalmon;
    transition: right ease-in 0.15s;
  }

  .reactive.focus {
    right: 0;
  }

  .container {
    position: relative;
    display: inline-block;
    background-color: lightgrey;
  }
</style>

<div class="container">
  <input
    {value}
    class="input"
    on:focus={onFocus}
    on:blur={onBlur}
    {placeholder} />
  <div class="underline fixed" />
  <div class="underline reactive {focusClass}" />
</div>
