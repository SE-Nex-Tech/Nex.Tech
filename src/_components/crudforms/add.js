import React, { useState, useEffect, useRef } from "react";
import { Button, Group, Stack, Input } from "@mantine/core";

const AddForm = ({ selectedRows, closeModal }) => {
  const barcode = useRef("");
  const [barcodeValue, setBarcodeValue] = useState("");
  const title = useRef("");
  const [titleValue, setTitleValue] = useState("");
  const author = useRef("");
  const callnum = useRef("");
  const [callNumValue, setCallNumValue] = useState("");
  const accnum = useRef(0);
  const [accNum, setAccNum] = useState("");
  const edition = useRef("");
  const [editionValue, setEditionValue] = useState("");
  const pubplace = useRef("");
  const publisher = useRef("");
  const image = useRef("");

  const [imageFile, setImageFile] = useState([]);


  // When the file is selected, set the file state
  const onFileChange = (e) => {
    if (!e.target.files) {
      return;
    }


    setImageFile(e.target.files[0]);
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

  const create = async () => {

    if (!imageFile) {
      return;
    }

    // Convert the file to base64
    const base64 = await toBase64(imageFile);

    image.current = base64;

    // TODO: include barcode and copyright data in inputs
    const atts = {
      barcode: barcode.current,
      title: title.current,
      author: author.current,
      call_num: callnum.current,
      accession_num: accnum.current,
      edition: edition.current,
      publication_place: pubplace.current,
      publisher: publisher.current,
      copyright_date: new Date().toISOString(),
      image: image.current,
      status: "available",
    };

    console.log(atts);

    // Integer input validation
    const ints = ["accession_num", "barcode"];
    for (let i = 0; i < ints.length; i++) {
      let input = atts[ints[i]];

      let re = /[^0-9]+/;
      console.log(re.test(input));

      if (re.test(input)) {
        // TODO: create toast alerting invalid input
        console.log("invalid input for " + ints[i]);
        console.log(atts[ints[i]]);
        return;
      } else {
        console.log("parsing " + ints[i] + " to integer...");
        atts[ints[i]] = parseInt(atts[ints[i]]);
      }
    }

    const response = await fetch("/api/db", {
      method: "POST",
      body: JSON.stringify({
        entity: "books",
        create: 1,
        data: atts,
      }),
    });

    closeModal();
  };
  return (
    <>
      <Group grow mb={20}>
        <Input.Wrapper label={<strong>Book Title</strong>} required>
          <Input
            placeholder="The Network Navigators"
            onChange={(e) => {
              title.current = e.target.value;
              setTitleValue(e.target.value);
            }}
          />
        </Input.Wrapper>
      </Group>
      <Group grow mb={20}>
        <Input.Wrapper label={<strong>Barcode</strong>} required>
          <Input
            placeholder="8293213"
            onChange={(e) => {
              barcode.current = e.target.value;
              setBarcodeValue(e.target.value);
            }}
          />
        </Input.Wrapper>
        <Input.Wrapper label={<strong>Book Author</strong>}>
          <Input
            placeholder="Avram Thickin"
            onChange={(e) => {
              author.current = e.target.value;
            }}
          />
        </Input.Wrapper>
      </Group>
      <Group grow mb={20}>
        <Input.Wrapper label={<strong>Call Number</strong>} required>
          <Input
            placeholder="Wklt.Md.2Wh.qJ3 2058"
            onChange={(e) => {
              callnum.current = e.target.value;
              setCallNumValue(e.target.value);
            }}
          />
        </Input.Wrapper>
        <Input.Wrapper label={<strong>Accession Number</strong>} required>
          <Input
            placeholder="3550736"
            onChange={(e) => {
              accnum.current = e.target.value;
              setAccNum(e.target.value);
            }}
          />
        </Input.Wrapper>
        <Input.Wrapper label={<strong>Edition</strong>} required>
          <Input
            placeholder="18th"
            onChange={(e) => {
              edition.current = e.target.value;
              setEditionValue(e.target.value);
            }}
          />
        </Input.Wrapper>
      </Group>
      <Group grow>
        <Input.Wrapper label={<strong>Publication Place</strong>}>
          <Input
            placeholder="CodeCraft Press"
            onChange={(e) => (pubplace.current = e.target.value)}
          />
        </Input.Wrapper>
        <Input.Wrapper label={<strong>Publisher</strong>}>
          <Input
            placeholder="TechPress"
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
          onClick={create}
          disabled={
            !titleValue ||
            !accNum ||
            !callNumValue ||
            !editionValue ||
            !barcodeValue
          }
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

export default AddForm;
