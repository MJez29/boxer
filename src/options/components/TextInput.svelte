<script>
  import { createEventDispatcher, onMount } from "svelte";

  export let placeholder = "";
  export let value = "";
  export let autoFocus = false;

  let focused = false;

  let inputEl = null;

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

  onMount(() => {
    if (inputEl && autoFocus) {
      inputEl.focus();
    }
  });

  $: focusClass = focused ? "focus" : "";
</script>

<style>
  input {
    font-size: 1rem;
    border: none;
    outline: none;
    background-color: transparent;
    display: block;
    width: 100%;
  }

  input:focus {
    border-width: 4px;
  }

  .container {
    position: relative;
    height: 100%;
    display: flex;
  }

  .container::after {
    content: "";
    position: absolute;
    top: 100%;
    bottom: -2px;
    left: 0;
    right: 100%;
    background-color: green;
    transition: right ease 0.2s;
  }

  .container.focused::after {
    right: 0;
  }
</style>

<div class="container" class:focused>
  <input
    class="input"
    bind:this={inputEl}
    on:focus={onFocus}
    on:blur={onBlur}
    on:input={onInput}
    {value}
    {placeholder}
    aria-placeholder={placeholder} />
</div>
