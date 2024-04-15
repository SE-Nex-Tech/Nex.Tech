import React, { useState, useEffect, useRef } from "react";
import { Button, Group, Stack, Input, FileInput, Textarea } from "@mantine/core";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddForm = ({ selectedRows, closeModal, refreshKey, setRefreshKey, setNotification }) => {
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
  const publisher = useRef("");
  const [copyrightDate, setCopyrightDate] = useState("");

  const image = useRef("");

  const [imageData, setImageData] = useState(image.current);

  const fileInputRef = useRef(null);

  const [condition, setCondition] = useState("");


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


  const create = async () => {

    if (barcode.current == "") {
      barcode.current = null;
    }

    if (accnum.current == "") {
      accnum.current = null;
    }

    barcode.current = parseInt(barcode.current);
    accnum.current = parseInt(accnum.current);

    // TODO: include barcode and copyright data in inputs
    const atts = {
      barcode: barcode.current,
      title: title.current,
      author: author.current,
      call_num: callnum.current,
      accession_num: accnum.current,
      edition: edition.current,
      publisher: publisher.current,
      copyright_date: copyrightDate,
      image: image.current,
      condition: condition,
      status: "Available",
    };

    // console.log(atts);

    // // Integer input validation
    // const ints = ["accession_num", "barcode"];
    // for (let i = 0; i < ints.length; i++) {
    //   let input = atts[ints[i]];

    //   let re = /[^0-9]+/;
    //   console.log(re.test(input));

    //   if (re.test(input)) {
    //     // TODO: create toast alerting invalid input
    //     console.log("invalid input for " + ints[i]);
    //     console.log(atts[ints[i]]);
    //     return;
    //   } else {
    //     console.log("parsing " + ints[i] + " to integer...");
    //     atts[ints[i]] = parseInt(atts[ints[i]]);
    //   }
    // }/

    const response = await fetch("/api/db", {
      method: "POST",
      body: JSON.stringify({
        entity: "books",
        create: 1,
        data: atts,
      }),
    });

    // if (refreshKey == 1) {
    //   setRefreshKey(0);
    // } else {
    //   setRefreshKey(1);
    // }

    setNotification("Item Created successfully!");
    closeModal();
  };
  return (
    <>
      <div style={{overflow: "auto"}}>
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
          <Input.Wrapper label={<strong>Barcode</strong>}>
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
          <Input.Wrapper label={<strong>Accession Number</strong>}>
            <Input
              placeholder="3550736"
              onChange={(e) => {
                accnum.current = e.target.value;
                setAccNum(e.target.value);
              }}
            />
          </Input.Wrapper>
          <Input.Wrapper label={<strong>Edition</strong>}>
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
          <Input.Wrapper label={<strong>Publisher</strong>}>
            <Input
              placeholder="TechPress"
              onChange={(e) => (publisher.current = e.target.value)}
            />
          </Input.Wrapper>
          <Input.Wrapper label={<strong>Copyright Date</strong>}>
            <Input
              placeholder="2024"
              onChange={(e) => (setCopyrightDate(e.target.value))}
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
            value={condition}
            autosize
            placeholder="Complete components and in perfect condition"
            onChange={(event) => setCondition(event.currentTarget.value)}
          />
        </Input.Wrapper>



        <Stack justify="center" grow mt="xl">
          <Button
            variant="filled"
            color="rgb(141, 16, 56)"
            radius="xl"
            onClick={create}
            disabled={
              !titleValue ||
              !callNumValue
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
      </div>
    </>
  );
};

export default AddForm;
