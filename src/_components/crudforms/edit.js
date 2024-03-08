import { Button, Group, Select, Input, Table, Stack } from "@mantine/core";
import React, { useState, useEffect, useRef } from "react";
import TableBody from "../tables/table";

const EditForm = ({ selectedRows, closeModal }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };

  const barcode = useRef(selectedRows[0].barcode);
  const title = useRef(selectedRows[0].title);
  const author = useRef(selectedRows[0].author);
  const callnum = useRef(selectedRows[0].call_num);
  const accnum = useRef(selectedRows[0].accession_num);
  const edition = useRef(selectedRows[0].edition);
  const pubplace = useRef(selectedRows[0].publication_place);
  const publisher = useRef(selectedRows[0].publisher);

  const editRecord = async () => {
    const filter = {
      id: selectedRows[0].actual_id,
    };
    const atts = {
      barcode: barcode.current,
      title: title.current,
      author: author.current,
      call_num: callnum.current,
      accession_num: accnum.current,
      edition: edition.current,
      publication_place: pubplace.current,
      publisher: publisher.current,
    };

    let re = /[^0-9]+/;
    if (re.test(atts.accession_num)) {
      console.log("invalid input for accession_num");
      return;
    } else {
      atts.accession_num = parseInt(atts.accession_num);
    }

    console.log("proceeding");
    const response = await fetch("/api/db", {
      method: "POST",
      body: JSON.stringify({
        entity: "books",
        update: 1,
        where: filter,
        data: atts,
      }),
    });

    closeModal();
  };

  return (
    <>
      <Group grow mb={20}>
        <Input.Wrapper label={<strong>Book Title</strong>}>
          <Input
            placeholder="Book Title"
            defaultValue={selectedRows[0].title}
            onChange={(e) => (title.current = e.target.value)}
          />
        </Input.Wrapper>
      </Group>
      <Group grow mb={20}>
        <Input.Wrapper label={<strong>Barcode</strong>}>
          <Input
            placeholder="Barcode"
            defaultValue={selectedRows[0].barcode}
            onChange={(e) => (barcode.current = e.target.value)}
          />
        </Input.Wrapper>
        <Input.Wrapper label={<strong>Book Author</strong>}>
          <Input
            placeholder="Book Author"
            defaultValue={selectedRows[0].author}
            onChange={(e) => (author.current = e.target.value)}
          />
        </Input.Wrapper>
      </Group>
      <Group grow mb={20}>
        <Input.Wrapper label={<strong>Call Number</strong>}>
          <Input
            placeholder="Call Number"
            defaultValue={selectedRows[0].call_num}
            onChange={(e) => (callnum.current = e.target.value)}
          />
        </Input.Wrapper>
        <Input.Wrapper label={<strong>Accession Number</strong>}>
          <Input
            placeholder="Accession Number"
            defaultValue={selectedRows[0].accession_num}
            onChange={(e) => (accnum.current = e.target.value)}
          />
        </Input.Wrapper>
        <Input.Wrapper label={<strong>Edition</strong>}>
          <Input
            placeholder="Edition"
            defaultValue={selectedRows[0].edition}
            onChange={(e) => (edition.current = e.target.value)}
          />
        </Input.Wrapper>
      </Group>
      <Group grow>
        <Input.Wrapper label={<strong>Publication Place</strong>}>
          <Input
            placeholder="Publication Plce"
            defaultValue={selectedRows[0].publication_place}
            onChange={(e) => (pubplace.current = e.target.value)}
          />
        </Input.Wrapper>
        <Input.Wrapper label={<strong>Publisher</strong>}>
          <Input
            placeholder="Publisher"
            defaultValue={selectedRows[0].publisher}
            onChange={(e) => (publisher.current = e.target.value)}
          />
        </Input.Wrapper>
      </Group>
      <Stack justify="center" grow mt="xl">
        <Button
          variant="filled"
          color="rgb(141, 16, 56)"
          radius="xl"
          onClick={editRecord}
        >
          Save
        </Button>
        <Button
          variant="outline"
          color="rgb(141, 16, 56)"
          radius="xl"
          onClick={closeModal}
        >
          Discard
        </Button>
      </Stack>
    </>
  );
};

export default EditForm;
