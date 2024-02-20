import { Button, Group, Select } from "@mantine/core";
import React from "react";

const EditForm = () => {
  return (
    <>
      <Group justify="center" grow>
        <Select
          label="Select By"
          placeholder="Pick value"
          data={["ID", "Author", "Title", "Publisher"]}
          mb="xl"
        />
      </Group>

      <Group justify="center" grow>
        <Button variant="filled" color="rgb(141, 16, 56)" radius="xl">
          Save
        </Button>
        <Button variant="outline" color="rgb(141, 16, 56)" radius="xl">
          Discard
        </Button>
      </Group>
    </>
  );
};

export default EditForm;
