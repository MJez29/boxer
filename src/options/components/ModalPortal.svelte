<script>
  import { setContext } from "svelte";
  import { fly, blur, fade } from "svelte/transition";
  import { MODAL_KEY } from "../contexts";
  import { Button, Icon } from "@lib/components";

  let modal;
  let props;
  let promiseResolvers = [];

  const resolveExistingPromises = () => {
    if (promiseResolvers.length > 0) {
      promiseResolvers.forEach(resolve => resolve());
    }
    promiseResolvers = [];
  };

  /**
   * Display a modal, closing the open one if necessary.
   */
  const showModal = (newModal, newProps = {}) => {
    resolveExistingPromises();
    modal = newModal;
    props = newProps;
    document.body.style.overflowY = "hidden";
    return new Promise(res => {
      promiseResolvers = [...promiseResolvers, res];
    });
  };

  /**
   * Close the open modal
   */
  const hideModal = () => {
    resolveExistingPromises();
    modal = null;
    document.body.style.overflowY = "auto";
  };

  /**
   * Equivalent to showModal except that the existing resolve promise is maintained
   */
  const replaceModal = (newModal, newProps = {}) => {
    console.log(newModal, newProps);
    modal = newModal;
    props = newProps;
    document.body.style.overflowY = "hidden";
    return new Promise(res => {
      promiseResolvers = [...promiseResolvers, res];
    });
  };

  const stopPropagation = event => {
    event.stopPropagation();
  };

  setContext(MODAL_KEY, {
    showModal,
    hideModal,
    replaceModal
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
    border-radius: 4px;
    background-color: white;
    padding: 50px;
  }

  .close-button {
    position: absolute;
    top: 15px;
    right: 15px;
  }
</style>

<slot />

<div class="modal-portal" class:visible={!!modal} on:click={hideModal}>
  {#if modal}
    <div class="inner-container">
      <div class="content" on:click={stopPropagation}>
        <div class="close-button">
          <Button transparent on:click={hideModal}>
            <Icon name="times" />
          </Button>
        </div>
        <svelte:component this={modal} {...props} />
      </div>
    </div>
  {/if}
</div>
