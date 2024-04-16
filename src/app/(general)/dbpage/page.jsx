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
import TableBody from "@/_components/tables/tableBooks";
import sortby from "./sortby";

import { useSession, getSession } from "next-auth/react";
import Unauthenticated from "@/_components/authentication/unauthenticated";
import TableBodyGames from "@/_components/tables/tableGames";

const Database = () => {
  const current = usePathname();

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const [refreshKey, setRefreshKey] = useState(0);

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
          <AddButton
            selectedRows={selectedRows}
            setRefreshKey={setRefreshKey}
          />

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
    </>
  );
};

export default Database;
