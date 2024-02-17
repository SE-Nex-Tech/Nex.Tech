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

const BorrowForm = () => {
  const current = usePathname();
  const currentDate = new Date();
  const [value, setValue] = useState('react');
  const [opened, { open, close }] = useDisclosure(false);

  const requestType = useRef("Book");
  const requestDate = useRef("");
  const callNum = useRef("QA76.73.J38 .H788j 2022");
  const userType = useRef("");
  const studentNumber = useRef("");
  const userName = useRef("");
  const userEmail = useRef("");
  const userDepartment = useRef("");
  const yearLevel = useRef("");
  const section = useRef("");



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
                    // onChange={(e) => (requestDate.current = e.target.value)}
                  />
                </div>

                <div className={styles.input}>
                  <label>User Type:</label>
                  <Button.Group value={null}>
                    <Button name="studentBtn" variant="primary">Student</Button>
                    <Button name="facultyBtn" variant="default">Faculty</Button>
                    <Button name="staffBtn" variant="default">Staff</Button>
                  </Button.Group>
                </div>

                <div className={styles.input}>
                  <label>Student No.:</label>
                  <NumberInput name="studentNumber" placeholder="Enter Student Number" hideControls
                    value={value} onChange={setValue}
                  // onChange={(e) => (studentNumber.current = e.target.value)}
                  />
                </div>

                <div className={styles.input}>
                  <label>Name:</label>
                  <TextInput name="userName" placeholder="Enter Name"
                    // onChange={(e) => (userName.current = e.target.value)}
                  />

                </div>

                <div className={styles.input}>
                  <label>Email:</label>
                  <TextInput name="userEmail" placeholder="Enter Email Address"
                    // onChange={(e) => (userEmail.current = e.target.value)}
                  />
                </div>

                <div className={styles.input}>
                  <label>Department:</label>
                  <Select
                    name="userDepartment"
                    placeholder="Select Department"
                    data={['Information Technology', 'Information Systems', 'Computer Science']}
                    // onChange={(e) => (userDepartment.current = value)}
                  />
                </div>

                <div className={styles.input}>
                  <label>Year Level:</label>
                  <Select
                    name="yearLevel"
                    placeholder="Select Year Level"
                    data={['1st Year', '2nd Year', '3rd Year', '4th Year']}
                    // onChange={(e) => (yearLevel.current = e.target.value)}
                  />
                </div>

                <div className={styles.input}>
                  <label>Section:</label>
                  <TextInput name="section" placeholder="Enter Section"
                    // onChange={(e) => (section.current = e.target.value)}
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
                    <h4 className={styles.infoTitle}>Introduction to Computing</h4>
                  </div>

                  <div className={styles.info}>
                    <h4>Author:</h4>
                    <h4>Santos, Jose A.</h4>
                  </div>

                  <div className={styles.info}>
                    <h4>Call No.:</h4>
                    <h4>QA76.73.J38 .H788j 2022</h4>
                  </div>

                  <div className={styles.info}>
                    <h4>Accession No.:</h4>
                    <h4>2015831231</h4>
                  </div>

                  <div className={styles.info}>
                    <h4>Edition:</h4>
                    <h4>11th Edition</h4>
                  </div>

                  <div className={styles.info}>
                    <h4>Publisher:</h4>
                    <h4>AI Publishing Inc.</h4>
                  </div>

                  <div className={styles.info}>
                    <h4>Publication Place:</h4>
                    <h4>New York City</h4>
                  </div>

                  <div className={styles.info}>
                    <h4>Copyright Date:</h4>
                    <h4>06/13/2016</h4>
                  </div>

                </div>
              </div>
              <div className={styles.buttonContainer}>

                <button className={styles.submitBtn} onClick={open}> Submit Form </button>
                <button className={styles.backBtn}> Go Back </button>


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
                                requestCode: "1324154123421",
                                requestDate: requestDate.current,
                                requestType: requestType.current,
                                callNum: callNum.current,
                                userType: userType.current,
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
                          <h4>20231204734</h4>
                        </div>

                      </div>
                      <div className={styles.requestDetails}>

                        <div className={styles.reqInfo}>
                          <h4>Call No.:</h4>
                          <h4>{callNum.current}</h4>
                        </div>

                        <div className={styles.reqInfo}>
                          <h4>Request Date:</h4>
                          <h4>{requestDate.current}</h4>
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

