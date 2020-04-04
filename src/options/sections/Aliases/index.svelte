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
  import { getToastContext, getModalContext } from "../../contexts";
  import {
    Card,
    Icon,
    Button,
    FileUpload,
    Header,
    Checkbox,
    Hr,
    TextInput,
    Label,
    P
  } from "@lib/components";
  import { getAliasesFromBookmarks } from "@lib/bookmarks";
  import { getAliasesFromHistory } from "@lib/history";
  import AliasTable from "@options/components/AliasTable";
  import ImportAliasesModal from "@options/components/ImportAliasesModal.svelte";

  const { displayToast } = getToastContext();
  const { showModal } = getModalContext();

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
    const bookmarkAliases = await getAliasesFromBookmarks();
    showModal(ImportAliasesModal, { aliases: bookmarkAliases });
  }

  async function onImportHistoryClick() {
    const historyAliases = await getAliasesFromHistory();
    showModal(ImportAliasesModal, { aliases: historyAliases });
  }
</script>

<style>
  .filters {
    margin-bottom: 100px;
    width: 50%;
  }

  .heading {
    margin-bottom: 50px;
  }

  .actions {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 50px;
  }

  .filter {
    height: 100%;
    flex: 0 1 40%;
  }

  .action-buttons {
    flex: 0 0 auto;
    display: flex;
  }

  .action-button {
    margin-left: 20px;
  }

  .search {
    margin-bottom: 20px;
  }
</style>

<div class="heading">
  <Header>Aliases</Header>
  <P>Add, edit and delete your aliases</P>
</div>

<div class="actions">
  <div class="action-buttons">
    <div class="action-button">
      <Button padded primary on:click={onImportBookmarksClick}>
        <Icon name="bookmark" />
        &nbsp;Import bookmarks
      </Button>
    </div>
    <div class="action-button">
      <Button padded primary on:click={onImportHistoryClick}>
        <Icon name="history" />
        &nbsp;Import history
      </Button>
    </div>
  </div>
</div>

<div class="search">
  <Label>Filter by</Label>
  <TextInput placeholder="Ex. foobar" on:input={onFilterInput} />
</div>

<AliasTable
  {aliases}
  downloadable
  uploadable
  expandable
  on:deleteAlias={onDeleteAlias}
  on:deleteAliases={onDeleteAliases}
  on:aliasChange={onAliasChange} />
