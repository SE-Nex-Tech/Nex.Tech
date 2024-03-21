import React, { useState } from "react";
import { Table, Avatar, rem } from "@mantine/core";
import MenuPassword from "./menupw";

const TablePassword = () => {
  return (
    <Table.ScrollContainer minWidth={500} mah="500px" type="native">
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th />
            <Table.Th>ID</Table.Th>
            <Table.Th>Request Date</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Old Password</Table.Th>
            <Table.Th>New Password</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td>
              <Avatar color="red" radius="xl">
                CP
              </Avatar>
            </Table.Td>
            <Table.Td>1</Table.Td>
            <Table.Td>3/20/24</Table.Td>
            <Table.Td>carlmitzchel.padua.cics@ust.edu.ph</Table.Td>
            <Table.Td>SALAMATHEVABIATBIYERNESULIT</Table.Td>
            <Table.Td>NOTHEVABIFAN123</Table.Td>
            <Table.Td>
              <MenuPassword />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <Avatar color="red" radius="xl">
                AA
              </Avatar>
            </Table.Td>
            <Table.Td>2</Table.Td>
            <Table.Td>3/20/24</Table.Td>
            <Table.Td>alessandro.araza.cics@ust.edu.ph</Table.Td>
            <Table.Td>SALAMATHEVABIATBIYERNESULIT</Table.Td>
            <Table.Td>NOTHEVABIFAN123</Table.Td>
            <Table.Td>
              <MenuPassword />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <Avatar color="red" radius="xl">
                EP
              </Avatar>
            </Table.Td>
            <Table.Td>3</Table.Td>
            <Table.Td>3/20/24</Table.Td>
            <Table.Td>edjinjerney.payumo.cics@ust.edu.ph</Table.Td>
            <Table.Td>SALAMATHEVABIATBIYERNESULIT</Table.Td>
            <Table.Td>NOTHEVABIFAN123</Table.Td>
            <Table.Td>
              <MenuPassword />
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};

export default TablePassword;
