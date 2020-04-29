<script>
  import { Button } from "@lib/components";

  export let headers = [];
  export let bodies = [];

  let activeIndex = 0;

  const setActiveIndex = index => {
    activeIndex = index;
  };
</script>

<style>
  .hide {
    display: none;
  }

  .tab-headers {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }

  .tab-header {
    outline: none;
    border: none;
    text-align: center;
    flex: 1;
    border-top: 2px solid #dc143c;
    border-bottom: 2px solid #dc143c;
    padding: 10px 0;
    cursor: pointer;
    font-size: 16px;
    background-color: transparent;
    transition: all 0.2s ease;
  }

  .tab-header:hover,
  .tab-header:focus,
  .tab-header:focus-within {
    background-color: #e9e5e6;
  }

  .tab-header:active {
    background-color: rgba(41, 4, 11, 0.2);
  }

  .tab-header.active {
    background-color: #dc143c;
    color: #f5f5f5;
  }

  .tab-header.active:hover,
  .tab-header.active:focus,
  .tab-header.active:focus-within {
    background-color: #c61136;
  }

  .tab-header.active:active {
    background-color: #b00f30;
  }

  .tab-header.active:disabled {
    background-color: #960e29;
    cursor: default;
  }

  .tab-header:first-of-type {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-left: 2px solid #dc143c;
  }

  .tab-header:last-of-type {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-right: 2px solid #dc143c;
  }
</style>

<div class="tab-headers">
  {#each headers as header, i}
    <button
      class="tab-header"
      class:active={activeIndex === i}
      on:click={() => setActiveIndex(i)}>
      {#if typeof header === 'string'}
        {header}
      {:else}
        <svelte:component this={header} />
      {/if}
    </button>
  {/each}
</div>

<div class="tab-bodies">
  {#each bodies as body, i}
    <div class="tab-body" class:hide={i !== activeIndex}>
      <svelte:component this={body} activeTab={i === activeIndex} />
    </div>
  {/each}
</div>
