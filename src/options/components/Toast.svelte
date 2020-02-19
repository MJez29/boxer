<script>
  import Icon from "./Icon";

  export let success = false;
  export let error = false;
  export let message = "";

  $: iconName = success
    ? "check-circle"
    : error
    ? "times-circle"
    : "exclamation-circle";
</script>

<style>
  .toast {
    display: flex;
    height: 60px;
    align-items: center;
  }
</style>

<div class="toast">
  <Icon name={iconName} />
  <span>{message}</span>
</div>
