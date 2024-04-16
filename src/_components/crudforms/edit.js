import { Button, Group, Select, Input, Table, Stack, Center, Textarea, NumberInput, } from "@mantine/core";
import React, { useState, useEffect, useRef } from "react";
import TableBody from "../tables/tableBooks";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditForm = ({ selectedRows, setSelectedRows, closeModal, setRefreshKey, refreshKey, setNotification, selectedType, bookDB, gameDB }) => {
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

  const type = useRef(selectedType.current);

  console.log(type.current);
  console.log(bookDB);
  console.log(gameDB);

  const [bookTitleError, setBookTitleError] = useState(false);
  const [gameTitleError, setGameTitleError] = useState(false);
  const [callNumError, setCallNumError] = useState(false);
  const [authorError, setAuthorError] = useState(false);

  const validateFormSubmit = () => {
    const checkEmptyField = (value, setErrorState) => {
      if (
        value.current == "" ||
        value.current == null ||
        value.current == "None"
      ) {
        setErrorState(true);
        return false;
      } else {
        setErrorState(false);
        return true;
      }
    };

    var isValid = true;

    console.log(type.current);

    if (type.current == "books") {
      isValid = !bookTitleError
        ? checkEmptyField(title, setBookTitleError) && isValid
        : !bookTitleError;

      isValid = !authorError
        ? checkEmptyField(author, setAuthorError) && isValid
        : !authorError;
    } else {
      isValid = !gameTitleError
        ? checkEmptyField(title, setGameTitleError) && isValid
        : !gameTitleError;
    }

    isValid = !callNumError
      ? checkEmptyField(callnum, setCallNumError) && isValid
      : !callNumError;

    console.log(isValid);
    if (isValid) {
      editRecord();
    } else {
      toast.error("Missing/Incorrect fields", { autoClose: 2000 });
    }
  };

  const validateInputChange = (value, refValue, setErrorState) => {
    if (value.replace(/\s/g, "") == "" || value == null || value == "None") {
      // If the value is empty or contains only whitespace
      setErrorState(true); // Set state to true
      refValue.current = value;
    } else {
      setErrorState(false); // Set state to false
      refValue.current = value; // Update the value
    }
  };

  const bookTitleText = bookTitleError
    ? "This field is required"
    : "Fundamentals of Computer Programming";

  const gameTitleText = gameTitleError
    ? "This field is required"
    : "Game of the Generals";

  const callNumText = callNumError
    ? "This field is required"
    : "QA76.56.F1 .Tb21c 2024";

  const authorText = authorError
    ? "This field is required"
    : "John Smith";




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

    // console.log(data);
    // console.log(data2);

    if (selectedRows[0] == null) {
      return;
    }

    if (barcode.current == "") {
      barcode.current = null;
    }

    if (accnum.current == "") {
      accnum.current = null;
    }

    barcode.current = parseInt(barcode.current);
    accnum.current = parseInt(accnum.current);

    console.log(selectedType.current);
    if (selectedType.current == "books") {
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

    } else {

      const filter = {
        id: selectedRows[0].actual_id,
      };
      const atts = {
        barcode: barcode.current,
        title: title.current,
        call_num: callnum.current,
        accession_num: accnum.current,
        copyright_date: copyright_date.current,
        publisher: publisher.current,
        image: image.current,
        condition: condition.current
      };

      console.log("proceeding");
      const response = await fetch("/api/db", {
        method: "POST",
        body: JSON.stringify({
          entity: "boardgames",
          update: 1,
          where: filter,
          data: atts,
        }),
      });

    }

    setNotification("Item Edited successfully!");
    closeModal();
    setSelectedRows([]);
  };
  return (
    <>
      <Group grow mb={20}>
        {(type.current === 'books') && (
          <Input.Wrapper label={<strong>Book Title</strong>}>
            <Input
              defaultValue={selectedRows[0]?.title}

              onChange={(e) => {
                validateInputChange(e.target.value, title, setBookTitleError);
              }}

              error={bookTitleError}
              placeholder={bookTitleText}

            />
          </Input.Wrapper>
        )}

        {(type.current === 'games') && (
          <Input.Wrapper label={<strong>Boardgame Title</strong>}>
            <Input
              defaultValue={selectedRows[0]?.title}
              onChange={(e) => {
                validateInputChange(e.target.value, title, setGameTitleError);
              }}
              error={gameTitleError}
              placeholder={gameTitleText}
            />
          </Input.Wrapper>
        )}
      </Group>

      <Group grow mb={20}>
        <Input.Wrapper label={<strong>Call Number</strong>}>
          <Input
            defaultValue={selectedRows[0]?.call_num}
            onChange={(e) => {
              validateInputChange(e.target.value, callnum, setCallNumError);
            }}
            error={callNumError}
            placeholder={callNumText}
          />
        </Input.Wrapper>


        {(type.current === 'books') && (
          <Input.Wrapper label={<strong>Book Author</strong>}>
            <Input
              defaultValue={selectedRows[0]?.author}
              onChange={(e) => {
                validateInputChange(e.target.value, author, setAuthorError);
              }}
              error={authorError}
              placeholder={authorText}
            />
          </Input.Wrapper>
        )}

      </Group>
      <Group grow mb={20}>

        <Input.Wrapper label={<strong>Barcode</strong>}>
          <NumberInput
            hideControls
            allowNegative={false}
            allowDecimal={false}
            max={999999999999999999}
            clampBehavior="strict"
            placeholder="172284612332"
            defaultValue={selectedRows[0]?.barcode}
            onChange={(value) => (barcode.current = value)}
          />
        </Input.Wrapper>

        <Input.Wrapper label={<strong>Accession Number</strong>}>
          <NumberInput
            hideControls
            allowNegative={false}
            allowDecimal={false}
            max={999999999999999999}
            clampBehavior="strict"
            placeholder="202127216232"
            defaultValue={selectedRows[0]?.accession_num}
            onChange={(value) => (accnum.current = value)}
          />
        </Input.Wrapper>

        {(type.current === 'books') && (
          <Input.Wrapper label={<strong>Edition</strong>}>
            <Input
              placeholder="12th"
              defaultValue={selectedRows[0]?.edition}
              onChange={(e) => (edition.current = e.target.value)}
            />
          </Input.Wrapper>
        )}


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
          <NumberInput
            hideControls
            allowNegative={false}
            allowDecimal={false}
            max={2099}
            clampBehavior="strict"
            placeholder="2024"
            defaultValue={selectedRows[0]?.copyright_date}
            onChange={(value) => (copyright_date.current = value.toString())}
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
          onClick={validateFormSubmit}
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
      <ToastContainer
        position="top-right"
        limit={3}
        closeOnClick
        rtl={false}
        draggable
        theme="light"
      />
    </>
  );
};

export default EditForm;
