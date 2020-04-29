<script>
  import AliasTable from "@options/components/AliasTable";
  import { areAliasesEqual } from "@lib/aliases";
  import { Header, P, Button } from "@lib/components";
  import { getModalContext } from "@options/contexts";
  import { mergeAliases } from "@lib/storage";
  import ModalFooter from "@options/components/ModalFooter";

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

  const importAliases = async () => {
    await mergeAliases(aliases);
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
</style>

<div class="content">
  <div class="heading">
    <Header>Add aliases</Header>
    <P>Review and edit the aliases you are about to add</P>
  </div>
  <AliasTable
    autoFocus
    {aliases}
    on:deleteAlias={onDeleteAlias}
    on:deleteAliases={onDeleteAliases}
    on:aliasChange={onAliasChange} />
  <ModalFooter on:confirm={importAliases} on:cancel={hideModal}>
    <slot name="confirm">Add aliases</slot>
  </ModalFooter>
</div>
