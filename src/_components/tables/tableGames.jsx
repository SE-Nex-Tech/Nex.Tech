import React, { useState, useEffect } from "react";
import { Button, Table, Checkbox } from "@mantine/core";
import { Prisma } from "@prisma/client";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import styles from "./table.module.scss";

const TableBodyGames = ({
  data,
  pageSize,
  disablePageButton,
  disableCheckbox,
  selectedRows,
  setSelectedRows,
}) => {
  // Update prop name to disablePageButton
  const [loading, setLoading] = useState(true);
  const columnNames = Object.values(Prisma.BoardgamesScalarFieldEnum);

  const headerMapping = {
    id: "ID",
    call_num: "Call Number",
    title: "Title",
    accession_num: "Accession Number",
    publisher: "Publisher",
    copyright_date: "Copyright Date",
  };

  const visibleColumns = [
    "id",
    "call_num",
    "title",
    "accession_num",
    "publisher",
    "copyright_date",
  ];

  const columns = columnNames.map((columnName) => ({
    header: headerMapping[columnName] || columnName,
    accessorKey: columnName,
  }));

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: pageSize,
      },
    },
  });

  const handleCheckboxChange = (row) => {
    setSelectedRows((prevRows) => {
      if (prevRows.find((selectedRows) => selectedRows.id === row.id)) {
        return prevRows.filter((selectedRows) => selectedRows.id !== row.id);
      } else {
        return [
          ...prevRows,
          {
            id: row.id,
            call_num: row.original.call_num,
            title: row.original.title,
            accession_num: row.original.accession_num,
            publisher: row.original.publisher,
            copyright_date: row.original.copyright_date,
          },
        ];
      }
    });
  };

  useEffect(() => {
    console.log(selectedRows);
  }, [selectedRows]);

  return (
    <div className={styles.container}>
      <Table
        className={styles.database_table}
        striped
        highlightOnHover
        withTableBorder
        withColumnBorders
      >
        <Table.Thead>
          <Table.Tr className={styles.database_header}>
            <Table.Th></Table.Th> {/* Empty header for checkbox column */}
            {table
              .getHeaderGroups()
              .map((headerGroup) =>
                headerGroup.headers
                  .filter((header) => visibleColumns.includes(header.id))
                  .map((header) => (
                    <Table.Th key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </Table.Th>
                  ))
              )}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody
          className={styles.database_body}
          selectedRows={selectedRows}
        >
          {table.getRowModel().rows.map((row) => (
            <Table.Tr
              key={row.id}
              className={styles.database_body_row}
              bg={
                selectedRows?.find((selectedRows) => selectedRows.id === row.id)
                  ? "var(--mantine-color-yellow-light)"
                  : undefined
              }
            >
              <Table.Td>
                {!disableCheckbox && (
                  <Checkbox
                    aria-label="Select row"
                    checked={
                      selectedRows?.find(
                        (selectedRow) => selectedRow.id === row.id
                      ) !== undefined
                    }
                    onChange={() => handleCheckboxChange(row)}
                  />
                )}
              </Table.Td>
              {row
                .getVisibleCells()
                .filter((cell) =>
                  visibleColumns.includes(cell.column.columnDef.accessorKey)
                )
                .map((cell) => (
                  <Table.Td key={cell.column.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Td>
                ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      {!disablePageButton && (
        <div className={styles.page_btn}>
          <Button
            variant="filled"
            color="rgb(141, 16, 56)"
            radius="xl"
            onClick={() => table.setPageIndex(0)}
          >
            First
          </Button>

          <Button
            variant="filled"
            color="rgb(141, 16, 56)"
            radius="xl"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="filled"
            color="rgb(141, 16, 56)"
            radius="xl"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
          <Button
            variant="filled"
            color="rgb(141, 16, 56)"
            radius="xl"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          >
            Last
          </Button>
        </div>
      )}
    </div>
  );
};

export default TableBodyGames;
