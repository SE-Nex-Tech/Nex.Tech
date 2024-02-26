"use client";

import React, { useState } from "react";
import Header from "@/_components/header/Header";
import { usePathname } from "next/navigation";
import styles from "./reports.module.scss";
import { Button, Center } from "@mantine/core";
import Navigator from "@/_components/navigator/navigator";
import { DatePickerInput } from "@mantine/dates";
import { Table } from "@mantine/core";

const Reports = () => {
  const current = usePathname();
  const [value, setValue] = useState([]);
  const [value2, setValue2] = useState([]);

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
              label="Start"
              placeholder="Pick dates"
              value={value}
              onChange={setValue}
              radius={"xl"} // BEGIN: Set default date to current date
            />
            <DatePickerInput
              label="End"
              placeholder="Pick dates"
              value={value2}
              onChange={setValue2}
              radius={"xl"} // END: Set default date to current date
            />
            <Button variant="filled" color="rgb(141, 16, 56)" radius="xl">
              Update
            </Button>
          </div>
          <div className={styles.summary}>
            <h3>Request Summary</h3>
            <Table striped highlightOnHover withTableBorder>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Date</Table.Th>
                  <Table.Th>Code</Table.Th>
                  <Table.Th>User Type</Table.Th>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Type</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
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
          <div className={styles.charts}></div>
          <div className={styles.statistics}></div>
        </div>
        <Button variant="filled" color="rgb(141, 16, 56)" radius="xl">
          Generate Report
        </Button>
      </Center>
    </>
  );
};

export default Reports;
