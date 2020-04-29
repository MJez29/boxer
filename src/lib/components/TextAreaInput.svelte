<script>
  import { createEventDispatcher, onMount } from "svelte";

  export let placeholder = "";
  export let value = "";
  export let embed = false;
  export let autofocus = false;
  export let code = false;

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

  export const focus = () => {
    inputEl.focus();
  };

  export const blur = () => {
    inputEl.blur();
  };
</script>

<style>
  textarea {
    font-size: 1rem;
    line-height: 1rem;
    border: none;
    outline: none;
    background-color: transparent;
    display: block;
    width: 100%;
    padding-bottom: 10px;
    resize: none;
    min-height: 600px;
  }

  .code {
    font-family: "Roboto Mono", monospace;
    white-space: pre;
    overflow-wrap: normal;
    overflow: auto;
  }

  textarea.embed {
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

<!-- svelte-ignore a11y-autofocus -->
<div class="container" class:focused class:embed>
  <textarea
    class="input"
    class:embed
    class:outlined
    class:code
    bind:this={inputEl}
    on:focus={onFocus}
    on:blur={onBlur}
    on:input={onInput}
    {value}
    {placeholder}
    {autofocus}
    spellcheck={!code}
    aria-placeholder={placeholder} />
</div>
