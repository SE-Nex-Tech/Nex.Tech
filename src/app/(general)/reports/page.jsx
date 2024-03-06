"use client";

import React, { useState } from "react";
import Header from "@/_components/header/Header";
import { usePathname } from "next/navigation";
import styles from "./reports.module.scss";
import { Button, Center, NativeSelect, Loader } from "@mantine/core";
import Navigator from "@/_components/navigator/navigator";
import { DatePickerInput } from "@mantine/dates";
import { Table, rem } from "@mantine/core";
import PieChart from "@/_components/charts/PieChart";
import { data } from "@/data/pie";

import { useSession, getSession } from "next-auth/react";
import Unauthenticated from "@/_components/authentication/unauthenticated";

const Reports = () => {
  const current = usePathname();
  const [value, setValue] = useState([]);
  const [value2, setValue2] = useState([]);

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

  return (
    <>
      <div>
        <Header currentRoute={current} />
      </div>
      <Center maw="100%" mih="85%" className={styles.center}>
        <div className={styles.left_container}>
          <div className={styles.navigator}>
            <Navigator
              buttonText={"Analytics Overview"}
              showIcon={false}
              disableLink={true}
            />
          </div>
          <div className={styles.date_selector}>
            <h3>Date Range:</h3>
            <DatePickerInput
              placeholder="Pick dates"
              value={value}
              onChange={setValue}
              radius={"xl"} // BEGIN: Set default date to current date
            />
            <DatePickerInput
              placeholder="Pick dates"
              value={value2}
              onChange={setValue2}
              radius={"xl"} // END: Set default date to current date
            />
            <Button variant="filled" color="rgb(141, 16, 56)" radius="xl">
              Update
            </Button>
            <Button variant="filled" color="rgb(141, 16, 56)" radius="xl">
              Download
            </Button>
          </div>
          <h3>Request Summary</h3>
          <div className={styles.summary}>
            <Table
              striped
              highlightOnHover
              withTableBorder
              className={styles.table}
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Date</Table.Th>
                  <Table.Th>Code</Table.Th>
                  <Table.Th>User Type</Table.Th>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Type</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody className={styles.table_body}>
                <Table.Tr>
                  <Table.Td>11/03/2023</Table.Td>
                  <Table.Td>16315523511</Table.Td>
                  <Table.Td>student</Table.Td>
                  <Table.Td>Sample Name</Table.Td>
                  <Table.Td>Book</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>11/03/2023</Table.Td>
                  <Table.Td>16315523511</Table.Td>
                  <Table.Td>student</Table.Td>
                  <Table.Td>Sample Name</Table.Td>
                  <Table.Td>Book</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>11/03/2023</Table.Td>
                  <Table.Td>16315523511</Table.Td>
                  <Table.Td>student</Table.Td>
                  <Table.Td>Sample Name</Table.Td>
                  <Table.Td>Book</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>11/03/2023</Table.Td>
                  <Table.Td>16315523511</Table.Td>
                  <Table.Td>student</Table.Td>
                  <Table.Td>Sample Name</Table.Td>
                  <Table.Td>Book</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>11/03/2023</Table.Td>
                  <Table.Td>16315523511</Table.Td>
                  <Table.Td>student</Table.Td>
                  <Table.Td>Sample Name</Table.Td>
                  <Table.Td>Book</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>11/03/2023</Table.Td>
                  <Table.Td>16315523511</Table.Td>
                  <Table.Td>student</Table.Td>
                  <Table.Td>Sample Name</Table.Td>
                  <Table.Td>Book</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>11/03/2023</Table.Td>
                  <Table.Td>16315523511</Table.Td>
                  <Table.Td>student</Table.Td>
                  <Table.Td>Sample Name</Table.Td>
                  <Table.Td>Book</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>11/03/2023</Table.Td>
                  <Table.Td>16315523511</Table.Td>
                  <Table.Td>student</Table.Td>
                  <Table.Td>Sample Name</Table.Td>
                  <Table.Td>Book</Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </div>
        </div>

        <div className={styles.right_container}>
          <div className={styles.charts}>
            <div className={styles.chart1}>
              <div className={styles.header}>
                <h3>Books</h3>
                <NativeSelect
                  radius="xl"
                  data={["User Type", "Year Level", "Department"]}
                />
              </div>
              <PieChart />
            </div>
            <div className={styles.chart2}>
              <div className={styles.header}>
                <h3>Games</h3>
                <NativeSelect
                  radius="xl"
                  data={["User Type", "Year Level", "Department"]}
                />
              </div>
              <PieChart />
            </div>
          </div>
          <div className={styles.statistics}>
            <h3>Usage Statistics</h3>
            <div className={styles.summary}>
              <Table
                striped
                highlightOnHover
                withTableBorder
                className={styles.table}
              >
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Book Title</Table.Th>
                    <Table.Th>Total Requests</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody className={styles.table_body}>
                  <Table.Tr>
                    <Table.Td>Sample Name</Table.Td>
                    <Table.Td>2</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>Sample Name</Table.Td>
                    <Table.Td>2</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>Sample Name</Table.Td>
                    <Table.Td>2</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>Sample Name</Table.Td>
                    <Table.Td>2</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>Sample Name</Table.Td>
                    <Table.Td>2</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>Sample Name</Table.Td>
                    <Table.Td>2</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>Sample Name</Table.Td>
                    <Table.Td>2</Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>
            </div>
          </div>
        </div>
      </Center>
    </>
  );
};

export default Reports;
