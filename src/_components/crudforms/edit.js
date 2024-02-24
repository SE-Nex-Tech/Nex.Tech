import { Button, Group, Select, Input, Table, Stack } from "@mantine/core";
import React, { useState } from "react";
import TableBody from "../tables/table";

const EditForm = ({ selectedRows }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <>
      <Group grow mb={20}>
        <Input.Wrapper label={<strong>Book Title</strong>}>
          <Input
            placeholder="Book Title"
            defaultValue={selectedRows[0].book_title}
          />
        </Input.Wrapper>
        <Input.Wrapper label={<strong>Book Author</strong>}>
          <Input
            placeholder="Book Author"
            defaultValue={selectedRows[0].book_author}
          />
        </Input.Wrapper>
      </Group>
      <Group grow mb={20}>
        <Input.Wrapper label={<strong>Call Number</strong>}>
          <Input
            placeholder="Call Number"
            defaultValue={selectedRows[0].book_call_num}
          />
        </Input.Wrapper>
        <Input.Wrapper label={<strong>Accession Number</strong>}>
          <Input
            placeholder="Accession Number"
            defaultValue={selectedRows[0].book_accession_num}
          />
        </Input.Wrapper>
        <Input.Wrapper label={<strong>Edition</strong>}>
          <Input
            placeholder="Edition"
            defaultValue={selectedRows[0].book_edition}
          />
        </Input.Wrapper>
      </Group>
      <Group grow>
        <Input.Wrapper label={<strong>Publication Place</strong>}>
          <Input
            placeholder="Publication Plce"
            defaultValue={selectedRows[0].book_publication_place}
          />
        </Input.Wrapper>
        <Input.Wrapper label={<strong>Publisher</strong>}>
          <Input
            placeholder="Publisher"
            defaultValue={selectedRows[0].book_publisher}
          />
        </Input.Wrapper>
      </Group>
      <Stack justify="center" grow mt="xl">
        <Button variant="filled" color="rgb(141, 16, 56)" radius="xl">
          Save
        </Button>
        <Button variant="outline" color="rgb(141, 16, 56)" radius="xl">
          Discard
        </Button>
      </Stack>
    </>
  );
};

export default EditForm;
