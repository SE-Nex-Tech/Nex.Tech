"use client";

import Header from "@/_components/header/Header";
import styles from "./borrowform.module.scss";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  TextInput,
  Select,
  Button,
  NumberInput,
  Modal,
  Input,
} from "@mantine/core";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { DateInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { IMaskInput } from "react-imask";
import ReactDOM from "react-dom";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import { useParams } from "next/navigation";
import { format, setSeconds } from "date-fns";
import Link from "next/link";
const BorrowForm = () => {
  const current = usePathname();
  const currentDate = new Date();
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedUserType, setSelectedUserType] = useState("Student");
  const timeZoneOffset = 480;

  const { id } = useParams();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");

  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  var copyright_date = "";

  const [reservation, setReservation] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1105) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const makeReservation = async () => {
    setShowConfirmation(false);
    open();

    const currentDateTime = new Date();

    userName.current =
      lastName.current + ", " + firstName.current + " " + middleName.current;

    const borrow = await fetch("/api/borrow", {
      method: "POST",
      body: JSON.stringify({
        entity: typeParam === "book" ? "book" : "game",
        date: new Date(
          currentDateTime.getTime() + timeZoneOffset * 60000
        ).toISOString(),
        materialID: parseInt(id),
        type: requestType.current,
        user_type: userType.current,
        studentID: studentNumber.current.toString(),
        employeeID: employeeNumber.current.toString(),
        name: userName.current,
        email: userEmail.current,
        department: userDepartment.current,
        year_level: yearLevel.current,
        section: section.current,
      }),
    });
    const result = await borrow.json();

    console.log("Reservation entry: ============");
    console.log(result.id);
    console.log({ id });

    setReservation(result["id"]);
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch("/api/db", {
          method: "POST",
          body: JSON.stringify({
            entity: typeParam === "book" ? "books" : "games",
            where: {
              id: parseInt(id),
            },
          }),
        });

        const selectedItem = await response.json();
        setItem(selectedItem[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    if (typeParam) fetchBook();
  }, [id, typeParam]);

  const downloadQRCode = () => {
    const qrCodeURL = document
      .getElementById("qrCode")
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let qr = document.createElement("a");
    qr.href = qrCodeURL;
    qr.download = "RequestQR.png";
    document.body.appendChild(qr);
    qr.click();
    document.body.removeChild(qr);
  };

  if (!item) {
    return <div>Item not found</div>;
  }

  if (item.copyright_date) {
    copyright_date = format(Date.parse(item.copyright_date), "MM/dd/yyyy");
  }

  const requestCode = useRef("201314214");
  const requestType = useRef(typeParam === "book" ? "Book" : "Game");
  const requestDate = format(currentDate, "MM/dd/yyyy");
  const studentNumber = useRef("");
  const employeeNumber = useRef("");
  const userType = useRef("Student");
  const firstName = useRef("");
  const lastName = useRef("");
  const middleName = useRef("");
  const userName = useRef("");
  const userEmail = useRef("");
  const userDepartment = useRef("None");
  const yearLevel = useRef("");
  const section = useRef("");
  const status = useRef("Pending");

  var itemId;
  var callNum;

  if (item) {
    itemId = item.id;
    callNum = item.call_num;
  }

  const [studentNumberError, setStudentNumberError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [sectionError, setSectionError] = useState(false);
  const [departmentError, setDepartmentError] = useState(false);
  const [yearLevelError, setYearLevelError] = useState(false);
  const [employeeNumberError, setEmployeeNumberError] = useState(false);

  const validateInputChange = (value, refValue, setErrorState) => {
    if (value == "" || value == null || value.current == "None") {
      // If the value is empty or contains only whitespace
      setErrorState(true); // Set state to true
      refValue.current = value;
    } else {
      setErrorState(false); // Set state to false
      refValue.current = value; // Update the value
    }
  };

  // Placeholder text based on error state
  const studentNumText = studentNumberError
    ? "This field is required"
    : "2021523418";
  const firstNameText = firstNameError ? "This field is required" : "John Doe";
  const lastNameText = lastNameError ? "This field is required" : "Smith";
  const emailText = emailError
    ? "This field is required"
    : "johndoe.smith@ust.edu.ph";
  const sectionText = sectionError
    ? "This field is required"
    : "CSA (IRG if irregular)";
  const departmentText = departmentError
    ? "This field is required"
    : "Select Department";
  const yearLevelText = yearLevelError
    ? "This field is required"
    : "Select Year Level";
  const employeeNumText = employeeNumberError
    ? "This field is required"
    : "2021523418";

  // Regular expression for validating 10-digit student numbers
  const numRegex = /^\d{10}$/;

  // Handle student number change with strict validation
  const handleNumberChange = (value, refValue, setErrorState) => {
    // Apply regex pattern to validate the input
    const isValid = numRegex.test(value);

    // Set the error state based on validation result
    setErrorState(!isValid);

    if (isValid) {
      // Update the input value if it's valid
      refValue.current = value;

      // Validate the input change
      validateInputChange(value, refValue, setErrorState);
    }
  };

  // Regular expression for validating the section format
  const sectionRegex = /^(CS|IT|IS)[A-Z]$|^IRG$/;

  // Handle section change with strict validation
  const handleSectionChange = (value) => {
    // Apply regex pattern to validate the input
    if (!sectionRegex.test(value.toUpperCase()) && value !== "") {
      // If the input doesn't match the pattern, but it's not empty, set the error state
      setSectionError(true); // Set error state to true
      return;
    } else {
      // If the input matches the pattern or it's empty, clear the error state
      setSectionError(false); // Set error state to false
      // Update the input value
      section.current = value; // Keep the value unchanged if it matches the pattern

      // Validate the input change
      validateInputChange(value, section, setSectionError);
      return;
    }
  };

  // Regular expression for validating email with "@ust.edu.ph" domain
  const emailRegex = /^[a-zA-Z0-9._%+-]+@ust\.edu\.ph$/;

  // Handle email change with strict validation
  const handleEmailChange = (value) => {
    // Apply regex pattern to validate the input
    const isValid = emailRegex.test(value);

    // Set the error state based on validation result
    setEmailError(!isValid);

    if (isValid) {
      // Update the input value if it's valid
      userEmail.current = value;

      // Validate the input change
      validateInputChange(value, userEmail, setEmailError);
    }
  };

  const validateFormSubmit = () => {
    console.log(userDepartment);

    console.log("section: " + sectionError);
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

    switch (selectedUserType) {
      case "Student":
        isValid = !studentNumberError
          ? checkEmptyField(studentNumber, setStudentNumberError) && isValid
          : !studentNumberError;
        isValid = checkEmptyField(firstName, setFirstNameError) && isValid;
        isValid = checkEmptyField(lastName, setLastNameError) && isValid;
        isValid =
          checkEmptyField(userDepartment, setDepartmentError) && isValid;
        isValid = checkEmptyField(yearLevel, setYearLevelError) && isValid;
        isValid = !emailError
          ? checkEmptyField(userEmail, setEmailError) && isValid
          : !emailError;
        isValid = !sectionError
          ? checkEmptyField(section, setSectionError) && isValid
          : !sectionError;
        break;
      case "Faculty":
        isValid = !employeeNumberError
          ? checkEmptyField(employeeNumber, setEmployeeNumberError) && isValid
          : !employeeNumberError;
        isValid = checkEmptyField(firstName, setFirstNameError) && isValid;
        isValid = checkEmptyField(lastName, setLastNameError) && isValid;
        isValid = !emailError
          ? checkEmptyField(userEmail, setEmailError) && isValid
          : !emailError;
        isValid =
          checkEmptyField(userDepartment, setDepartmentError) && isValid;
        break;
      case "Staff":
        isValid = !employeeNumberError
          ? checkEmptyField(employeeNumber, setEmployeeNumberError) && isValid
          : !employeeNumberError;
        isValid = checkEmptyField(firstName, setFirstNameError) && isValid;
        isValid = checkEmptyField(lastName, setLastNameError) && isValid;
        isValid = !emailError
          ? checkEmptyField(userEmail, setEmailError) && isValid
          : !emailError;
        break;
      default:
    }

    if (isValid) {
      openConfirmation();
    } else {
      console.log("Missing/Incorrect fields");
    }
  };

  const renderInputFields = (selectedUserType) => {
    switch (selectedUserType) {
      case "Student":
        return (
          <div>
            <div className={styles.input}>
              <label>Student No.:</label>
              <NumberInput
                style={{
                  minWidth: "230px",
                  width: "100%",
                  marginBottom: "0.8em",
                }}
                name="studentNumber"
                placeholder={studentNumText}
                hideControls
                allowNegative={false}
                allowDecimal={false}
                max={9999999999}
                clampBehavior="strict"
                onChange={(value) =>
                  handleNumberChange(
                    value,
                    studentNumber,
                    setStudentNumberError
                  )
                }
                error={studentNumberError}
              />
            </div>

            <div className={styles.input}>
              <label>First Name:</label>
              <TextInput
                style={{
                  minWidth: "230px",
                  width: "100%",
                  marginBottom: "0.8em",
                }}
                name="userName"
                placeholder={firstNameText}
                onChange={(e) => {
                  const value = e.target.value;
                  const validValue = value.replace(/[^a-zA-Z\s]/g, "");
                  e.target.value = validValue;
                  validateInputChange(validValue, firstName, setFirstNameError);
                }}
                error={firstNameError}
              />
            </div>

            <div className={styles.input}>
              <label>Middle Initial:</label>
              <TextInput
                style={{
                  minWidth: "230px",
                  width: "100%",
                  marginBottom: "0.8em",
                }}
                name="userName"
                placeholder="R. (Optional)"
                onChange={(e) => {
                  const value = e.target.value;
                  const validValue = value.replace(/[^a-zA-Z\s.]/g, "");
                  e.target.value = validValue;
                  middleName.current = validValue;
                }}
              />
            </div>

            <div className={styles.input}>
              <label>Last Name:</label>
              <TextInput
                style={{
                  minWidth: "230px",
                  width: "100%",
                  marginBottom: "0.8em",
                }}
                name="userName"
                placeholder={lastNameText}
                onChange={(e) => {
                  const value = e.target.value;
                  const validValue = value.replace(/[^a-zA-Z\s]/g, "");
                  e.target.value = validValue;
                  validateInputChange(validValue, lastName, setLastNameError);
                }}
                error={lastNameError}
              />
            </div>

            <div className={styles.input}>
              <label>Email:</label>
              <TextInput
                style={{
                  minWidth: "230px",
                  width: "100%",
                  marginBottom: "0.8em",
                }}
                name="userEmail"
                placeholder={emailText}
                onChange={(e) => handleEmailChange(e.target.value)}
                error={emailError}
              />
            </div>

            <div className={styles.input}>
              <label>Department:</label>
              <Select
                style={{
                  minWidth: "230px",
                  width: "100%",
                  marginBottom: "0.8em",
                }}
                name="userDepartment"
                placeholder={departmentText}
                data={[
                  "Information Technology",
                  "Information Systems",
                  "Computer Science",
                ]}
                onChange={(value) =>
                  validateInputChange(value, userDepartment, setDepartmentError)
                }
                error={departmentError}
              />
            </div>

            <div className={styles.input}>
              <label>Year Level:</label>
              <Select
                style={{
                  minWidth: "230px",
                  width: "100%",
                  marginBottom: "0.8em",
                }}
                name="yearLevel"
                placeholder={yearLevelText}
                data={["1st Year", "2nd Year", "3rd Year", "4th Year"]}
                onChange={(value) =>
                  validateInputChange(value, yearLevel, setYearLevelError)
                }
                error={yearLevelError}
              />
            </div>

            <div className={styles.input}>
              <label>Section:</label>
              <TextInput
                style={{ minWidth: "230px", width: "100%" }}
                name="section"
                placeholder={sectionText}
                onChange={(e) => handleSectionChange(e.target.value)}
                error={sectionError}
              />
            </div>
          </div>
        );
      case "Faculty":
        return (
          <div>
            <div className={styles.input}>
              <label>Employee No.:</label>
              <NumberInput
                style={{
                  minWidth: "230px",
                  width: "100%",
                  marginBottom: "0.8em",
                }}
                name="employeeNumber"
                placeholder={employeeNumText}
                hideControls
                allowNegative={false}
                allowDecimal={false}
                max={9999999999}
                clampBehavior="strict"
                onChange={(value) =>
                  handleNumberChange(
                    value,
                    employeeNumber,
                    setEmployeeNumberError
                  )
                }
                error={employeeNumberError}
              />
            </div>

            <div className={styles.input}>
              <label>First Name:</label>
              <TextInput
                style={{
                  minWidth: "230px",
                  width: "100%",
                  marginBottom: "0.8em",
                }}
                name="userName"
                placeholder={firstNameText}
                onChange={(e) => {
                  const value = e.target.value;
                  const validValue = value.replace(/[^a-zA-Z\s]/g, "");
                  e.target.value = validValue;
                  validateInputChange(validValue, firstName, setFirstNameError);
                }}
                error={firstNameError}
              />
            </div>

            <div className={styles.input}>
              <label>Middle Initial:</label>
              <TextInput
                style={{
                  minWidth: "230px",
                  width: "100%",
                  marginBottom: "0.8em",
                }}
                name="userName"
                placeholder="R. (Optional)"
                onChange={(e) => {
                  const value = e.target.value;
                  const validValue = value.replace(/[^a-zA-Z\s.]/g, "");
                  e.target.value = validValue;
                  middleName.current = validValue;
                }}
              />
            </div>

            <div className={styles.input}>
              <label>Last Name:</label>
              <TextInput
                style={{
                  minWidth: "230px",
                  width: "100%",
                  marginBottom: "0.8em",
                }}
                name="userName"
                placeholder={lastNameText}
                onChange={(e) => {
                  const value = e.target.value;
                  const validValue = value.replace(/[^a-zA-Z\s]/g, "");
                  e.target.value = validValue;
                  validateInputChange(validValue, lastName, setLastNameError);
                }}
                error={lastNameError}
              />
            </div>

            <div className={styles.input}>
              <label>Email:</label>
              <TextInput
                style={{
                  minWidth: "230px",
                  width: "100%",
                  marginBottom: "0.8em",
                }}
                name="userEmail"
                placeholder={emailText}
                onChange={(e) => handleEmailChange(e.target.value)}
                error={emailError}
              />
            </div>

            <div className={styles.input}>
              <label>Department:</label>
              <Select
                style={{
                  minWidth: "230px",
                  width: "100%",
                  marginBottom: "0.8em",
                }}
                name="userDepartment"
                placeholder={departmentText}
                data={[
                  "Information Technology",
                  "Information Systems",
                  "Computer Science",
                ]}
                onChange={(value) =>
                  validateInputChange(value, userDepartment, setDepartmentError)
                }
                error={departmentError}
              />
            </div>
          </div>
        );
      case "Staff":
        return (
          <div>
            <div className={styles.input}>
              <label>Employee No.:</label>
              <NumberInput
                style={{
                  minWidth: "230px",
                  width: "100%",
                  marginBottom: "0.8em",
                }}
                name="employeeNumber"
                placeholder={employeeNumText}
                hideControls
                allowNegative={false}
                allowDecimal={false}
                max={9999999999}
                clampBehavior="strict"
                onChange={(value) =>
                  handleNumberChange(
                    value,
                    employeeNumber,
                    setEmployeeNumberError
                  )
                }
                error={employeeNumberError}
              />
            </div>

            <div className={styles.input}>
              <label>First Name:</label>
              <TextInput
                style={{
                  minWidth: "230px",
                  width: "100%",
                  marginBottom: "0.8em",
                }}
                name="userName"
                placeholder={firstNameText}
                onChange={(e) => {
                  const value = e.target.value;
                  const validValue = value.replace(/[^a-zA-Z\s]/g, "");
                  e.target.value = validValue;
                  validateInputChange(validValue, firstName, setFirstNameError);
                }}
                error={firstNameError}
              />
            </div>

            <div className={styles.input}>
              <label>Middle Initial:</label>
              <TextInput
                style={{
                  minWidth: "230px",
                  width: "100%",
                  marginBottom: "0.8em",
                }}
                name="userName"
                placeholder="R. (Optional)"
                onChange={(e) => {
                  const value = e.target.value;
                  const validValue = value.replace(/[^a-zA-Z\s.]/g, "");
                  e.target.value = validValue;
                  middleName.current = validValue;
                }}
              />
            </div>

            <div className={styles.input}>
              <label>Last Name:</label>
              <TextInput
                style={{
                  minWidth: "230px",
                  width: "100%",
                  marginBottom: "0.8em",
                }}
                name="userName"
                placeholder={lastNameText}
                onChange={(e) => {
                  const value = e.target.value;
                  const validValue = value.replace(/[^a-zA-Z\s]/g, "");
                  e.target.value = validValue;
                  validateInputChange(validValue, lastName, setLastNameError);
                }}
                error={lastNameError}
              />
            </div>

            <div className={styles.input}>
              <label>Email:</label>
              <TextInput
                style={{
                  minWidth: "230px",
                  width: "100%",
                  marginBottom: "0.8em",
                }}
                name="userEmail"
                placeholder={emailText}
                onChange={(e) => handleEmailChange(e.target.value)}
                error={emailError}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  const inputFields = renderInputFields(selectedUserType);

  const renderLabelFields = (selectedUserType) => {
    switch (selectedUserType) {
      case "Student":
        return (
          <div>
            <div className={styles.reqInfo}>
              <h4>Student No.:</h4>
              <h4>{studentNumber.current}</h4>
            </div>

            <div className={styles.reqInfo}>
              <h4>Name:</h4>
              <h4>{userName.current}</h4>
            </div>

            <div className={styles.reqInfo}>
              <h4>Email:</h4>
              <h4>{userEmail.current}</h4>
            </div>

            <div className={styles.reqInfo}>
              <h4>Department:</h4>
              <h4>{userDepartment.current}</h4>
            </div>

            <div className={styles.reqInfo}>
              <h4>Year Level:</h4>
              <h4>{yearLevel.current}</h4>
            </div>

            <div className={styles.reqInfo}>
              <h4>Section:</h4>
              <h4>{section.current}</h4>
            </div>
          </div>
        );
      case "Faculty":
        return (
          <div>
            <div className={styles.reqInfo}>
              <h4>Employee No.:</h4>
              <h4>{employeeNumber.current}</h4>
            </div>

            <div className={styles.reqInfo}>
              <h4>Name:</h4>
              <h4>{userName.current}</h4>
            </div>

            <div className={styles.reqInfo}>
              <h4>Email:</h4>
              <h4>{userEmail.current}</h4>
            </div>

            <div className={styles.reqInfo}>
              <h4>Department:</h4>
              <h4>{userDepartment.current}</h4>
            </div>
          </div>
        );
      case "Staff":
        return (
          <div>
            <div className={styles.reqInfo}>
              <h4>Employee No.:</h4>
              <h4>{employeeNumber.current}</h4>
            </div>

            <div className={styles.reqInfo}>
              <h4>Name:</h4>
              <h4>{userName.current}</h4>
            </div>

            <div className={styles.reqInfo}>
              <h4>Email:</h4>
              <h4>{userEmail.current}</h4>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  const labelFields = renderLabelFields(selectedUserType);

  const openConfirmation = () => {
    setShowConfirmation(true);
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <div>
      {showHeader && (
        <div>
          <Header currentRoute={"/borrowform"} />
        </div>
      )}
      <div className={styles.mainBody}>
        <div className={styles.formContainer}>
          <div className={styles.formContents}>
            <div className={styles.fieldContainer}>
              <h2 className={styles.formTitle}>Request Details</h2>
              <div className={styles.formFields} id="formFields">
                <div className={styles.input}>
                  <label>Request Type:</label>
                  <TextInput
                    name="requestType"
                    value={requestType.current}
                    readOnly={true}
                    style={{ minWidth: "230px", width: "100%" }}
                  />
                </div>

                <div className={styles.input}>
                  <label>Request Date:</label>
                  <DateInput
                    name="requestDate"
                    valueFormat="DD/MM/YYYY"
                    value={currentDate}
                    readOnly={true}
                    style={{ minWidth: "230px", width: "100%" }}
                  />
                </div>

                <div className={styles.input}>
                  <label>User Type:</label>
                  <Button.Group
                    value={null}
                    style={{ minWidth: "230px", width: "100%" }}
                  >
                    <Button
                      name="studentBtn"
                      variant={
                        selectedUserType === "Student" ? "primary" : "default"
                      }
                      onClick={() => {
                        userType.current = "Student";
                        setSelectedUserType("Student");
                      }}
                      style={{ width: "33.3%" }}
                    >
                      Student
                    </Button>
                    <Button
                      name="facultyBtn"
                      variant={
                        selectedUserType === "Faculty" ? "primary" : "default"
                      }
                      onClick={() => {
                        userType.current = "Faculty";
                        setSelectedUserType("Faculty");
                      }}
                      style={{ width: "33.3%" }}
                    >
                      Faculty
                    </Button>
                    <Button
                      name="staffBtn"
                      variant={
                        selectedUserType === "Staff" ? "primary" : "default"
                      }
                      onClick={() => {
                        userType.current = "Staff";
                        setSelectedUserType("Staff");
                      }}
                      style={{ width: "33.3%" }}
                    >
                      Staff
                    </Button>
                  </Button.Group>
                </div>

                {inputFields}
              </div>
            </div>
            <div className={styles.itemContainer}>
              <div className={styles.itemInfo}>
                <div className={styles.imageContainer}></div>
                <div className={styles.itemDetails}>
                  <TextInput name="itemId" value="" type="hidden" />

                  <div className={styles.info}>
                    <h4>Title:</h4>
                    <h4 className={styles.infoTitle}>{item.title}</h4>
                  </div>

                  <div className={styles.info}>
                    <h4>Author:</h4>
                    <h4>{item.author}</h4>
                  </div>

                  <div className={styles.info}>
                    <h4>Call No.:</h4>
                    <h4>{item.call_num}</h4>
                  </div>

                  <div className={styles.info}>
                    <h4>Accession No.:</h4>
                    <h4>{item.accession_num}</h4>
                  </div>

                  <div className={styles.info}>
                    <h4>Edition:</h4>
                    <h4>{item.edition}</h4>
                  </div>

                  <div className={styles.info}>
                    <h4>Publisher:</h4>
                    <h4>{item.publisher}</h4>
                  </div>

                  <div className={styles.info}>
                    <h4>Publication Place:</h4>
                    <h4>{item.publication_place}</h4>
                  </div>

                  <div className={styles.info}>
                    <h4>Copyright Date:</h4>
                    <h4>{copyright_date}</h4>
                  </div>
                </div>
              </div>
              <div className={styles.buttonContainer}>
                <button
                  className={styles.submitBtn}
                  onClick={validateFormSubmit}
                >
                  {" "}
                  Submit Form{" "}
                </button>
                <Link
                  href={`/books/${item.id}`}
                  className={styles.backBtnContainer}
                >
                  <button className={styles.backBtn}> Go Back </button>
                </Link>

                <Modal
                  opened={showConfirmation}
                  onClose={closeConfirmation}
                  centered
                  withCloseButton={false}
                  size="30%"
                  closeOnClickOutside={false}
                >
                  <div className={styles.confirmation}>
                    <h2>Confirm Request</h2>
                    <p>Are you sure you want to make this request?</p>
                    <button
                      className={styles.confirmBtn}
                      onClick={makeReservation}
                    >
                      Confirm
                    </button>
                    <button
                      className={styles.cancelBtn}
                      onClick={closeConfirmation}
                    >
                      Cancel
                    </button>
                  </div>
                </Modal>

                <Modal
                  opened={opened}
                  onClose={close}
                  centered
                  withCloseButton={false}
                  size="50%"
                  closeOnClickOutside={false}
                >
                  <div className={styles.receiptContainer}>
                    <h2>Request Receipt</h2>
                    <div className={styles.infoContainer}>
                      <div className={styles.receiptInfo}>
                        <div className={styles.qrContainer}>
                          <QRCodeCanvas
                            id="qrCode"
                            bgColor="#ebebeb"
                            fgColor="#000000"
                            value={JSON.stringify({
                              id: reservation,
                            })}
                          />
                        </div>

                        <div className={styles.receiptLabel}>
                          <h4>Receipt No.:</h4>
                          <h4>{reservation}</h4>
                        </div>
                      </div>
                      <div className={styles.requestDetails}>
                        <div className={styles.reqInfo}>
                          <h4>Call No.:</h4>
                          <h4>{callNum}</h4>
                        </div>

                        <div className={styles.reqInfo}>
                          <h4>Request Date:</h4>
                          <h4>{requestDate}</h4>
                        </div>

                        {labelFields}
                      </div>
                    </div>
                    <div className={styles.reminder}>
                      Kindly show the receipt before and after borrowing the
                      book.
                    </div>
                    <div className={styles.receiptBtnContainer}>
                      <Button
                        variant="filled"
                        color="rgb(141, 16, 56)"
                        radius="xl"
                        h={"40px"}
                        className={styles.downloadBtn}
                        onClick={downloadQRCode}
                      >
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        color="rgb(141, 16, 56)"
                        radius="xl"
                        h={"40px"}
                        component={Link}
                        href="/books"
                      >
                        Go Back
                      </Button>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowForm;
