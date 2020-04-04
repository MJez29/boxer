<script>
  import { createEventDispatcher, onMount } from "svelte";

  export let placeholder = "";
  export let value = "";
  export let embed = false;
  export let autofocus = false;

  let outlined = !embed;

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

  .container {
    position: relative;
    height: 100%;
    display: flex;
  }

  .container.embed {
    border-bottom: 2px solid rgba(41, 4, 11, 0.2);
  }

  .container.embed {
    border-bottom: none;
  }

  .container.embed::after {
    content: "";
    position: absolute;
    top: 100%;
    bottom: -2px;
    left: 0;
    right: 100%;
    transition: right ease 0.2s;
  }

  .container.embed.focused::after {
    right: 0;
  }

  .outlined {
    border: 2px solid #e0dcdd;
    border-radius: 4px;
    padding: 10px;
    transition: all 0.2s ease;
  }

  .outlined::placeholder {
    color: #ccc5c6;
  }

  .outlined:focus {
    border-color: #dc143c;
  }
</style>

<div class="container" class:focused class:embed>
  <input
    class="input"
    class:embed
    class:outlined
    bind:this={inputEl}
    on:focus={onFocus}
    on:blur={onBlur}
    on:input={onInput}
    {value}
    {placeholder}
    {autofocus}
    aria-placeholder={placeholder} />
</div>
