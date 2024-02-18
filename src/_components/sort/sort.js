import { NativeSelect } from "@mantine/core";

function Sort() {
  return (
    <NativeSelect radius="xl">
      <option>Sort by:</option>

      <hr />

      <optgroup label="Title">
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
      </optgroup>

      <hr />

      <optgroup label="Author">
        <option value="express">Express</option>
        <option value="koa">Koa</option>
        <option value="django">Django</option>
      </optgroup>
    </NativeSelect>
  );
}

export default Sort;
