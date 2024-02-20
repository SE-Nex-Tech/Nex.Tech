import { Button, Group, Select, Input, Table } from "@mantine/core";
import React, { useState } from "react";
import TableBody from "../tables/table";

const EditForm = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <>
      <Group justify="center" grow mb="xl">
        <Select
          placeholder="Pick value"
          data={["ID", "Author", "Title", "Publisher"]}
          radius="xl"
          onChange={handleSelectChange}
        />
        <Input disabled={!selectedValue} radius="xl" placeholder="Search" />
      </Group>
      <TableBody pageSize={4} disablePageButton="false" />
      <Group justify="center" grow mt="xl">
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
