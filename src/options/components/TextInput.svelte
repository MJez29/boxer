<script>
  import { createEventDispatcher } from "svelte";

  export let placeholder = "";
  export let value = "";

  let focused = false;

  const dispatch = createEventDispatcher();

  function onFocus() {
    focused = true;
  }

  function onBlur() {
    focused = false;
  }

  function onInput(event) {
    dispatch("input", event.target.value);
  }

  $: focusClass = focused ? "focus" : "";
</script>

<style>
  input {
    font-size: 1rem;
    border: none;
    outline: none;
    background-color: transparent;
    padding: 15px 10px;
    display: block;
    background-color: white;
    border: 5px solid lightgreen;
    box-shadow: 5px 5px 0px lightgray;
    transition: box-shadow ease 0.2s;
  }

  input:focus {
    box-shadow: 5px 5px 0px lightslategray;
  }
</style>

<input
  class="input"
  on:focus={onFocus}
  on:blur={onBlur}
  on:input={onInput}
  bind:value
  {placeholder}
  aria-placeholder={placeholder} />
