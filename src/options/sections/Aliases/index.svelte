<script>
  import { getAliases, deleteAlias, replaceAlias } from "../../../lib/storage";
  import { onMount } from "svelte";
  import { downloadAliases } from "../../../lib/download";
  import Card from "../../components/Card";
  import Icon from "../../components/Icon";
  import Button from "../../components/Button";
  import FileUpload from "../../components/FileUpload";
  import { importFiles } from "../../../lib/import";
  import { getToastContext } from "../../contexts";
  import Header from "../../components/Header";
  import Checkbox from "../../components/Checkbox";
  import AliasRow from "./AliasRow";

  const { displayToast } = getToastContext();

  let aliases = [];

  const selectedAliases = new Set();

  async function refreshAliases() {
    aliases = await getAliases();
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
    await replaceAlias(oldAlias, newAlias);
    refreshAliases();
  };

  onMount(refreshAliases);

  async function onDeleteAlias(alias) {
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
</script>

<style>
  .aliases-header {
    display: flex;
    flex-direction: row;
    color: #750b20;
  }

  .aliases {
    display: flex;
    flex-direction: column;
  }

  .alias {
    border-bottom: 2px solid rgba(41, 4, 11, 0.1);
    height: 40px;
    display: flex;
    align-items: center;
    color: #dc143c;
  }

  .alias:first-of-type {
    border-top: 2px solid rgba(41, 4, 11, 0.1);
  }

  .alias a {
    color: inherit;
  }

  .select {
    flex: 0 0 40px;
  }

  .name {
    flex: 1 1;
  }

  .link {
    flex: 2 1;
  }

  .right-icon {
    flex: 0 0 40px;
    text-align: right;
  }
</style>

<Card>
  <Header>My Aliases</Header>
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
  </div>
  <div class="aliases">
    {#each aliases as alias (alias)}
      <AliasRow
        name={alias.name}
        link={alias.link}
        selected={isAliasSelected(alias)}
        on:alias={newAliasEvent => onNewAlias(alias, newAliasEvent.detail)}
        on:delete={() => onDeleteAlias(alias)}
        on:select={() => onSelectAlias(alias)} />
    {/each}
  </div>
</Card>
