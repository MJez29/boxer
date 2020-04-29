<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { Checkbox, Button, Icon } from "@lib/components";
  import { downloadAliases } from "@lib/download";
  import AliasRow from "./AliasRow";
  import { getToastContext, getModalContext } from "@options/contexts";
  import ImportAliasesModal from "@options/components/ImportAliasesModal";

  const { displayToast } = getToastContext();
  const { showModal } = getModalContext();

  /**
   * The aliases to display in the table
   * @type { Alias[] }
   */
  export let aliases = [];

  /**
   * If the table can be downloaded
   * @type { boolean }
   */
  export let downloadable = false;

  /**
   * If there should be an empty table row at the bottom for new aliases
   * @type { boolean }
   */
  export let expandable = false;

  /**
   * If set to true, the first element in the table will be focused
   */
  export let autoFocus = false;

  const dispatch = createEventDispatcher();

  let selectedAliases = new Set();

  let selectAllCheckboxEl;

  let sortField = "name";
  let sortings = {
    name: 1,
    link: 1
  };

  $: {
    aliases = aliases.sort(
      (a1, a2) =>
        sortings[sortField] * a1[sortField].localeCompare(a2[sortField])
    );
  }

  const onAliasSelect = alias => {
    if (selectedAliases.has(alias.name)) {
      selectedAliases.delete(alias.name);
    } else {
      selectedAliases.add(alias.name);
    }
    selectedAliases = selectedAliases;
    aliases = aliases;
  };

  const onCheckAll = () => {
    if (selectedAliases.size === aliases.length) {
      selectedAliases.clear();
    } else {
      aliases.forEach(alias => selectedAliases.add(alias.name));
    }
    selectedAliases = selectedAliases;
    aliases = aliases;
  };

  const onDeleteAlias = alias => {
    dispatch("deleteAlias", alias);
    selectedAliases.delete(alias.name);
  };

  const onDownload = () => {
    if (selectedAliases.size > 0) {
      downloadAliases([...selectedAliases]);
    } else {
      downloadAliases(aliases);
    }
    displayToast("Download complete", "success");
  };

  function isAliasSelected(alias) {
    return selectedAliases.has(alias.name);
  }

  const onDeleteSelected = async () => {
    if (selectedAliases.size > 0) {
      dispatch(
        "deleteAliases",
        aliases.filter(alias => selectedAliases.has(alias.name))
      );
    } else {
      dispatch("deleteAliases", aliases);
    }
  };

  const onAliasChange = async (oldAlias, newAlias) => {
    dispatch("aliasChange", {
      old: oldAlias,
      new: newAlias
    });
  };

  const onSortClick = field => {
    sortField = field;
    sortings = {
      ...sortings,
      [sortField]: sortings[sortField] * -1
    };
  };

  onMount(() => {
    if (autoFocus && selectAllCheckboxEl) {
      selectAllCheckboxEl.focus();
    }
  });
</script>

<style>
  .aliases-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #750b20;
  }

  .aliases {
    display: flex;
    flex-direction: column;
  }

  .select {
    width: 40px;
  }

  .name {
    width: calc(calc(100% - 160px) * 0.33333);
  }

  .link {
    width: calc(calc(100% - 160px) * 0.66667);
  }

  .right-icon {
    flex: 0 0 40px;
    text-align: right;
  }
</style>

<div class="aliases-header">
  <div class="select">
    <Checkbox
      bind:this={selectAllCheckboxEl}
      value={selectedAliases.size === aliases.length}
      on:check={onCheckAll} />
  </div>
  <div class="name">
    Name&nbsp;
    <Button transparent on:click={() => onSortClick('name')}>
      <Icon name={sortings.name > 0 ? 'caret-down' : 'caret-up'} />
    </Button>
  </div>
  <div class="link">
    Link&nbsp;
    <Button transparent on:click={() => onSortClick('link')}>
      <Icon name={sortings.link > 0 ? 'caret-down' : 'caret-up'} />
    </Button>
  </div>
  <div class="right-icon" />
  <div class="right-icon">
    {#if downloadable}
      <Button on:click={onDownload} transparent>
        <Icon name="download" />
      </Button>
    {/if}
  </div>
  <div class="right-icon">
    <Button on:click={onDeleteSelected} transparent>
      <Icon name="trash" />
    </Button>
  </div>
</div>
<div class="aliases">
  {#each aliases as alias (alias.name)}
    <AliasRow
      name={alias.name}
      link={alias.link}
      selected={isAliasSelected(alias)}
      on:alias={newAliasEvent => onAliasChange(alias, newAliasEvent.detail)}
      on:delete={() => onDeleteAlias(alias)}
      on:select={() => onAliasSelect(alias)} />
  {/each}
  {#if expandable}
    <AliasRow
      on:alias={newAliasEvent => onAliasChange(null, newAliasEvent.detail)} />
  {/if}
</div>
