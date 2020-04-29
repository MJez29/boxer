<script>
  import { createEventDispatcher } from "svelte";
  import { Button } from "@lib/components";

  const dispatch = createEventDispatcher();

  const onCancel = () => {
    dispatch("cancel");
  };

  const onConfirm = () => {
    dispatch("confirm");
  };
</script>

<style>
  .footing {
    margin-top: 25px;
    display: flex;
    flex-direction: row-reverse;
  }

  .primary-button {
    margin-left: 20px;
  }
</style>

<div class="footing">
  <div class="primary-button">
    <Button primary padded on:click={onConfirm}>
      <slot name="confirm">Confirm</slot>
    </Button>
  </div>
  <Button transparent padded on:click={onCancel}>
    <slot name="cancel">Cancel</slot>
  </Button>
</div>
