<script>
  import {
    getAliases,
    deleteAlias,
    replaceAlias,
    saveAlias,
    searchAliases,
    deleteAllAliases,
    deleteAliases
  } from "@lib/storage";
  import { onMount } from "svelte";
  import { downloadAliases } from "@lib/download";
  import { importFiles } from "@lib/import";
  import { getToastContext } from "../../contexts";
  import AliasRow from "./AliasRow";
  import {
    Card,
    Icon,
    Button,
    FileUpload,
    Header,
    Checkbox,
    Hr,
    TextInput,
    Label
  } from "@lib/components";
  import { getAliasesFromBookmarks } from "@lib/bookmarks";
  import { getAliasesFromHistory } from "@lib/history";

  const { displayToast } = getToastContext();

  let aliases = [];

  let filterBy = "";

  let selectedAliases = new Set();

  async function refreshAliases() {
    if (filterBy.length > 0) {
      aliases = await searchAliases(filterBy);
    } else {
      aliases = await getAliases();
    }

    const newSelectedAliases = new Set();
    aliases.forEach(alias => {
      if (selectedAliases.has(alias.name)) {
        newSelectedAliases.add(alias.name);
      }
    });
    selectedAliases = newSelectedAliases;
  }

  const onSelectAlias = alias => {
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

  const onNewAlias = async (oldAlias, newAlias) => {
    if (oldAlias) {
      await replaceAlias(oldAlias, newAlias);
    } else {
      await saveAlias(newAlias.name, newAlias.link);
    }
    refreshAliases();
  };

  onMount(refreshAliases);

  async function onDeleteAlias(alias) {
    selectedAliases.delete(alias.name);
    await deleteAlias(alias);
    await refreshAliases();
    displayToast(`Deleted alias ${alias.name}`, "success");
  }

  function onDownload() {
    if (selectedAliases.size > 0) {
      downloadAliases([...selectedAliases]);
    } else {
      downloadAliases(aliases);
    }
    displayToast("Download complete", "success");
  }

  async function onFileUpload(e) {
    await importFiles(e.target.files);
    await refreshAliases();
    displayToast("Successfully imported aliases", "success");
  }

  function isAliasSelected(alias) {
    return selectedAliases.has(alias.name);
  }

  function onFilterInput(event) {
    filterBy = event.detail;
    refreshAliases();
  }

  async function onDelete() {
    if (selectedAliases.size === 0) {
      await deleteAllAliases();
    } else {
      const aliasesToDelete = aliases.filter(alias =>
        selectedAliases.has(alias.name)
      );
      await deleteAliases(aliasesToDelete);
    }
    await refreshAliases();
  }

  async function onImportBookmarksClick() {
    console.log(await getAliasesFromBookmarks());
  }

  async function onImportHistoryClick() {
    console.log(await getAliasesFromHistory());
  }
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

  .filters {
    margin-bottom: 100px;
    width: 50%;
  }
</style>

<div class="filters">
  <Label>Filter by</Label>
  <TextInput placeholder="Ex. foobar" on:input={onFilterInput} />
  <Button on:click={onImportBookmarksClick}>Import bookmarks</Button>
  <Button on:click={onImportHistoryClick}>Import history</Button>
</div>
<div class="aliases-header">
  <div class="select">
    <Checkbox
      value={selectedAliases.size === aliases.length}
      on:check={onCheckAll} />
  </div>
  <div class="name">Name</div>
  <div class="link">Link</div>
  <div class="right-icon">
    <Button on:click={onDownload} transparent>
      <Icon name="download" />
    </Button>
  </div>
  <div class="right-icon">
    <FileUpload multiple accept="application/json" on:input={onFileUpload}>
      <Button transparent>
        <Icon name="upload" />
      </Button>
    </FileUpload>
  </div>
  <div class="right-icon">
    <Button on:click={onDelete} transparent>
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
      on:alias={newAliasEvent => onNewAlias(alias, newAliasEvent.detail)}
      on:delete={() => onDeleteAlias(alias)}
      on:select={() => onSelectAlias(alias)} />
  {/each}
  <AliasRow
    on:alias={newAliasEvent => onNewAlias(null, newAliasEvent.detail)} />
</div>
