import { Button, Group, Stack, Select, Input, Table } from "@mantine/core";
import React, { useState } from "react";
import TableBody from "../tables/table";

const ArchiveForm = ({ selectedRows }) => {
  return (
    <>
      <h2 style={{ marginBottom: "0.9em" }}>
        Are you sure to archive selected field/s?
      </h2>
      {selectedRows.map((row) => (
        <p key={row.id}>
          <span style={{ fontWeight: "bold" }}>Book ID: </span>
          {row.id},<br />
          <span style={{ fontWeight: "bold" }}>Barcode: </span>
          {row.book_barcode}, <br />
          <span style={{ fontWeight: "bold" }}>Accession No: </span>
          {row.book_call_num}
          <hr />
        </p>
      ))}

      <Stack justify="center" mt="xl">
        <Button variant="filled" color="rgb(141, 16, 56)" radius="xl">
          Archive
        </Button>
        <Button variant="outline" color="rgb(141, 16, 56)" radius="xl">
          Cancel
        </Button>
      </Stack>
    </>
  );
};

export default ArchiveForm;
