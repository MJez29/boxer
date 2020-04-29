<script>
  import { TextAreaInput } from "@lib/components";
  import ModalFooter from "@options/components/ModalFooter";
  import { getModalContext } from "@options/contexts";
  import { getAliasesFromString } from "@lib/import";
  import ImportAliasesModal from "@options/components/ImportAliasesModal.svelte";

  const { hideModal, replaceModal } = getModalContext();

  export let activeTab = false;

  let value = "";
  let inputEl;

  $: {
    if (activeTab && inputEl) {
      inputEl.focus();
    }
  }

  const onInput = e => {
    value = e.detail;
  };

  const onImport = () => {
    const aliases = getAliasesFromString(value);
    replaceModal(ImportAliasesModal, { aliases });
  };

  const placeholder = JSON.stringify(
    { aliases: [{ name: "example", link: "https://example.com" }] },
    null,
    2
  );
</script>

<TextAreaInput
  code
  {placeholder}
  bind:this={inputEl}
  {value}
  on:input={onInput} />

<ModalFooter on:confirm={onImport} on:cancel={hideModal}>
  <span slot="confirm">Import</span>
</ModalFooter>
