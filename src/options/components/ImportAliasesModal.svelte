<script>
  import AliasTable from "@options/components/AliasTable";
  import { areAliasesEqual } from "@lib/aliases";
  import { Header, P, Button } from "@lib/components";
  import { getModalContext } from "@options/contexts";
  import { mergeAliases } from "@lib/storage";

  export let aliases = [];

  const { hideModal } = getModalContext();

  const onDeleteAlias = event => {
    const alias = event.detail;
    aliases = aliases.filter(a => !areAliasesEqual(a, alias));
  };

  const onDeleteAliases = event => {
    const aliasesToDelete = event.detail;
    aliases = aliases.filter(
      a => !aliasesToDelete.find(atd => areAliasesEqual(a, atd))
    );
  };

  const onAliasChange = event => {
    const { old: oldAlias, new: newAlias } = event.detail;
    if (!oldAlias) {
      aliases = [...aliases, newAlias];
    } else {
      for (let i = 0; i < aliases.length; ++i) {
        if (areAliasesEqual(oldAlias, aliases[i])) {
          aliases[i] = newAlias;
          break;
        }
      }
    }
  };

  const importAliases = () => {
    mergeAliases(aliases);
    hideModal();
  };
</script>

<style>
  .content {
    background-color: white;
    padding: 25px;
    width: 1000px;
    max-width: calc(100vw - 100px);
  }

  .heading {
    margin-bottom: 25px;
  }

  .footing {
    margin-top: 25px;
    display: flex;
    flex-direction: row-reverse;
  }

  .primary-button {
    margin-left: 20px;
  }
</style>

<div class="content">
  <div class="heading">
    <Header>Add aliases</Header>
    <P>Review and edit the aliases you are about to add</P>
  </div>
  <AliasTable
    {aliases}
    on:deleteAlias={onDeleteAlias}
    on:deleteAliases={onDeleteAliases}
    on:aliasChange={onAliasChange} />
  <div class="footing">
    <div class="primary-button">
      <Button primary padded on:click={importAliases}>Add aliases</Button>
    </div>
    <Button transparent padded on:click={hideModal}>Cancel</Button>
  </div>
</div>
