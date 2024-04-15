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
import Reports from "../reports/page";

import TableBodyGames from "@/_components/tables/tableGames";
import TableBody from "@/_components/tables/tableBooks";
import StatusGames from "@/_components/dashboard/statusGames";


const getUserCreds = (element) => {
  switch (element.user_type) {
    case "Student":
      return {
        name: element.user_student.name,
        email: element.user_student.email,
      };
    case "Faculty":
      return {
        name: element.user_faculty.name,
        email: element.user_faculty.email,
      };
    case "Staff":
      return {
        name: element.user_staff.name,
        email: element.user_staff.email,
      };
    default:
      return {
        name: undefined,
        email: undefined,
      };
  }
};

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [queue, setQueue] = useState([]);
  const [biu, setBiu] = useState([]);
  const [giu, setGiu] = useState([])

  const columnNames = Object.values(Prisma.BooksScalarFieldEnum);
  const columnNamesGames = Object.values(Prisma.BoardgamesScalarFieldEnum);

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

  const headerMappingGames = {
    id: "ID",
    call_num: "Call Number",
    title: "Title",
    accession_num: "Accession Number",
    publisher: "Publisher",
    copyright_date: "Copyright Date",
  };

  const visibleColumns = ["id", "author", "title", "publisher"];

  const visibleColumnsGames = [
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

  const columnsGames = columnNamesGames.map((columnNamesGames) => ({
    header: headerMappingGames[columnNamesGames] || columnNamesGames,
    accessorKey: columnNamesGames,
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
      const response2 = await fetch("/api/games");
      const data = await response.json();
      const data2 = await response2.json();
      setData(data);
      setData2(data2);
      setLoading(false);

      let res = await fetch('/api/queue', {
        method: 'POST',
        body: JSON.stringify({
          id: 1
        })
      })
      let d = await res.json()
      setBiu(d.biu)
      setGiu(d.giu)
      setQueue(d.allq)
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
                    {biu.map((r) => (
                      <Status
                        title={r.title}
                        author={r.author}
                        barcode={r.barcode}
                        status={r.status}
                        image={r.image}
                      />
                    ))}
                  </Tabs.Panel>

                  <Tabs.Panel value="games">
                    {giu.map((r) => (
                      <StatusGames
                        title={r.title}
                        publisher={r.publisher}
                        status={r.status}
                        image={r.image}
                      />
                    ))}
                  </Tabs.Panel>

                  <Tabs.Panel value="queue">
                    {queue.map((r) => {
                      console.log(r);
                      return (
                        <Queuer
                          title={
                            r.type == "Book"
                              ? r.bookRequests.book.title
                              : r.boardgameRequests.boardgame.title
                          }
                          borrower={getUserCreds(r).name}
                          email={getUserCreds(r).email}
                          user_type={r.user_type}
                        />
                      );
                    })}
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
                <TableBody
                  data={data}
                  pageSize={4}
                  disablePageButton={false}
                  disableCheckbox={true}
                />
              </Tabs.Panel>

              <Tabs.Panel value="games">
                <TableBodyGames
                  data={data2}
                  pageSize={4}
                  disablePageButton={false}
                  disableCheckbox={true}
                />
              </Tabs.Panel>
            </Tabs>
          </div>
          <div className={styles.reports}>
            <div className={styles.header_reports}>
              <h1>Reports</h1>
            </div>
            <Reports hideHeader />
          </div>
        </div>
      </Center>
    </>
  );
};

export default Dashboard;
