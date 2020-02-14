<script>
  import TextInput from "../components/TextInput";
  import Card from "../components/Card";
  import Label from "../components/Label";
  import Button from "../components/Button";
  import { saveAlias } from "../../lib/storage";

  let name = "";
  let link = "";

  async function onSave() {
    try {
      await saveAlias(name, link);
      alert("Alias saved!");
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    }
  }
</script>

<style>
  .flex {
    display: flex;
  }

  .f30 {
    flex: 1 1 30%;
  }
</style>

<Card>
  <div class="flex">
    <div class="f30">
      <Label>Name</Label>
      <TextInput bind:value={name} placeholder="facebook" />
    </div>
    <div class="f30">
      <Label>Link</Label>
      <TextInput bind:value={link} placeholder="https://facebook.com" />
    </div>
    <div>
      <Button on:click={onSave}>Save</Button>
    </div>
  </div>
</Card>
