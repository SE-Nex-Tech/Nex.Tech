"use client";

import Header from "@/_components/header/Header";
import styles from "./borrowform.module.scss";
import { usePathname, useRouter } from "next/navigation";
import { TextInput, Select, Button, NumberInput } from '@mantine/core';
import { React } from "react";
import { DateInput } from "@mantine/dates";

const BorrowForm = () => {
  const current = usePathname();
  const currentDate = new Date();

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
                  <DateInput name="requestDate" valueFormat="DD/MM/YYYY" value={currentDate} readOnly="true" />
                </div>

                <div className={styles.input}>
                  <label>User Type:</label>
                  <Button.Group>
                    <Button variant="default">Student</Button>
                    <Button variant="">Faculty</Button>
                    <Button variant="">Staff</Button>
                  </Button.Group>
                </div>

                <div className={styles.input}>
                  <label>Student No.:</label>
                  <NumberInput name="studentNumber" placeholder="Enter Student Number" hideControls />
                </div>

                <div className={styles.input}>
                  <label>Name:</label>
                  <TextInput name="userName" placeholder="Enter Name" />
                </div>

                <div className={styles.input}>
                  <label>Email:</label>
                  <TextInput name="userEmail" placeholder="Enter Email Address" />
                </div>

                <div className={styles.input}>
                  <label>Department:</label>
                  <Select
                    name="userDepartment"
                    placeholder="Select Department"
                    data={['Information Technology', 'Information Systems', 'Computer Science']}
                  />
                </div>

                <div className={styles.input}>
                  <label>Year Level:</label>
                  <Select
                    name="yearLevel"
                    placeholder="Select Year Level"
                    data={['1st Year', '2nd Year', '3rd Year', '4th Year']}
                  />
                </div>

                <div className={styles.input}>
                  <label>Section:</label>
                  <TextInput name="section" placeholder="Enter Section" />
                </div>

              </div>


            </div>
            <div className={styles.itemContainer}>
              <div className={styles.itemInfo}>
                <div className={styles.imageContainer}></div>
                <div className={styles.itemDetails}>
                  <p>Title: Introduction to Computing</p>
                  <p>Author: Santos, Jose A.</p>
                  <p>Call No.: QA76.73.J38 .H788j 2022</p>
                  <p>Accession No.: 2015831231</p>
                  <p>Edition: 11th Edition</p>
                  <p>Publisher: AI Publishing Inc.</p>
                  <p>Publication Place: New York City</p>
                  <p>Copyright Date: 06/13/2016</p>
                </div>
              </div>
              <div className={styles.buttonContainer}>
                <button> Submit Form </button>
                <button> Go Back </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


}

export default BorrowForm

