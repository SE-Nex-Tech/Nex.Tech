"use client";

import Header from "@/_components/header/Header";
import React, { useState, useCallback, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./qrscanner.module.scss";
import StudentFields from "./studentFields";
import FacultyFields from "./facultyFields";
import StaffFields from "./staffFields";
import { QrReader } from "react-qr-reader";
import { Center, Text } from "@mantine/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { closeModal, modals, openConfirmModal } from "@mantine/modals";
import { IconInfoCircle } from "@tabler/icons-react";

const QRScanner = () => {
  const [book, setBook] = useState([]);
  const [data, setData] = useState("No result");
  const current = usePathname();
  const timeZoneOffset = 480;

  var newRequestStatus;
  var newBookStatus;
  var confirmLabel;
  var borrowDate;
  var returnDate;

  const fetchBook = async (transaction) => {
    const currentDateTime = new Date();
    
    setBook(transaction.book);

    if (transaction.borrowTicket.status == 'Pending Borrow') {
      newRequestStatus = "Borrow Approved";
      newBookStatus = "Unavailable";
      confirmLabel = "Authorize Borrow";
      borrowDate = new Date(currentDateTime.getTime() + (timeZoneOffset * 60000)).toISOString();
      returnDate = null;
      openModal(transaction)
    } else if (transaction.borrowTicket.status == 'Borrow Approved') {
      newRequestStatus = "Returned";
      newBookStatus = "Available";
      confirmLabel = "Confirm Return";
      borrowDate = transaction.borrowTicket.borrow_date
      returnDate = new Date(currentDateTime.getTime() + (timeZoneOffset * 60000)).toISOString();
      openModal(transaction)
    }

  };

  const openModal = (transaction) => {

    console.log('MY TRANSACTIONNNNN ==========================')
    console.log(transaction)

    const selectedBook = transaction.book
    const ticket = transaction.borrowTicket
    const client = transaction.client

    var requestFields;
    switch (ticket.user_type) {
      case 'Student':
        requestFields = StudentFields(transaction);
        break;
      case 'Faculty':
        requestFields = FacultyFields(transaction);
        break;
      case 'Staff':
        requestFields = StaffFields(transaction);
        break;
      default:
    }


    modals.openConfirmModal({
      title: <h1>Request Receipt</h1>,
      size: "sm",
      radius: "md",
      withCloseButton: false,
      centered: true,
      onCancel: () => console.log('Cancel'),
      onConfirm: () => authorizeRequest(),
      children: (requestFields),
      labels: { confirm: confirmLabel, cancel: "Cancel" },
      confirmProps: {
        radius: "xl", bg: "rgb(141, 16, 56)",
      },

      cancelProps: {
        radius: "xl", bg: "#989898", color: "white",
      },
    });


    const updateRequestStatus = async () => {
      console.log(ticket.id)
      const filter = {
        id: ticket.id
      }
      const atts = {
        status: newRequestStatus,
        borrow_date: borrowDate,
        return_date: returnDate,
      }

      const response = await fetch('/api/db', {
        method: 'POST',
        body: JSON.stringify({
          entity: 'requests',
          update: 1,
          where: filter,
          data: atts
        })
      })

      console.log("close")
    }

    const updateBookStatus = async () => {
      console.log(selectedBook.id)
      const filter = {
        id: selectedBook.id
      }
      const atts = {
        status: newBookStatus,
      }

      const response = await fetch('/api/db', {
        method: 'POST',
        body: JSON.stringify({
          entity: 'books',
          update: 1,
          where: filter,
          data: atts
        })
      })

      console.log("close")
    }

    const authorizeRequest = async () => {
      updateRequestStatus();
      updateBookStatus();
    }
  };

  const handleScanSuccess = async (result) => {
    const parsedData = JSON.parse(result.text)

    const response = await fetch('/api/db', {
      method: 'POST',
      body: JSON.stringify({
        scanqr: 1,
        id: parseInt(parsedData.id)
      })
    })

    const borrowed = await response.json()

    fetchBook(borrowed)
    // console.log(resresult[0].id)
  }

  return (
    <>
      <div>
        <Header currentRoute={current} />
      </div>
      <Center
        maw="100%"
        mih="85%"
        style={{ display: "flex", flexDirection: "column", gap: "1.5em" }}
      >
        <QrReader
          className={styles.qr_reader}
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
              handleScanSuccess(result);
            }

            if (!!error) {
              console.info(error);
            }
          }}
          style={{ width: "100px", height: "100px" }}
        />
        <p className={styles.label}>
          <IconInfoCircle width={26} height={26} />
          For borrowing, reserving, or returning, point the camera at the receipt.
        </p>
      </Center>
    </>
  );
};

export default QRScanner;
