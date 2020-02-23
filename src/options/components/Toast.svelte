<script>
  import Icon from "./Icon";
  import { fly } from "svelte/transition";

  export let type = "";

  $: success = type === "success";
  $: error = type === "error";

  $: iconName = success
    ? "check-circle"
    : error
    ? "times-circle"
    : "exclamation-circle";
</script>

<style>
  .toast {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
    background-color: #f5f5f5;
    max-width: 300px;
    margin-bottom: 20px;
    position: relative;
  }

  .icon-container {
    background-color: #f1da0c;
    position: absolute;
    top: 0;
    left: 0;
    right: calc(100% - 40px);
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #f5f5f5;
  }

  .icon-container.success {
    background-color: #4be06c;
  }

  .icon-container.error {
    background-color: #dc143c;
  }

  .text {
    padding: 15px 20px;
    font-size: 12px;
    margin-left: 40px;
  }
</style>

<div class="toast" transition:fly={{ x: 200, duration: 500 }}>
  <div class="icon-container" class:success class:error>
    <Icon name={iconName} />
  </div>
  <div class="text">
    <slot />
  </div>
</div>
