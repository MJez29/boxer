<script>
  import { setContext } from "svelte";
  import { MODAL_KEY } from "../contexts";
  import { Button, Icon } from "@lib/components";

  let modal;
  let props;

  const showModal = (newModal, newProps) => {
    modal = newModal;
    props = newProps;
    document.body.style.overflowY = "hidden";
    console.log(newModal, newProps);
  };

  const hideModal = () => {
    modal = null;
    document.body.style.overflowY = "auto";
  };

  const stopPropagation = event => {
    event.stopPropagation();
  };

  setContext(MODAL_KEY, {
    showModal,
    hideModal
  });
</script>

<style>
  .modal-portal {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.2);
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: none;
    z-index: 20;
    overflow-y: auto;
  }

  .modal-portal.visible {
    display: block;
  }

  .inner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px 0;
  }

  .content {
    position: relative;
  }

  .close-button {
    position: absolute;
    top: 25px;
    right: 25px;
  }
</style>

<slot />

<div class="modal-portal" class:visible={!!modal} on:click={hideModal}>
  <div class="inner-container">
    <div class="content" on:click={stopPropagation}>
      <div class="close-button">
        <Button transparent on:click={hideModal}>
          <Icon name="times" />
        </Button>
      </div>
      {#if modal}
        <svelte:component this={modal} {...props} />
      {/if}
    </div>
  </div>
</div>
