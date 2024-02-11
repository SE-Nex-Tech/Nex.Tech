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

const QRScanner = () => {
  const [data, setData] = useState("No result");

  const openModalBorrow = (result) => {
    const parsedData = JSON.parse(result?.text);
    modals.openConfirmModal({
      title: "Borrow Book Information",
      size: "sm",
      radius: "md",
      withCloseButton: false,
      centered: true,
      children: <Text size="sm">{parsedData.book}</Text>,
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
    });
  };

  function handleScanSuccess(result) {
    try {
      const parsedData = JSON.parse(result?.text);

      // Ensure "type" exists and has a value
      if (!parsedData?.hasOwnProperty("type")) {
        throw new Error('Invalid QR code data: Missing "type" field.');
      }

      switch (parsedData.type) {
        case "Borrow":
          openModalBorrow(result);
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
        <Button onClick={() => openModalBorrow()}>Open Modal</Button>
      </Center>
    </>
  );
};

export default QRScanner;
