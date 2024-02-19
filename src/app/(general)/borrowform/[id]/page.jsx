"use client";

import Header from "@/_components/header/Header";
import styles from "./borrowform.module.scss";
import { usePathname, useRouter } from "next/navigation";
import { TextInput, Select, Button, NumberInput, Radio, Modal, camelToKebabCase } from '@mantine/core';
import React, { useState, useCallback, useEffect, useRef } from "react";
import { DateInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import ReactDOM from 'react-dom';
import { QRCodeSVG } from 'qrcode.react';
import { useParams } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";

const BorrowForm = () => {
  const current = usePathname();
  const currentDate = new Date();
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedButton, setSelectedButton] = useState("Student");

  const { id } = useParams();
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  var copyright_date = "";

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`/api/books`);
        const data = await response.json();
        const selectedBook = data.find((book) => book.id === parseInt(id));
        setBook(selectedBook);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    fetchBook();


  }, [id]);

  if (!book) {
    return <div>Book not found</div>;
  }

  if (book.copyright_date) {
    copyright_date = format(Date.parse(book.copyright_date), "MM/dd/yyyy");
  }

  const requestCode = useRef("201314214");
  const requestType = useRef("Book");
  const requestDate = format(currentDate, "MM/dd/yyyy");
  const studentNumber = useRef("");
  const userType = useRef("");
  const userName = useRef("");
  const userEmail = useRef("");
  const userDepartment = useRef("");
  const yearLevel = useRef("");
  const section = useRef("");
  const status = useRef();

  var bookId;
  var callNum;

  console.log(studentNumber.current);

  if (book) {
    bookId = book.id;
    callNum = book.call_num;
  }

  return (

    <div>
      <Header currentRoute={current} />
      <div className={styles.mainBody}>
        <div className={styles.formContainer}>
          <div className={styles.formContents}>
            <div className={styles.fieldContainer}>
              <h2 className={styles.formTitle}>Request Details</h2>
              <div className={styles.formFields}>

                <div className={styles.input}>
                  <label>Request Type:</label>
                  <TextInput name="requestType" value="Book" readOnly="true" />
                </div>

                <div className={styles.input}>
                  <label>Request Date:</label>
                  <DateInput name="requestDate" valueFormat="DD/MM/YYYY" value={currentDate} readOnly="true"
                  />
                </div>

                <div className={styles.input}>
                  <label>User Type:</label>
                  <Button.Group value={null}>
                    <Button name="studentBtn" variant={selectedButton === "Student" ? "primary" : "default"} onClick={() => {
                      userType.current = "Student";
                      setSelectedButton("Student");
                    }} >Student</Button>
                    <Button name="facultyBtn" variant={selectedButton === "Faculty" ? "primary" : "default"} onClick={() => {
                      userType.current = "Faculty";
                      setSelectedButton("Faculty");
                    }}>Faculty</Button>
                    <Button name="staffBtn" variant={selectedButton === "Staff" ? "primary" : "default"} onClick={() => {
                      userType.current = "Staff";
                      setSelectedButton("Staff");
                    }}>Staff</Button>
                  </Button.Group>
                </div>

                <div className={styles.input}>
                  <label>Student No.:</label>
                  <NumberInput name="studentNumber" placeholder="Enter Student Number" hideControls
                    onChange={(value) => (studentNumber.current = value)}
                  />
                </div>

                <div className={styles.input}>
                  <label>Name:</label>
                  <TextInput name="userName" placeholder="Enter Name"
                    onChange={(e) => (userName.current = e.target.value)}
                  />

                </div>

                <div className={styles.input}>
                  <label>Email:</label>
                  <TextInput name="userEmail" placeholder="Enter Email Address"
                    onChange={(e) => (userEmail.current = e.target.value)}
                  />
                </div>

                <div className={styles.input}>
                  <label>Department:</label>
                  <Select
                    name="userDepartment"
                    placeholder="Select Department"
                    data={['Information Technology', 'Information Systems', 'Computer Science']}
                    onChange={(value) => (userDepartment.current = value)}
                  />
                </div>

                <div className={styles.input}>
                  <label>Year Level:</label>
                  <Select
                    name="yearLevel"
                    placeholder="Select Year Level"
                    data={['1st Year', '2nd Year', '3rd Year', '4th Year']}
                    onChange={(value) => (yearLevel.current = value)}
                  />
                </div>

                <div className={styles.input}>
                  <label>Section:</label>
                  <TextInput name="section" placeholder="Enter Section"
                    onChange={(e) => (section.current = e.target.value)}
                  />
                </div>

              </div>


            </div>
            <div className={styles.itemContainer}>
              <div className={styles.itemInfo}>
                <div className={styles.imageContainer}></div>
                <div className={styles.itemDetails}>

                  <TextInput name="itemId" value="" type="hidden" />

                  <div className={styles.info}>
                    <h4>Title:</h4>
                    <h4 className={styles.infoTitle}>{book.title}</h4>
                  </div>

                  <div className={styles.info}>
                    <h4>Author:</h4>
                    <h4>{book.author}</h4>
                  </div>

                  <div className={styles.info}>
                    <h4>Call No.:</h4>
                    <h4>{book.call_num}</h4>
                  </div>

                  <div className={styles.info}>
                    <h4>Accession No.:</h4>
                    <h4>{book.accession_num}</h4>
                  </div>

                  <div className={styles.info}>
                    <h4>Edition:</h4>
                    <h4>{book.edition}</h4>
                  </div>

                  <div className={styles.info}>
                    <h4>Publisher:</h4>
                    <h4>{book.publisher}</h4>
                  </div>

                  <div className={styles.info}>
                    <h4>Publication Place:</h4>
                    <h4>{book.publication_place}</h4>
                  </div>

                  <div className={styles.info}>
                    <h4>Copyright Date:</h4>
                    <h4>{copyright_date}</h4>
                  </div>

                </div>
              </div>
              <div className={styles.buttonContainer}>

                <button className={styles.submitBtn} onClick={open}> Submit Form </button>
                <Link href={`/books/${book.id}`} className={styles.backBtnContainer}>
                  <button className={styles.backBtn}> Go Back </button>
                </Link>

                ``

                <Modal
                  opened={opened}
                  onClose={close}
                  centered
                  withCloseButton={false}
                  size="50%"
                  closeOnClickOutside={false}>
                  <div className={styles.receiptContainer}>
                    <h2>Request Receipt</h2>
                    <div className={styles.infoContainer}>
                      <div className={styles.receiptInfo}>
                        <div className={styles.qrContainer}>
                          <QRCodeSVG
                            bgColor="#ebebeb"
                            fgColor="#E8B031"
                            value={JSON.stringify(
                              {
                                requestCode: requestCode.current,
                                requestDate: requestDate,
                                userType: userType.current,
                                requestType: requestType.current,
                                bookId: bookId,
                                studentNumber: studentNumber.current,
                                userName: userName.current,
                                userEmail: userEmail.current,
                                userDepartment: userDepartment.current,
                                yearLevel: yearLevel.current,
                                section: section.current,

                              }
                            )} />
                        </div>

                        <div className={styles.receiptLabel}>
                          <h4>Receipt No.:</h4>
                          <h4>{requestCode.current}</h4>
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
                    </div>
                    <div className={styles.reminder}>
                      Kindly show the receipt before and after borrowing the book.
                    </div>
                    <div className={styles.receiptBtnContainer}>
                      <button className={styles.downloadBtn}> Download </button>
                      <button className={styles.backBtn} onClick={close}> Go Back </button>
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


}

export default BorrowForm

