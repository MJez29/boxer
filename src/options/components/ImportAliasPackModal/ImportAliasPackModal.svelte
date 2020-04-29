<script>
  import AliasTable from "@options/components/AliasTable";
  import { areAliasesEqual } from "@lib/aliases";
  import {
    Header,
    P,
    Button,
    Subheader,
    Hr,
    TextInput,
    Label,
    Tabs
  } from "@lib/components";
  import { getModalContext } from "@options/contexts";
  import { mergeAliases } from "@lib/storage";
  import ImportFile from "./ImportFile.svelte";
  import ImportUrl from "./ImportUrl.svelte";
  import ImportText from "./ImportText.svelte";

  export let aliases = [];

  const { hideModal } = getModalContext();

  const importAliases = async () => {
    await mergeAliases(aliases);
    hideModal();
  };
</script>

<style>
  .content {
    width: 1000px;
    max-width: calc(100vw - 100px);
  }
</style>

<div class="content">
  <Tabs
    headers={['Import file', 'Import URL', 'Import text']}
    bodies={[ImportFile, ImportUrl, ImportText]} />
</div>
