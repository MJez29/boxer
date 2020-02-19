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
    border: 1px solid #dc143c;
    border-radius: 4px;
    box-shadow: 0 0 5px #dc143c10;
  }

  input:focus {
    border-width: 4px;
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
