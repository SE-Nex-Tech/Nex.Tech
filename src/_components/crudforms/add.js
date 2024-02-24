import React from "react";
import { Button, Group, Stack, Input } from "@mantine/core";

const AddForm = ({ selectedRows }) => {
  return (
    <>
      <Group grow mb={20}>
        <Input.Wrapper label={<strong>Book Title</strong>}>
          <Input placeholder="Book Title" />
        </Input.Wrapper>
        <Input.Wrapper label={<strong>Book Author</strong>}>
          <Input placeholder="Book Author" />
        </Input.Wrapper>
      </Group>
      <Group grow mb={20}>
        <Input.Wrapper label={<strong>Call Number</strong>}>
          <Input placeholder="Call Number" />
        </Input.Wrapper>
        <Input.Wrapper label={<strong>Accession Number</strong>}>
          <Input placeholder="Accession Number" />
        </Input.Wrapper>
        <Input.Wrapper label={<strong>Edition</strong>}>
          <Input placeholder="Edition" />
        </Input.Wrapper>
      </Group>
      <Group grow>
        <Input.Wrapper label={<strong>Publication Place</strong>}>
          <Input placeholder="Publication Plce" />
        </Input.Wrapper>
        <Input.Wrapper label={<strong>Publisher</strong>}>
          <Input placeholder="Publisher" />
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

export default AddForm;
