"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/_components/header/Header";
import styles from "./database.module.scss";
import { Center, Tabs, rem, Loader } from "@mantine/core";
import { useState, useEffect } from "react";
import { Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { NativeSelect } from "@mantine/core";

import Sort from "@/_components/sort/sort";
import EditButton from "@/_components/buttons/editbutton";
import AddButton from "@/_components/buttons/addbutton";
import DeleteButton from "@/_components/buttons/deletebutton";
import TableBody from "@/_components/tables/table";
import sortby from './sortby'

import { useSession, getSession } from "next-auth/react";
import Unauthenticated from "@/_components/authentication/unauthenticated";

const Database = () => {
  const current = usePathname();

  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(true);

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
    let new_data = structuredClone(sortby(by, data))
    setData(new_data)
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
            w={rem(300)}
            onChange={(event) => searchItems(event.currentTarget.value)}
          />
          <NativeSelect radius="xl" w={rem(200)} onChange={(e) => (sorter(e.target.value, data))}>
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
          <AddButton selectedRows={selectedRows} />

          <EditButton selectedRows={selectedRows} />
          <DeleteButton selectedRows={selectedRows} />
        </div>
        <div className={styles.table_container}>
          <Tabs
            color="#e8b031"
            mih="85%"
            radius="md"
            defaultValue="books"
            variant="outline"
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
            <Tabs.Panel value="games">Messages tab content</Tabs.Panel>
          </Tabs>
        </div>
      </Center>
    </>
  );
};

export default Database;
