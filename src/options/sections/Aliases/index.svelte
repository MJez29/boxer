<script>
  import { getAliases, deleteAlias } from "../../../lib/storage";
  import { onMount } from "svelte";
  import { downloadAliases } from "../../../lib/download";

  let aliases = [];

  async function refreshAliases() {
    aliases = await getAliases();
  }

  onMount(refreshAliases);

  function onDeleteAlias(alias) {
    deleteAlias(alias);
    refreshAliases();
  }

  function onLaunch(alias) {
    window.location.href = alias.link;
  }

  function onDownload() {
    downloadAliases(aliases);
  }
</script>

<style>
  .alias-table {
    border: 1px solid black;
  }
</style>

<h1>My Aliases</h1>
<button on:click={onDownload}>Download</button>
<table class="alias-table">
  <tbody>
    {#each aliases as alias}
      <tr>
        <td>
          <span>{alias.name}</span>
        </td>
        <td>
          <span>{alias.link}</span>
        </td>
        <td>
          <button on:click={() => onLaunch(alias)}>Launch</button>
        </td>
        <td>
          <button on:click={() => onDeleteAlias(alias)}>Delete</button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
