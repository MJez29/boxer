<script>
  import TextInput from "../components/TextInput";
  import Card from "../components/Card";
  import Label from "../components/Label";
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
      <TextInput />
    </div>
    <div class="f30">
      <Label>Link</Label>
      <TextInput />
    </div>
  </div>
</Card>
