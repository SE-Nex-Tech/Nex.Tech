import { NativeSelect, rem } from "@mantine/core";

function Sort() {
  return (
    <NativeSelect radius="xl" w={rem(200)} onChange={(e) => (console.log(e.target.value))}>
      <option>Sort by:</option>

      <hr />

      <optgroup label="ID">
        <option value="id_ascending">Ascending</option>
        <option value="id_descending">Descending</option>
      </optgroup>

      <hr />
      <optgroup label="Title">
        <option value="title_ascending">Ascending</option>
        <option value="title_descending">Descending</option>
      </optgroup>

      <hr />

      <optgroup label="Author">
        <option value="author_ascending">Ascending</option>
        <option value="author_descending">Descending</option>
      </optgroup>
    </NativeSelect>
  );
}

export default Sort;
