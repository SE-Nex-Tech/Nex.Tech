
import { Button, Group, Stack, Select, Input, Table } from "@mantine/core";
import React, { useState, useEffect, useRef } from "react";
import TableBody from "../tables/tableBooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UnarchiveForm = ({
  selectedRows,
  setSelectedRows,
  closeModal,
  setRefreshKey,
  refreshKey,
  setNotification,
  selectedType,
}) => {
  const type = useRef(selectedType.current);

  const archiveRecords = async () => {
    console.log(selectedRows.length);
    console.log(selectedRows);

    const ids = [];
    for (let i = 0; i < selectedRows.length; i++) {
      ids.push(selectedRows[i].actual_id);
    }

    console.log("IDs identified");
    console.log(ids);

    if (selectedType.current == "books") {
      const response = await fetch("/api/db", {
        method: "POST",
        body: JSON.stringify({
          entity: "books",
          delete: 1,
          where: {
            id: {
              in: ids,
            },
          },
        }),
      });
    } else {
      const response = await fetch("/api/db", {
        method: "POST",
        body: JSON.stringify({
          entity: "boardgames",
          delete: 1,
          where: {
            id: {
              in: ids,
            },
          },
        }),
      });
    }

    setNotification("Item/s Archived successfully!");
    closeModal();
    setSelectedRows([]);
  };

  return (
    <>
      <h2 style={{ marginBottom: "0.9em" }}>
        Are you sure to archive selected field/s?
      </h2>

      {type.current === "books" && (
        <>
          {selectedRows.map((row) => (
            <p key={row.id}>
              <span style={{ fontWeight: "bold" }}>Title: </span>
              {row.title}
              <br />
              <span style={{ fontWeight: "bold" }}>Author: </span>
              {row.author} <br />
              <hr />
              <br />
            </p>
          ))}
        </>
      )}
      {type.current === "games" && (
        <>
          {selectedRows.map((row) => (
            <p key={row.id}>
              <span style={{ fontWeight: "bold" }}>Title: </span>
              {row.title}
              <br />
              <span style={{ fontWeight: "bold" }}>Publisher: </span>
              {row.publisher} <br />
              <hr />
              <br />
            </p>
          ))}
        </>
      )}

      <Stack justify="center" mt="xl">
        <Button
          variant="filled"
          color="#e8b031"
          radius="xl"
          onClick={archiveRecords}
        >
          Archive
        </Button>
        <Button variant="outline" color="gray" radius="xl" onClick={closeModal}>
          Cancel
        </Button>
      </Stack>
    </>
  );
};

export default UnarchiveForm;
