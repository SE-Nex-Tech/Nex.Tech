import { NativeSelect, rem } from "@mantine/core";

function Sort() {
  return (
    <NativeSelect radius="xl" w={rem(200)}>
      <option>Sort by:</option>

      <hr />

      <optgroup label="ID">
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
      </optgroup>

      <hr />
      <optgroup label="Title">
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
      </optgroup>

      <hr />

      <optgroup label="Author">
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
      </optgroup>
    </NativeSelect>
  );
}

export default Sort;
