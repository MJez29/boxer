<script>
  import { createEventDispatcher, beforeUpdate } from "svelte";
  import { getAliases, deleteAlias } from "@lib/storage";
  import { importFiles } from "@lib/import";
  import { getToastContext } from "../../contexts";
  import {
    Card,
    Icon,
    Button,
    FileUpload,
    Header,
    Checkbox,
    TextInput
  } from "@lib/components";

  export let name;
  export let link;
  export let selected = false;

  let editedName = "";
  let editedLink = "";

  const dispatch = createEventDispatcher();

  let editing = name === undefined && link === undefined;

  const onDelete = () => {
    dispatch("delete");
  };

  const onSelect = () => {
    dispatch("select", !selected);
  };

  const onEdit = () => {
    editing = true;
    editedName = name;
    editedLink = link;
  };

  const onNameInput = event => {
    editedName = event.detail;
  };

  const onLinkInput = event => {
    editedLink = event.detail;
  };

  const onCancel = () => {
    if (name !== undefined && link !== undefined) {
      editing = false;
    } else {
      editedLink = "";
      editedName = "";
    }
  };

  const onSave = () => {
    dispatch("alias", { name: editedName, link: editedLink });
    if (name !== undefined && link !== undefined) {
      editing = false;
    }
    editedName = "";
    editedLink = "";
  };
</script>

<style>
  .alias {
    border-bottom: 2px solid rgba(41, 4, 11, 0.1);
    height: 40px;
    display: flex;
    align-items: center;
    color: #dc143c;
  }

  .alias:first-of-type {
    border-top: 2px solid rgba(41, 4, 11, 0.2);
  }

  .alias a {
    color: inherit;
  }

  .select {
    flex: 0 0 40px;
  }

  .name {
    width: calc(calc(100% - 160px) * 0.33333);
  }

  .editing {
    height: 100%;
  }

  .ellipsis {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .link {
    width: calc(calc(100% - 160px) * 0.66667);
  }

  .right-icon {
    flex: 0 0 40px;
    text-align: right;
  }
</style>

<div class="alias">
  <div class="select">
    {#if !editing}
      <Checkbox value={selected} on:check={onSelect} />
    {/if}
  </div>
  <div class="name" class:editing>
    {#if editing}
      <TextInput
        embed
        value={editedName}
        on:input={onNameInput}
        autoFocus
        placeholder="Enter a name" />
    {:else}
      <div class="ellipsis">{name}</div>
    {/if}
  </div>
  <div class="link" class:editing>
    {#if editing}
      <TextInput
        embed
        value={editedLink}
        on:input={onLinkInput}
        placeholder="Enter a link" />
    {:else}
      <div class="ellipsis">{link}</div>
    {/if}
  </div>
  <div class="right-icon">
    {#if !editing}
      <Button on:click={onEdit} transparent>
        <Icon name="pencil-alt" />
      </Button>
    {/if}
  </div>
  <div class="right-icon">
    {#if editing}
      <Button transparent on:click={onSave}>
        <Icon name="check" />
      </Button>
    {:else}
      <Button transparent tabIndex={-1}>
        <a href={link}>
          <Icon name="external-link-alt" />
        </a>
      </Button>
    {/if}
  </div>
  <div class="right-icon">
    {#if editing}
      <Button transparent on:click={onCancel}>
        <Icon name="times" />
      </Button>
    {:else}
      <Button on:click={onDelete} transparent>
        <Icon name="trash" />
      </Button>
    {/if}
  </div>
</div>
