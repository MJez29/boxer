<script>
  import { createEventDispatcher, onMount } from "svelte";

  export let placeholder = "";
  export let value = "";
  export let embed = false;
  export let autofocus = false;

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

  $: focusClass = focused ? "focus" : "";

  export const focus = () => {
    inputEl.focus();
  };

  export const blur = () => {
    inputEl.blur();
  };
</script>

<style>
  input {
    font-size: 1rem;
    line-height: 1rem;
    border: none;
    outline: none;
    background-color: transparent;
    display: block;
    width: 100%;
    padding-bottom: 10px;
  }

  input.embed {
    padding: 0;
  }

  input:focus {
    border-width: 4px;
  }

  .container {
    position: relative;
    height: 100%;
    display: flex;
    border-bottom: 2px solid rgba(41, 4, 11, 0.2);
  }

  .container.embed {
    border-bottom: none;
  }

  .container::after {
    content: "";
    position: absolute;
    top: 100%;
    bottom: -2px;
    left: 0;
    right: 100%;
    background-color: #dc143c;
    transition: right ease 0.2s;
  }

  .container.focused::after {
    right: 0;
  }
</style>

<div class="container" class:focused class:embed>
  <input
    class="input"
    class:embed
    bind:this={inputEl}
    on:focus={onFocus}
    on:blur={onBlur}
    on:input={onInput}
    {value}
    {placeholder}
    {autofocus}
    aria-placeholder={placeholder} />
</div>
