<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { FileUpload, Button, Icon } from "@lib/components";

  const dispatch = createEventDispatcher();

  export let files = [];

  let dropzoneEl;

  let draggingOver = false;

  const onFiles = newFiles => {
    dispatch("files", [...files, ...newFiles]);
  };

  const removeFile = index => {
    const updatedFiles = [];
    for (let i = 0; i < files.length; ++i) {
      if (i !== index) {
        updatedFiles.push(files[i]);
      }
    }

    dispatch("files", updatedFiles);
  };

  const onDragEnter = e => {
    draggingOver = true;
  };

  const onDragLeave = e => {
    draggingOver = false;
  };

  const onDrop = e => {
    e.preventDefault();

    draggingOver = false;

    const newFiles = [];

    if (e.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (e.dataTransfer.items[i].kind === "file") {
          newFiles.push(e.dataTransfer.items[i].getAsFile());
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        newFiles.push(e.dataTransfer.files[i]);
      }
    }

    onFiles(newFiles);
  };

  const onDragOver = () => false;

  onMount(() => {
    dropzoneEl.ondragover = () => false;
  });
</script>

<style>
  .dropzone {
    border: 2px dashed #dc143c;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
  }

  .dropzone-content {
    padding: 100px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .large-icon {
    font-size: 24px;
    margin-bottom: 16px;
  }

  .drag-files {
    margin-bottom: 4px;
  }

  .or {
    font-size: 12px;
    margin-bottom: 7px;
  }

  .upload-button {
    margin-bottom: 20px;
  }

  .upload-button:last-child {
    margin-bottom: 0;
  }

  .file {
    display: flex;
    align-items: center;
    /* margin-bottom: 5px; */
    font-size: 12px;
  }

  .file:last-of-type {
    margin-bottom: 0;
  }

  .draggingOver {
    background-color: #e9e5e6;
  }
</style>

<div
  class="dropzone"
  class:draggingOver
  bind:this={dropzoneEl}
  on:dragenter={onDragEnter}
  on:dragleave={onDragLeave}
  on:drop={onDrop}
  on:dragover={onDragOver}>
  <div class="dropzone-content">
    {#if draggingOver}
      <slot name="dragging" />
    {:else}
      <slot name="initial">
        <div class="large-icon">
          <Icon large name="cloud-upload-alt" />
        </div>
        <div class="drag-files">Drag and drop files here to upload</div>
        <div class="or">or</div>
        <div class="upload-button">
          <FileUpload multiple on:files={e => onFiles(e.detail)}>
            <Button padded primary>Click to browse</Button>
          </FileUpload>
        </div>
        {#each files as file, i}
          <div class="file">
            {file.name}&nbsp;
            <Button transparent on:click={() => removeFile(i)}>
              <Icon red name="times" />
            </Button>
          </div>
        {/each}
      </slot>
    {/if}
  </div>
</div>
