<script>
  import { FileDropzone } from "@lib/components";
  import ModalFooter from "@options/components/ModalFooter.svelte";
  import { getModalContext } from "@options/contexts";
  import { getAliasesFromFiles } from "@lib/import";
  import ImportAliasesModal from "@options/components/ImportAliasesModal.svelte";

  const { hideModal, replaceModal } = getModalContext();

  let files = [];

  const onFiles = e => {
    files = e.detail;
  };

  const onImport = async () => {
    const aliases = await getAliasesFromFiles(files);
    await replaceModal(ImportAliasesModal, { aliases });
  };
</script>

<FileDropzone {files} on:files={onFiles} />
<ModalFooter on:confirm={onImport} on:cancel={hideModal}>
  <span slot="confirm">Import</span>
</ModalFooter>
