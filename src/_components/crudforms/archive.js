import { Button, Group, Stack, Select, Input, Table } from "@mantine/core";
import React, { useState } from "react";
import TableBody from "../tables/tableBooks";

const ArchiveForm = ({ selectedRows, closeModal }) => {
  const archiveRecords = async () => {
    console.log(selectedRows.length);
    console.log(selectedRows);

    const ids = [];
    for (let i = 0; i < selectedRows.length; i++) {
      ids.push(selectedRows[i].actual_id);
    }

    console.log("IDs identified");
    console.log(ids);

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

    closeModal();
  };

  return (
    <>
      <h2 style={{ marginBottom: "0.9em" }}>
        Are you sure to archive selected field/s?
      </h2>
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

      <Stack justify="center" mt="xl">
        <Button
          variant="filled"
          color="rgb(141, 16, 56)"
          radius="xl"
          onClick={archiveRecords}
        >
          Archive
        </Button>
        <Button
          variant="outline"
          color="rgb(141, 16, 56)"
          radius="xl"
          onClick={closeModal}
        >
          Cancel
        </Button>
      </Stack>
    </>
  );
};

export default ArchiveForm;
