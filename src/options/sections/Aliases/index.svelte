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
  import { getToastContext } from "../../contexts";
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
  import { AliasTable } from "@options/components/AliasTable";

  const { displayToast } = getToastContext();

  let aliases = [];

  let filterBy = "";

  async function refreshAliases() {
    if (filterBy.length > 0) {
      aliases = await searchAliases(filterBy);
    } else {
      aliases = await getAliases();
    }
  }

  const onNewAlias = async (oldAlias, newAlias) => {
    if (oldAlias) {
      await replaceAlias(oldAlias, newAlias);
    } else {
      await saveAlias(newAlias.name, newAlias.link);
    }
    refreshAliases();
  };

  const onAliasChange = async event => {
    const { old: oldAlias, new: newAlias } = event.detail;
    if (oldAlias) {
      await replaceAlias(oldAlias, newAlias);
    } else {
      await saveAlias(newAlias.name, newAlias.link);
    }
    refreshAliases();
  };

  const onDeleteAlias = async event => {
    const alias = event.detail;
    await deleteAlias(alias);
    await refreshAliases();
    displayToast(`Deleted alias ${alias.name}`, "success");
  };

  const onDeleteAliases = async event => {
    const aliases = event.detail;
    await deleteAliases(aliases);
    await refreshAliases();
  };

  onMount(refreshAliases);

  function onFilterInput(event) {
    filterBy = event.detail;
    refreshAliases();
  }

  async function onImportBookmarksClick() {
    console.log(await getAliasesFromBookmarks());
  }

  async function onImportHistoryClick() {
    console.log(await getAliasesFromHistory());
  }
</script>

<style>
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

<AliasTable
  {aliases}
  downloadable
  uploadable
  expandable
  on:deleteAlias={onDeleteAlias}
  on:deleteAliases={onDeleteAliases}
  on:aliasChange={onAliasChange} />
