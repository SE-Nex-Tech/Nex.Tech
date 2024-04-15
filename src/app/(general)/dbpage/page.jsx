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
import TableBody from "@/_components/tables/tableBooks";
import sortby from "./sortby";

import { useSession, getSession } from "next-auth/react";
import Unauthenticated from "@/_components/authentication/unauthenticated";
import TableBodyGames from "@/_components/tables/tableGames";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Database = () => {
  const current = usePathname();

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const [refreshKey, setRefreshKey] = useState(0);

  const [activeTab, setActiveTab] = useState("books");
  // const [selectedType, setSelectedType] = useState("books");

  const selectedType = useRef("books");


  const handleTabChange = (value) => {

    setActiveTab(value);
    selectedType.current = value;
    setSelectedRows([]);
  };


  const setNotification = (notification) => {
    console.log(notification);
    if (notification != "") {
      toast.success(notification, { position: "bottom-right", autoClose: 2000 });
    }

    setTimeout(() => {
      if (refreshKey == 1) {
        setRefreshKey(0);
      } else {
        setRefreshKey(1);
      }
    }, 2500);
  }


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/books");
      const response2 = await fetch("/api/games");
      const data = await response.json();
      const data2 = await response2.json();
      setData(data);
      setData2(data2);
      setLoading(false);
    };

    fetchData();

    // showNotification();


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

  const sorter = async (by, data) => {
    let new_data = structuredClone(sortby(by, data));
    setData(new_data);
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
            onChange={(e) => sorter(e.target.value, data)}
          >
            <option>Sort by:</option>

            <hr />

            <optgroup label="ID">
              <option value="id_ascending">Ascending</option>
              <option value="id_descending">Descending</option>
            </optgroup>

            <hr />
            <optgroup label="Title">
              <option value="title_ascending">Ascending</option>
              <option value="title_descending">Descending</option>
            </optgroup>

            <hr />

            <optgroup label="Author">
              <option value="author_ascending">Ascending</option>
              <option value="author_descending">Descending</option>
            </optgroup>
          </NativeSelect>
          <AddButton
            setRefreshKey={setRefreshKey}
            refreshKey={refreshKey}
            setNotification={setNotification}
            selectedType={selectedType}
          />

          <EditButton
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            setRefreshKey={setRefreshKey}
            refreshKey={refreshKey}
            setNotification={setNotification}
            selectedType={selectedType}
          />

          <DeleteButton
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            setRefreshKey={setRefreshKey}
            refreshKey={refreshKey}
            setNotification={setNotification}
            selectedType={selectedType}
          />
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
          </Tabs>
        </div>
      </Center>
      <ToastContainer />
    </>
  );
};

export default Database;
