<script>
  import { TextInput, Label } from "@lib/components";
  import { getModalContext } from "@options/contexts";
  import { getAliasesFromUrl } from "@lib/import";
  import ModalFooter from "@options/components/ModalFooter.svelte";
  import ImportAliasesModal from "@options/components/ImportAliasesModal.svelte";
  import { HttpError, ParseError } from "@lib/errors";

  const { hideModal, replaceModal } = getModalContext();

  export let activeTab = false;

  let url = "";
  let inputEl;
  let errorMessage;

  $: {
    if (activeTab && inputEl) {
      inputEl.focus();
    }
  }

  const onInput = e => {
    url = e.detail;
    errorMessage = undefined;
  };

  const onImport = async () => {
    try {
      const aliases = await getAliasesFromUrl(url);
      await replaceModal(ImportAliasesModal, { aliases });
    } catch (e) {
      errorMessage = e.message;
    }
  };
</script>

<TextInput
  value={url}
  on:input={onInput}
  placeholder="https://example.com/boxer-aliases.json"
  bind:this={inputEl} />

{#if errorMessage}
  <Label>{errorMessage}</Label>
{/if}

<ModalFooter on:confirm={onImport} on:cancel={hideModal}>
  <span slot="confirm">Import</span>
</ModalFooter>
