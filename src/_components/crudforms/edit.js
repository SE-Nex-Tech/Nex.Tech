import { Button, Group, Select, Input, Table, Stack } from "@mantine/core";
import React, { useState, useEffect, useRef } from "react";
import TableBody from "../tables/table";

const EditForm = ({ selectedRows, closeModal }) => {
  const [selectedValue, setSelectedValue] = useState("");


  const [imageFile, setImageFile] = useState([]);


  // When the file is selected, set the file state
  const onFileChange = (e) => {
    if (!e.target.files) {
      return;
    }


    setImageFile(e.target.files[0]);
  };


  // On submit, upload the file
  const handleSubmit = async (e) => {

    //   // You can upload the base64 to your server here
    //   await fetch("/api/your-upload-endpoint", {
    //     method: "POST",
    //     body: JSON.stringify({ base64 }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });

  };

  // Convert a file to base64 string
  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };



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
  const image = useRef(selectedRows[0].image);

  const editRecord = async () => {

    if (!imageFile) {
      return;
    }

    // Convert the file to base64
    const base64 = await toBase64(imageFile);

    image.current = base64;

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
      image: image.current,
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


    setImageFile(null);
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

      <h1>Upload Image</h1>
      <Input
        type="file"
        name="avatar"
        accept="image/*"
        onChange={onFileChange}
      />



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
