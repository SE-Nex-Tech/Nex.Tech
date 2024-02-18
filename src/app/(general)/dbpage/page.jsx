"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/_components/header/Header";
import styles from "./database.module.scss";
import { Center, Tabs, rem, Select, Loader } from "@mantine/core";
import { useState, useEffect } from "react";
import { Prisma, PrismaClient } from "@prisma/client";
import { Input, Button } from "@mantine/core";
import { IconAt, IconSearch } from "@tabler/icons-react";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import Sort from "@/_components/sort/sort";

const Database = () => {
  const current = usePathname();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const columnNames = Object.values(Prisma.BooksScalarFieldEnum);

  const headerMapping = {
    id: "ID",
    book_barcode: "Barcode",
    book_call_num: "Call Number",
    book_title: "Title",
    book_accession_num: "Accession Number",
    book_author: "Author",
    book_edition: "Edition",
    book_publication_place: "Publication Place",
    book_publisher: "Publisher",
  };

  const visibleColumns = [
    "id",
    "book_author",
    "book_title",
    "book_publisher",
    "book_publication_place",
    "book_edition",
    "book_accession_num",
    "book_call_num",
    "book_barcode",
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
        pageSize: 8,
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/books");
      const data = await response.json();
      setData(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Loader
        color="yellow"
        size="xl"
        cl
        classNames={{ root: styles.loading }}
      />
    );
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
        <div className={styles.menu}>
          <Input
            placeholder="Search"
            leftSection={<IconSearch size={16} />}
            radius="xl"
          />
          <Sort />
          <Button variant="filled" color="rgb(141, 16, 56)" radius="xl">
            Edit
          </Button>
        </div>
        <div className={styles.table_container}>
          <Tabs
            color="#e8b031"
            radius="md"
            defaultValue="books"
            variant="outline"
            classNames={{
              list: styles.list2,
              tabLabel: styles.tabLabel2,
              tab: styles.tab2,
              root: styles.root2,
            }}
          >
            <Tabs.List justify="flex-end">
              <Tabs.Tab value="books">Books</Tabs.Tab>
              <Tabs.Tab value="games">Board Games</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="books">
              <table className={styles.database_table}>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className={styles.database_header}>
                    {headerGroup.headers
                      .filter((header) =>
                        [
                          "id",
                          "book_author",
                          "book_title",
                          "book_publisher",
                          "book_publication_place",
                          "book_edition",
                          "book_accession_num",
                          "book_call_num",
                          "book_barcode",
                        ].includes(header.id)
                      )
                      .map((header) => (
                        <th key={header.id}>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </th>
                      ))}
                  </tr>
                ))}

                <tbody className={styles.database_body}>
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className={styles.database_body_row}>
                      {row
                        .getVisibleCells()
                        .filter((cell) =>
                          visibleColumns.includes(
                            cell.column.columnDef.accessorKey
                          )
                        )
                        .map((cell) => (
                          <td>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
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
            </Tabs.Panel>

            <Tabs.Panel value="games">Messages tab content</Tabs.Panel>
          </Tabs>
        </div>
      </Center>
    </>
  );
};

export default Database;
