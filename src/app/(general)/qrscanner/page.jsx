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
import { modals, openConfirmModal } from "@mantine/modals";
import { IconInfoCircle } from "@tabler/icons-react";

const QRScanner = () => {
  const [book, setBook] = useState([]);

  const fetchBook = async (id) => {
    try {
      const response = await fetch("/api/db", {
        method: "POST",
        body: JSON.stringify({
          entity: "books",
          where: {
            id: parseInt(id),
          },
        }),
      });

      const selectedBook = await response.json();
      setBook(selectedBook[0]);
      openModal(selectedBook[0]);
      console.log(selectedBook[0]);
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  };

  const [data, setData] = useState("No result");

  const openModal = (selectedBook) => {
    modals.openConfirmModal({
      title: <h1>Request Receipt</h1>,
      size: "sm",
      radius: "md",
      withCloseButton: false,
      centered: true,
      children: (
        <>
          <p>
            <strong>Receipt No.:</strong> {selectedBook.call_num}
          </p>
          <p>
            <strong>Call No.:</strong> {selectedBook.call_num}
          </p>
          <p>
            <strong>Accession No.:</strong> {selectedBook.accession_num}
          </p>
          <p>
            <strong>Request Date:</strong> {selectedBook.accession_num}
          </p>
          <p>
            <strong>Student No.:</strong> {selectedBook.accession_num}
          </p>
          <p>
            <strong>Name:</strong> {selectedBook.accession_num}
          </p>
          <p>
            <strong>Department:</strong> {selectedBook.accession_num}
          </p>
          <p>
            <strong>Year Level:</strong> {selectedBook.accession_num}
          </p>
          <p>
            <strong>Section:</strong> {selectedBook.accession_num}
          </p>
        </>
      ),
      labels: { confirm: "Authorize", cancel: "Cancel" },
      confirmProps: { radius: "xl", bg: "rgb(141, 16, 56)" },
      cancelProps: { radius: "xl", bg: "#989898", color: "white" },
    });
  };

  function handleScanSuccess(result) {
    try {
      const parsedData = JSON.parse(result?.text);

      // Ensure "type" exists and has a value
      if (!parsedData?.hasOwnProperty("id")) {
        throw new Error('Invalid QR code data: Missing "type" field.');
      } else {
        fetchBook(parsedData.id);
      }
    } catch (error) {
      console.error("Error parsing QR code data:", error);
      // Display user-friendly error message
    }
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
