<script>
  import { getAliases, deleteAlias } from "../../../lib/storage";
  import { onMount } from "svelte";
  import { downloadAliases } from "../../../lib/download";
  import Card from "../../components/Card";
  import Icon from "../../components/Icon";
  import Button from "../../components/Button";

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
    border-collapse: collapse;
    width: 100%;
  }

  tr {
    border-bottom: 2px solid rgba(41, 4, 11, 0.1);
    height: 40px;
  }

  tr:first-of-type {
    border-top: 2px solid rgba(41, 4, 11, 0.1);
  }

  td,
  td * {
    color: #dc143c;
  }
</style>

<Card>
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
            <Button transparent>
              <a href={alias.link}>
                <Icon name="external-link-alt" />
              </a>
            </Button>
          </td>
          <td>
            <Button on:click={() => onDeleteAlias(alias)} transparent>
              <Icon name="trash" />
            </Button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</Card>
