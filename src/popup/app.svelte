<script>
  import { Label, TextInput, Button, Hr } from "@lib/components";
  import { getActiveTab } from "@lib/tabs";
  import { getNameSuggestion } from "@lib/aliases";
  import { saveAlias } from "@lib/storage";
  import { onMount } from "svelte";

  let aliasName = "";
  let tab;

  const onAliasNameChange = event => {
    aliasName = event.detail;
  };

  const addAlias = () => {
    saveAlias(aliasName, tab.url);
  };

  onMount(async () => {
    tab = await getActiveTab();
    aliasName = getNameSuggestion(tab);
  });
</script>

<style>
  :global(body) {
    margin: 0;
    font-size: 1em;
    background-color: #f5f5f5;
  }

  :global(*) {
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
  }

  .container {
    width: 300px;
    padding: 15px;
  }

  .button-container {
    margin: 15px auto;
    text-align: center;
  }

  .button-container:last-of-type {
    margin-bottom: 0;
  }
</style>

<div class="container">
  <Label>Alias name</Label>
  <TextInput
    placeholder="foo bar"
    value={aliasName}
    on:input={onAliasNameChange} />
  <div class="button-container">
    <Button fullWidth primary padded on:click={addAlias}>
      Add alias for page
    </Button>
  </div>
  <Hr />
  <div class="button-container">
    <Button transparent padded>My aliases</Button>
  </div>
</div>
