"use client";

import Header from "@/_components/header/Header";
import React, { useState, useCallback, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./qrscanner.module.scss";
import { QrReader } from "react-qr-reader";
import { Center } from "@mantine/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";

const QRScanner = () => {
  const [data, setData] = useState("No result");
  const [opened, { open, close }] = useDisclosure(false);

  function handleScanSuccess(result) {
    try {
      const parsedData = JSON.parse(result?.text);

      // Ensure "type" exists and has a value
      if (!parsedData?.hasOwnProperty("type")) {
        throw new Error('Invalid QR code data: Missing "type" field.');
      }

      switch (parsedData.type) {
        case "Borrow":
          open();
          break;
        case "Reserve":
          console.log("Reserving", parsedData.book); // Or perform reserve actions
          break;
        case "Request":
          console.log("Requesting", parsedData.book); // Or perform request actions
          break;
        default:
          console.error(
            "Invalid or unsupported operation type:",
            parsedData.type
          );
        // Handle unexpected or unsupported types appropriately
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
      <Center className={styles.center} maw="100%" m={25} h="81.5%">
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
          style={{ width: "10px", height: "10px" }}
        />
        <p>{data}</p>
        <Modal opened={opened} onClose={close} title="Authentication" centered>
          <h1>CHY</h1>
        </Modal>
      </Center>
    </>
  );
};

export default QRScanner;
