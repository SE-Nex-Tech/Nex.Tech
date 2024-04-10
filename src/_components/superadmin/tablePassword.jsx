import React, { useState } from "react";
import { Table, Avatar, rem } from "@mantine/core";
import MenuPassword from "./menupw";

const TablePassword = ({ data }) => {
  return (
    <Table.ScrollContainer minWidth={500} mah="500px" type="native">
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th />
            <Table.Th>ID</Table.Th>
            <Table.Th>Request Date</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>New Password</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((r) => {
            const raw_date = new Date(r.date_requested)
            const date = (raw_date.getMonth()+1) + '/' + raw_date.getDate() + '/' + raw_date.getFullYear()
            return (
              <Table.Tr>
                <Table.Td>
                  <Avatar color="red" radius="xl">
                  </Avatar>
                </Table.Td>
                <Table.Td>{r.id}</Table.Td>
                <Table.Td>{date}</Table.Td>
                <Table.Td>{r.email}</Table.Td>
                <Table.Td>{r.new_pass}</Table.Td>
                <Table.Td>
                  <MenuPassword id={r.id} />
                </Table.Td>
              </Table.Tr>
            )
          }
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};

export default TablePassword;
