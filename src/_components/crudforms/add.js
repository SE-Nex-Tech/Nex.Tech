import React, { useState, useEffect, useRef } from "react";
import { Button, Group, Stack, Input, FileInput, Textarea, NumberInput } from "@mantine/core";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddForm = ({ selectedRows, closeModal, refreshKey, setRefreshKey, setNotification, selectedType, bookDB, gameDB }) => {
  const barcode = useRef("");
  const title = useRef("");
  const author = useRef("");
  const callnum = useRef("");
  const accnum = useRef(0);
  const edition = useRef("");
  const publisher = useRef("");
  const image = useRef("");

  const [titleValue, setTitleValue] = useState("");
  const [callNumValue, setCallNumValue] = useState("");
  const [authorValue, setAuthorValue] = useState("");
  const [accNum, setAccNum] = useState("");
  const [editionValue, setEditionValue] = useState("");
  const [copyrightDate, setCopyrightDate] = useState("");
  const [barcodeValue, setBarcodeValue] = useState("");



  const [imageData, setImageData] = useState(image.current);

  const fileInputRef = useRef(null);

  const [condition, setCondition] = useState("");

  const type = useRef(selectedType.current);



  const [bookTitleError, setBookTitleError] = useState(false);
  const [gameTitleError, setGameTitleError] = useState(false);
  const [callNumError, setCallNumError] = useState(false);
  const [authorError, setAuthorError] = useState(false);

  console.log(type.current);
  console.log(bookDB);
  console.log(gameDB);

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
      create();
    } else {
      toast.error("Missing/Incorrect fields", { autoClose: 2000 });
    }
  };

  const validateInputChange = (value, refValue, setErrorState) => {
    if (value.replace(/\s/g, "") == "" || value == null || value == "None") {
      // If the value is empty or contains only whitespace
      setErrorState(true); // Set state to true
      refValue.current = value;
      if (type.current != "books") {
        setAuthorValue("1");
      }
    } else {
      setErrorState(false); // Set state to false
      refValue.current = value; // Update the value
      if (type.current != "books") {
        setAuthorValue("1");
      }
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


    if (selectedType.current == "books") {
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

      const response = await fetch("/api/db", {
        method: "POST",
        body: JSON.stringify({
          entity: "books",
          create: 1,
          data: atts,
        }),
      });
    } else {

      const atts = {
        barcode: barcode.current,
        title: title.current,
        call_num: callnum.current,
        accession_num: accnum.current,
        publisher: publisher.current,
        copyright_date: copyrightDate,
        image: image.current,
        condition: condition,
        status: "Available",
      };

      const response = await fetch("/api/db", {
        method: "POST",
        body: JSON.stringify({
          entity: "boardgames",
          create: 1,
          data: atts,
        }),
      });

    }

    setNotification("Item Created successfully!");
    closeModal();
  };
  return (
    <>
      <div style={{ overflow: "auto" }}>


        <Group grow mb={20}>

          {(type.current === 'books') && (
            <Input.Wrapper label={<strong>Book Title</strong>} required>
              <Input
                onChange={(e) => {
                  validateInputChange(e.target.value, title, setBookTitleError);
                  setTitleValue(e.target.value);
                }}
                error={bookTitleError}
                placeholder={bookTitleText}

              />
            </Input.Wrapper>
          )}

          {(type.current === 'games') && (
            <Input.Wrapper label={<strong>Boardgame Title</strong>} required>
              <Input
                onChange={(e) => {
                  validateInputChange(e.target.value, title, setGameTitleError);
                  setTitleValue(e.target.value);
                }}
                error={gameTitleError}
                placeholder={gameTitleText}
              />
            </Input.Wrapper>
          )}


        </Group>

        <Group grow mb={20}>

          <Input.Wrapper label={<strong>Call Number</strong>} required>
            <Input
              onChange={(e) => {
                validateInputChange(e.target.value, callnum, setCallNumError);
                setCallNumValue(e.target.value);
              }}
              error={callNumError}
              placeholder={callNumText}
            />
          </Input.Wrapper>

          {(type.current === 'books') && (
            <Input.Wrapper label={<strong>Book Author</strong>} required>
              <Input
                onChange={(e) => {
                  validateInputChange(e.target.value, author, setAuthorError);
                  setAuthorValue(e.target.value);
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
              onChange={(value) => (accnum.current = value)}
            />
          </Input.Wrapper>

          {(type.current === 'books') && (
            <Input.Wrapper label={<strong>Edition</strong>}>
              <Input
                placeholder="18th"
                onChange={(e) => {
                  edition.current = e.target.value;
                  setEditionValue(e.target.value);
                }}
              />
            </Input.Wrapper>
          )}


        </Group>
        <Group grow>

          <Input.Wrapper label={<strong>Publisher</strong>}>
            <Input
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
              onChange={(value) => (setCopyrightDate(value.toString()))}
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
            onClick={validateFormSubmit}
            disabled={
              !titleValue ||
              !callNumValue || !authorValue
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
