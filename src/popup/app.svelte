<script>
  import { Label, TextInput, Button, Hr, P, A } from "@lib/components";
  import { getActiveTab } from "@lib/tabs";
  import { getNameSuggestion } from "@lib/aliases";
  import { saveAlias, getAliasesByLink, replaceAlias } from "@lib/storage";
  import { onMount } from "svelte";

  let aliasName = "";
  let aliasLink = "";
  let existingAlias;
  let tab;
  let submitted = false;

  const onAliasNameChange = event => {
    aliasName = event.detail;
    submitted = false;
  };

  const onAliasLinkChange = event => {
    aliasLink = event.detail;
    submitted = false;
  };

  const addAlias = async () => {
    return await saveAlias(aliasName, aliasLink);
  };

  const updateAlias = async () => {
    return await replaceAlias(existingAlias, {
      name: aliasName,
      link: aliasLink
    });
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (existingAlias) {
      await updateAlias();
    } else {
      await addAlias();
    }
    submitted = true;
  };

  onMount(async () => {
    tab = await getActiveTab();
    aliasLink = tab.url;
    const existingAliases = await getAliasesByLink(aliasLink);
    if (existingAliases.length > 0) {
      existingAlias = existingAliases[0];
      aliasName = existingAlias.name;
    } else {
      aliasName = getNameSuggestion(tab);
    }
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

  .inner-container {
    padding: 15px 0;
  }

  .inner-container:first-child {
    padding-top: 0;
  }

  .inner-container:last-child {
    padding-bottom: 0;
  }

  .field-container {
    margin-bottom: 15px;
  }

  .button-container {
    text-align: center;
  }
</style>

<div class="container">
  <form on:submit={onSubmit} class="inner-container">
    <div class="field-container">
      <Label>Alias name</Label>
      <TextInput
        autofocus
        placeholder="foo bar"
        value={aliasName}
        on:input={onAliasNameChange} />
    </div>
    <div class="field-container">
      <Label>Alias link</Label>
      <TextInput
        placeholder="https://foo.bar"
        value={aliasLink}
        on:input={onAliasLinkChange} />
    </div>
    <div class="button-container">
      <Button fullWidth primary padded disabled={submitted}>
        {#if submitted}
          Saved!
        {:else if existingAlias}Update alias{:else}Add alias{/if}
      </Button>
    </div>
  </form>
  <Hr />
  <div class="button-container inner-container">
    <A transparent padded href="/aliases.html" newTab>My aliases</A>
  </div>
</div>
