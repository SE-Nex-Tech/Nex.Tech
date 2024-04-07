"use client";

import Header from "@/_components/header/Header";
import React, { useState, useCallback, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./qrscanner.module.scss";
import StudentFields from "./studentFields";
import FacultyFields from "./facultyFields";
import StaffFields from "./staffFields";
import { QrReader } from "react-qr-reader";
import { Center, Text, Loader } from "@mantine/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { closeModal, modals, openConfirmModal } from "@mantine/modals";
import { IconInfoCircle } from "@tabler/icons-react";
import { Input } from "@mantine/core";

import { useSession, getSession } from "next-auth/react";
import Unauthenticated from "@/_components/authentication/unauthenticated";

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

  let receipt_no;
  let next_in_q;

  const fetchBook = async (transaction) => {
    const currentDateTime = new Date();

    setBook(transaction.book);

    const selectedBook = transaction.book;
    const ticket = transaction.borrowTicket;
    const client = transaction.client;

    const res = await fetch("/api/queue", {
      method: "POST",
      body: JSON.stringify({
        id: selectedBook.id,
      }),
    });
    const data = await res.json();
    const bq = data.bq;
    const biu = data.biu;
    console.log(
      "Book queue ==================================================",
    );
    console.log(bq);
    console.log(biu)

    if (
      bq.length > 0 && 
      bq[0].id !== transaction.borrowTicket.id &&
      transaction.borrowTicket.status === "Pending Borrow"
    ) {
      toast.warning("This borrow ticket is behind person/s in the queue");
    }

    if (
      transaction.borrowTicket.status == "Pending Borrow" &&
      biu.find((e) => e.id === transaction.book.id) == undefined
    ) {
      newRequestStatus = "Borrow Approved";
      newBookStatus = "Unavailable";
      confirmLabel =
        bq[0].id === transaction.borrowTicket.id
          ? "Authorize Borrow"
          : "Override Queue";
      borrowDate = new Date(
        currentDateTime.getTime() + timeZoneOffset * 60000,
      ).toISOString();
      returnDate = null;
      openModal(transaction);
    } else if (transaction.borrowTicket.status == "Borrow Approved") {
      newRequestStatus = "Returned";
      newBookStatus = "Available";
      confirmLabel = "Confirm Return";
      borrowDate = transaction.borrowTicket.borrow_date;
      returnDate = new Date(
        currentDateTime.getTime() + timeZoneOffset * 60000,
      ).toISOString();
      next_in_q = (bq != undefined && bq.length >= 1) ? bq[0] : undefined
      openModal(transaction);
    } else if (biu.find((e) => e.id === transaction.book.id) != undefined) {
      toast.warning("Book is still in use by another person");
    } else {
      toast.warning("This borrow ticket has expired");
    }
  };

  const openModal = (transaction) => {
    console.log("MY TRANSACTIONNNNN ==========================");
    console.log(transaction);

    const selectedBook = transaction.book;
    const ticket = transaction.borrowTicket;
    const client = transaction.client;

    var requestFields;
    switch (ticket.user_type) {
      case "Student":
        requestFields = StudentFields(transaction);
        break;
      case "Faculty":
        requestFields = FacultyFields(transaction);
        break;
      case "Staff":
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
      onCancel: () => console.log("Cancel"),
      onConfirm: () => authorizeRequest(),
      children: requestFields,
      labels: { confirm: confirmLabel, cancel: "Cancel" },
      confirmProps: {
        radius: "xl",
        bg: "rgb(141, 16, 56)",
      },

      cancelProps: {
        radius: "xl",
        bg: "#989898",
        color: "white",
      },
    });

    const updateRequestStatus = async () => {
      console.log(ticket.id);
      const filter = {
        id: ticket.id,
      };
      const atts = {
        status: newRequestStatus,
        borrow_date: borrowDate,
        return_date: returnDate,
      };

      const response = await fetch("/api/db", {
        method: "POST",
        body: JSON.stringify({
          entity: "requests",
          update: 1,
          where: filter,
          data: atts,
        }),
      });

      console.log("close");
    };

    const updateBookStatus = async () => {
      console.log(selectedBook.id);
      const filter = {
        id: selectedBook.id,
      };
      const atts = {
        status: newBookStatus,
      };

      const response = await fetch("/api/db", {
        method: "POST",
        body: JSON.stringify({
          entity: "books",
          update: 1,
          where: filter,
          data: atts,
        }),
      });

      console.log("close");
    };

    const authorizeRequest = async () => {
      updateRequestStatus();
      updateBookStatus();
      sendEmail(next_in_q)
    };

    const sendEmail = async (next) => {
      if (next == undefined) {
        return
      }

      let email
      let name
      switch (next.user_type) {
        case 'Student':
          email = next.user_student.email
          name = next.user_student.name
          break
        case 'Teacher':
          email = next.user_faculty.email
          name = next.user_faculty.name
          break
        case 'Staff':
          email = next.user_staff.email
          name = next.user_staff.name
          break
      }

      const book = next.bookRequests.book.title
      const text = 'Hello ' + name + ', We are glad to inform you that your reservation for ' + book + ' can now be availed. Please show your receipt/QR code to the librarian. In case you lost your QR code, your receipt number is ' + next.id

      console.log('SENDING EMAIL TO: ' + email)

      const response = await fetch('/api/mail', {
        method: 'POST',
        body: JSON.stringify({
          to: email,
          text: text
        })
      })
    }
  };

  const handleScanSuccess = async (result) => {
    const parsedData = JSON.parse(result.text);

    const response = await fetch("/api/db", {
      method: "POST",
      body: JSON.stringify({
        scanqr: 1,
        id: parseInt(parsedData.id),
      }),
    });

    const borrowed = await response.json();

    fetchBook(borrowed);
    // console.log(resresult[0].id)
  };

  const processReceipt = () => {
    console.log('SCANNING ID ' + receipt_no)
    let text = {
      text: '{ "id": ' + receipt_no + ' }'
    }
    console.log(JSON.parse(text.text))

    handleScanSuccess(text)
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
              toast.success("Scanned successfully!", { autoClose: 2000 });
              setData(result?.text);
              handleScanSuccess(result);
            }
          }}
          style={{ width: "100px", height: "100px" }}
        />
        <Input
          placeholder='Receipt Number'
          classNames={styles}
          onChange={(e) => (receipt_no = e.target.value)}
        />
        <Button classNames={{ root: styles.btn }} onClick={processReceipt}>
          Process Receipt
        </Button>
        <p className={styles.label}>
          <IconInfoCircle width={26} height={26} />
          For borrowing, reserving, or returning, point the camera at the
          receipt.
        </p>
      </Center>
      <ToastContainer />
    </>
  );
};

export default QRScanner;
