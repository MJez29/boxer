<form on:submit={onSubmit}>
  <Label>Alias name</Label>
  <TextInput
    placeholder="foo bar"
    value={aliasName}
    on:input={onAliasNameChange} />
  <div class="button-container">
    <Button fullWidth primary padded>Add alias for page</Button>
  </div>
</form>
