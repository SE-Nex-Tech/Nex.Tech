"use client";

import React from "react";
import Image from "next/image";
import cover from "@/images/bookcover.jpg";
import Header from "@/_components/header/Header";
import { usePathname } from "next/navigation";
import { Center, Tabs, rem, Loader } from "@mantine/core";
import styles from "./dashboard.module.scss";
import { IconBooks, IconDice, IconUsers } from "@tabler/icons-react";
import { Prisma, PrismaClient } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSession, getSession } from "next-auth/react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import Unauthenticated from "@/_components/authentication/unauthenticated";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columnNames = Object.values(Prisma.BooksScalarFieldEnum);

  const headerMapping = {
    id: "ID",
    barcode: "Barcode",
    call_num: "Call Number",
    title: "Title",
    accession_num: "Accession Number",
    author: "Author",
    edition: "Edition",
    publication_place: "Publication Place",
    publisher: "Publisher",
  };

  const visibleColumns = ["id", "author", "title", "publisher"];

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
        pageSize: 5,
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
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Loader
        color="yellow"
        size="xl"
        cl
        classNames={{ root: styles.loading }}
      />
    );
  }

  if (status === "unauthenticated") {
    return <Unauthenticated />;
  }
  const current = usePathname();
  const iconStyle = { width: rem(20), height: rem(20) };
  const prisma = new PrismaClient();

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
      <Center className={styles.center} maw="100%" m={25} h="81.5%">
        <div className={styles.first_row}>
          <div className={styles.borrow_status}>
            <div className={styles.header_borrow}>
              <div className={styles.header_actions}>
                <Tabs
                  color="#e8b031"
                  radius="md"
                  defaultValue="books"
                  variant="outline"
                  classNames={{
                    list: styles.list,
                    tabLabel: styles.tabLabel,
                    tab: styles.tab,
                    root: styles.root,
                  }}
                >
                  <Tabs.List justify="flex-end">
                    <Tabs.Tab
                      value="books"
                      leftSection={<IconBooks style={iconStyle} />}
                    >
                      Books
                    </Tabs.Tab>
                    <Tabs.Tab
                      value="games"
                      leftSection={<IconDice style={iconStyle} />}
                    >
                      Board Games
                    </Tabs.Tab>
                    <Tabs.Tab
                      value="queue"
                      leftSection={<IconUsers style={iconStyle} />}
                    >
                      Queue
                    </Tabs.Tab>
                  </Tabs.List>

                  <Tabs.Panel value="books">
                    <table className={styles.main_table}>
                      <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Genre</th>
                        <th>Status</th>
                      </tr>
                      <tr>
                        <td>
                          <div className={styles.cover_holder}>
                            <Image src={cover} className={styles.cover} />
                          </div>
                        </td>
                        <td>Introduction to Object Oriented Programming</td>
                        <td>Santos, Jose A.</td>
                        <td>Programming</td>
                        <td>
                          <select>
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className={styles.cover_holder}>
                            <Image src={cover} className={styles.cover} />
                          </div>{" "}
                        </td>
                        <td>Introduction to Object Oriented Programming</td>
                        <td>Santos, Jose A.</td>
                        <td>Programming</td>
                        <td>
                          <select>
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className={styles.cover_holder}>
                            <Image src={cover} className={styles.cover} />
                          </div>{" "}
                        </td>
                        <td>Introduction to Object Oriented Programming</td>
                        <td>Santos, Jose A.</td>
                        <td>Programming</td>
                        <td>
                          <select>
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                          </select>
                        </td>
                      </tr>
                    </table>
                  </Tabs.Panel>

                  <Tabs.Panel value="games">Messages tab content</Tabs.Panel>

                  <Tabs.Panel value="queue">Settings tab content</Tabs.Panel>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.second_row}>
          <div className={styles.database}>
            <div className={styles.header_database}>
              <h1>Database</h1>
              <button className={styles.button}>View</button>
            </div>
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
                  <button onClick={() => table.setPageIndex(0)}>First</button>
                  <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    Next
                  </button>
                  <button
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  >
                    Last
                  </button>
                </div>
              </Tabs.Panel>

              <Tabs.Panel value="games">Messages tab content</Tabs.Panel>
            </Tabs>
          </div>
          <div className={styles.reports}>
            <div className={styles.header_reports}>Reports</div>
          </div>
        </div>
      </Center>
    </>
  );
};

export default Dashboard;
