import { Button, Group, Select, Input, Table, Stack, Center, Textarea } from "@mantine/core";
import React, { useState, useEffect, useRef } from "react";
import TableBody from "../tables/tableBooks";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditForm = ({ selectedRows, setSelectedRows, closeModal, setRefreshKey, refreshKey, setNotification }) => {
  const [selectedValue, setSelectedValue] = useState("");



  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };


  const barcode = useRef(selectedRows[0]?.barcode);
  const title = useRef(selectedRows[0]?.title);
  const author = useRef(selectedRows[0]?.author);
  const callnum = useRef(selectedRows[0]?.call_num);
  const accnum = useRef(selectedRows[0]?.accession_num);
  const edition = useRef(selectedRows[0]?.edition);
  const copyright_date = useRef(selectedRows[0]?.copyright_date);
  const publisher = useRef(selectedRows[0]?.publisher);
  const image = useRef(selectedRows[0]?.image);
  const condition = useRef(selectedRows[0]?.condition);



  const [imageData, setImageData] = useState(image.current);

  const fileInputRef = useRef(null);

  // When the file is selected, set the file state
  const onFileChange = (e) => {
    if (!e.target.files) {
      return;
    }

    if (e.target.files[0]) {

      const base64 = toBase64(e.target.files[0]);

      base64.then(result => {
        console.log(result);
        image.current = result;
        setImageData(image.current);
      }).catch(error => {

        console.error(error);
      });



    }

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

  const deleteImage = async () => {
    image.current = null;

    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Resetting the value (not directly setting it)
    }

    setImageData(null);
  }




  const editRecord = async () => {
    if (selectedRows[0] == null) {
      return;
    }
    console.log(image.current);

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
      copyright_date: copyright_date.current,
      publisher: publisher.current,
      image: image.current,
      condition: condition.current
    };

    let re = /[^0-9]+/;
    if (re.test(atts.accession_num)) {
      atts.accession_num = null;
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

    // if(refreshKey==1){
    //   setRefreshKey(0);
    // }else{
    //   setRefreshKey(1);
    // }

    setNotification("Item Edited successfully!");
    closeModal();
    setSelectedRows([]);
  };
  return (
    <>
      <Group grow mb={20}>
        <Input.Wrapper label={<strong>Book Title</strong>}>
          <Input
            placeholder="Book Title"
            defaultValue={selectedRows[0]?.title}
            onChange={(e) => (title.current = e.target.value)}
          />
        </Input.Wrapper>
      </Group>
      <Group grow mb={20}>
        <Input.Wrapper label={<strong>Barcode</strong>}>
          <Input
            placeholder="Barcode"
            defaultValue={selectedRows[0]?.barcode}
            onChange={(e) => (barcode.current = e.target.value)}
          />
        </Input.Wrapper>
        <Input.Wrapper label={<strong>Book Author</strong>}>
          <Input
            placeholder="Book Author"
            defaultValue={selectedRows[0]?.author}
            onChange={(e) => (author.current = e.target.value)}
          />
        </Input.Wrapper>
      </Group>
      <Group grow mb={20}>
        <Input.Wrapper label={<strong>Call Number</strong>}>
          <Input
            placeholder="Call Number"
            defaultValue={selectedRows[0]?.call_num}
            onChange={(e) => (callnum.current = e.target.value)}
          />
        </Input.Wrapper>
        <Input.Wrapper label={<strong>Accession Number</strong>}>
          <Input
            placeholder="Accession Number"
            defaultValue={selectedRows[0]?.accession_num}
            onChange={(e) => (accnum.current = e.target.value)}
          />
        </Input.Wrapper>
        <Input.Wrapper label={<strong>Edition</strong>}>
          <Input
            placeholder="Edition"
            defaultValue={selectedRows[0]?.edition}
            onChange={(e) => (edition.current = e.target.value)}
          />
        </Input.Wrapper>
      </Group>
      <Group grow>
        <Input.Wrapper label={<strong>Publisher</strong>}>
          <Input
            defaultValue={selectedRows[0]?.publisher}
            placeholder="TechPress"
            onChange={(e) => (publisher.current = e.target.value)}
          />
        </Input.Wrapper>
        <Input.Wrapper label={<strong>Copyright Date</strong>}>
          <Input
            placeholder="2024"
            defaultValue={selectedRows[0]?.copyright_date}
            onChange={(e) => (copyright_date.current = e.target.value)}
          />
        </Input.Wrapper>
      </Group>

      <h5>Upload Image  </h5>
      <Input
        ref={fileInputRef}
        type="file"
        name="avatar"
        accept="image/*"
        onChange={onFileChange}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 5, alignItems: "Center" }}>
        <h5>Preview </h5>
        {imageData && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "Center" }}>
            <Image src={imageData} width={110} height={140} alt="" />
            <Button
              variant="transparent"
              color="rgb(141, 16, 56)"
              radius="xl"
              style={{ width: 150, height: 30, fontSize: 12, }}
              onClick={deleteImage}
            >
              Remove Image
            </Button>
          </div>
        )}
        {!imageData && (<h5>No Image Set</h5>)}

      </div>


      <Input.Wrapper label={<strong>Condition</strong>}>
        <Textarea
          defaultValue={selectedRows[0]?.condition}
          autosize
          placeholder="Complete components and in perfect condition"
          onChange={(event) => (condition.current = event.currentTarget.value)}
        />
      </Input.Wrapper>


      <Stack justify="center" grow mt="xl" style={{ margin: 0 }}>
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
      <ToastContainer />
    </>
  );
};

export default EditForm;
