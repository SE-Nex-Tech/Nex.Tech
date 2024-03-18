"use client";

import React from "react";

import Link from "next/link";
import Header from "@/_components/header/Header";
import { usePathname, useRouter } from "next/navigation";
import { Center, Tabs, rem, Select, Loader, Button } from "@mantine/core";
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
import Status from "@/_components/dashboard/status";
import Queuer from "@/_components/dashboard/qStatus";

const getUserCreds = (element) => {
  switch (element.user_type) {
    case 'Student':
      return {
        name: element.user_student.name,
        email: element.user_student.email,
      }
    case 'Faculty':
      return {
        name: element.user_faculty.name,
        email: element.user_faculty.email,
      }
    case 'Staff':
      return {
        name: element.user_staff.name,
        email: element.user_staff.email,
      }
    default:
      return {
        name: undefined,
        email: undefined,
      }
  }
}

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [queue, setQueue] = useState([]);

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

      let res = await fetch('/api/queue', {
        method: 'POST',
        body: JSON.stringify({})
      })
      let dat = await res.json()
      setQueue(dat.allq)
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
                    <Status
                      title={"Introduction to Object Oriented Programming"}
                      author={"Santos, Jose A."}
                      genre={"Programming"}
                      status={"Available"}
                    />
                  </Tabs.Panel>

                  <Tabs.Panel value="games">Messages tab content</Tabs.Panel>

                  <Tabs.Panel value="queue">
                    {queue.map((r) => (
                      <Queuer
                        title={r.bookRequests.book.title}
                        borrower={getUserCreds(r).name}
                        email={getUserCreds(r).email}
                        user_type={r.user_type}
                      />
                    ))}
                  </Tabs.Panel>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.second_row}>
          <div className={styles.database}>
            <div className={styles.header_database}>
              <h1>Database</h1>

              <Button
                component={Link}
                href="/dbpage"
                variant="filled"
                color="rgb(141, 16, 56)"
                radius="xl"
              >
                View
              </Button>

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
          <div className={styles.reports}>
            <div className={styles.header_reports}>Reports</div>
          </div>
        </div>
      </Center>
    </>
  );
};

export default Dashboard;
