"use client";

import Header from "@/_components/header/Header";
import React, { useState, useCallback, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./qrscanner.module.scss";
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

  const fetchBook = async (transaction) => {
    setBook(transaction.book);
    openModal(transaction);
  };

  const [data, setData] = useState("No result");




  const openModal = (transaction) => {

    console.log('MY TRANSACTIONNNNN ==========================')
    console.log(transaction)
    const selectedBook = transaction.book
    const ticket = transaction.borrowTicket
    const client = transaction.client


    const authorizeRequest = async () => {
      console.log(ticket.id)
      const filter = {
        id: ticket.id
      }
      const atts = {
        status: 'Borrow Aproved',
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


    modals.openConfirmModal({
      title: <h1>Request Receipt</h1>,
      size: "sm",
      radius: "md",
      withCloseButton: false,
      centered: true,
      opened: opened,
      onCancel: () => console.log('Cancel'),
      onConfirm: () => authorizeRequest(),
      children: (
        <>
          <p>
            <strong>Receipt No.:</strong> {ticket.id}
          </p>
          <p>
            <strong>Call No.:</strong> {selectedBook.call_num}
          </p>
          <p>
            <strong>Accession No.:</strong> {selectedBook.accession_num}
          </p>
          <p>
            <strong>Request Date:</strong> {ticket.borrow_date}
          </p>
          <p>
            <strong>Student No.:</strong> {client.student_num}
          </p>
          <p>
            <strong>Name:</strong> {client.name}
          </p>
          <p>
            <strong>Department:</strong> {client.department}
          </p>
          <p>
            <strong>Year Level:</strong> {client.year_level}
          </p>
          <p>
            <strong>Section:</strong> {client.section}
          </p>
        </>
      ),
      labels: { confirm: "Authorize", cancel: "Cancel" },
      confirmProps: {
        radius: "xl", bg: "rgb(141, 16, 56)",
      },

      cancelProps: {
        radius: "xl", bg: "#989898", color: "white",
      },
    });
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

  const current = usePathname();
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
          For borrowing, reserving, or returning, point the camera at the
          receipt.
        </p>
      </Center>
    </>
  );
};

export default QRScanner;
