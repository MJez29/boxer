<script>
  import { createEventDispatcher } from "svelte";
  import { Checkbox, Button, Icon, FileUpload } from "@lib/components";
  import { downloadAliases } from "@lib/download";
  import { importFiles } from "@lib/import";
  import AliasRow from "./AliasRow";
  import { getToastContext } from "@options/contexts";

  const { displayToast } = getToastContext();

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
   * If you can upload alias files to the table
   * @type { boolean }
   */
  export let uploadable = false;

  /**
   * If there should be an empty table row at the bottom for new aliases
   * @type { boolean }
   */
  export let expandable = false;

  const dispatch = createEventDispatcher();

  let selectedAliases = new Set();

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

  const onUpload = async e => {
    await importFiles(e.target.files);
    displayToast("Successfully imported aliases", "success");
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
      value={selectedAliases.size === aliases.length}
      on:check={onCheckAll} />
  </div>
  <div class="name">Name</div>
  <div class="link">Link</div>
  <div class="right-icon">
    {#if downloadable}
      <Button on:click={onDownload} transparent>
        <Icon name="download" />
      </Button>
    {/if}
  </div>
  <div class="right-icon">
    {#if uploadable}
      <FileUpload multiple accept="application/json" on:input={onUpload}>
        <Button transparent>
          <Icon name="upload" />
        </Button>
      </FileUpload>
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
