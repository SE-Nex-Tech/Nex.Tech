"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/_components/header/Header";
import styles from "./database.module.scss";
import { Center, Tabs, rem, Loader } from "@mantine/core";
import { useState, useEffect, useRef } from "react";
import { Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { NativeSelect } from "@mantine/core";

import Sort from "@/_components/sort/sort";
import EditButton from "@/_components/buttons/editbutton";
import AddButton from "@/_components/buttons/addbutton";
import DeleteButton from "@/_components/buttons/deletebutton";
import UnarchiveButton from "@/_components/buttons/unarchivebutton";
import TableBody from "@/_components/tables/tableBooks";
import sortby from "./sortby";

import { useSession, getSession } from "next-auth/react";
import Unauthenticated from "@/_components/authentication/unauthenticated";
import TableBodyGames from "@/_components/tables/tableGames";
import TableArchive from "@/_components/tables/tableArchive";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Database = () => {
  const current = usePathname();

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [bookArchived, setBookArchived] = useState([]);
  const [gameArchived, setGameArchived] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState("books");
  // const [selectedType, setSelectedType] = useState("books");

  // const [bookDB, setBookDB] = useState([]);
  // const [gameDB, setGameDB] = useState([]);

  const bookDB = useRef("");
  const gameDB = useRef("");

  const selectedType = useRef("books");

  const handleTabChange = (value) => {
    setActiveTab(value);
    selectedType.current = value;
    setSelectedRows([]);
  };

  const setNotification = (notification) => {
    console.log(notification);
    if (notification != "") {
      toast.success(notification, {
        position: "bottom-right",
        autoClose: 2000,
        position: "top-center",
      });
    }

    setTimeout(() => {
      if (refreshKey == 1) {
        setRefreshKey(0);
      } else {
        setRefreshKey(1);
      }
    }, 2500);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/books");
      const response2 = await fetch("/api/games");
      const data = await response.json();
      const data2 = await response2.json();

      let r = await fetch('api/archive/books')
      let d = await r.json()

      console.log(data);
      console.log(data2);
      setData(data);
      setData2(data2);
      setBookArchived(d);

      r = await fetch('api/archive/games')
      d = await r.json()

      setGameArchived(d)

      setLoading(false);
    };

    fetchData();

    const fetchBooksDB = async () => {
      const response = await fetch("/api/db", {
        method: "POST",
        body: JSON.stringify({
          entity: "books",
          content: 1,
        }),
      });

      const resultDB = await response.json();

      bookDB.current = resultDB;
      // console.log(resultDB);
    };

    fetchBooksDB();

    const fetchGamesDB = async () => {
      const response = await fetch("/api/db", {
        method: "POST",
        body: JSON.stringify({
          entity: "boardgames",
          content: 1,
        }),
      });

      const resultDB = await response.json();

      gameDB.current = resultDB;
      // console.log(resultDB);
    };

    fetchGamesDB();

    console.log(bookDB.current);
    console.log(gameDB.current);
  }, [refreshKey]);

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

  const searchItems = async (key) => {
    if (key.length == 0) {
      const reset = await fetch("/api/books");

      const result = await reset.json();
      setData(result);
      return;
    }
    const response = await fetch("/api/db", {
      method: "POST",
      body: JSON.stringify({
        entity: "books",
        search: 1,
        contains: key,
      }),
    });

    const result = await response.json();
    setData(result);
  };

  const sorter = async (by) => {
    if (selectedType.current === "books") {
      let new_data = structuredClone(sortby(by, data));
      setData(new_data);
    } else {
      let new_data2 = structuredClone(sortby(by, data2));
      setData2(new_data2);
    }
  };

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
            w={rem(300)}
            onChange={(event) => {
              searchItems(event.currentTarget.value);
              setSelectedRows([]);
            }}
          />
          <NativeSelect
            radius="xl"
            w={rem(200)}
            onChange={(e) => sorter(e.target.value)}
          >
            <hr />

            <option value="id_ascending">ID - Ascending</option>
            <option value="id_descending">ID - Descending</option>

            <hr />
            <option value="title_ascending">Title - Ascending</option>
            <option value="title_descending">Title - Descending</option>

            <hr />

            <option value="author_ascending">Author - Ascending</option>
            <option value="author_descending">Author -Descending</option>
          </NativeSelect>
          {(activeTab != 'bookarchive' && activeTab != 'gamearchive') && (
            <>
            <AddButton
              selectedRows={selectedRows}
              setRefreshKey={setRefreshKey}
              refreshKey={refreshKey}
              setNotification={setNotification}
              selectedType={selectedType}
              bookDB={bookDB.current}
              gameDB={gameDB.current}
            />

            <EditButton
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              setRefreshKey={setRefreshKey}
              refreshKey={refreshKey}
              setNotification={setNotification}
              selectedType={selectedType}
              bookDB={bookDB.current}
              gameDB={gameDB.current}
            />

            <DeleteButton
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              setRefreshKey={setRefreshKey}
              refreshKey={refreshKey}
              setNotification={setNotification}
              selectedType={selectedType}
            />
            </>
          )}
          {(activeTab == 'bookarchive' || activeTab == 'gamearchive') && (
            <UnarchiveButton
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              setRefreshKey={setRefreshKey}
              refreshKey={refreshKey}
              setNotification={setNotification}
              selectedType={selectedType}
            />
          )}
        </div>
        <div className={styles.table_container}>
          <Tabs
            color="#e8b031"
            mih="85%"
            radius="md"
            defaultValue="books"
            variant="outline"
            value={activeTab}
            onChange={handleTabChange}
            classNames={{
              list: styles.list2,
              tabLabel: styles.tabLabel2,
              tab: styles.tab2,
              root: styles.root2,
              panel: styles.panel,
            }}
          >
            <Tabs.List justify="flex-end">
              <Tabs.Tab value="books">Books</Tabs.Tab>
              <Tabs.Tab value="games">Board Games</Tabs.Tab>
              <Tabs.Tab value="bookarchive">Archived Books</Tabs.Tab>
              <Tabs.Tab value="gamearchive">Archived Games</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="books">
              <TableBody
                data={data}
                pageSize={6}
                disablePageButton={false}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
              />
            </Tabs.Panel>
            <Tabs.Panel value="games">
              <TableBodyGames
                data={data2}
                pageSize={6}
                disablePageButton={false}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
              />
            </Tabs.Panel>
            <Tabs.Panel value="bookarchive">
              <TableArchive
                data={bookArchived}
                pageSize={6}
                disablePageButton={false}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
              />
            </Tabs.Panel>
            <Tabs.Panel value="gamearchive">
              <TableArchive
                data={gameArchived}
                pageSize={6}
                disablePageButton={false}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
              />
            </Tabs.Panel>
          </Tabs>
        </div>
      </Center>
      <ToastContainer />
    </>
  );
};

export default Database;
