import React, { useState } from "react";
import { Table, Avatar, rem } from "@mantine/core";
import MenuActions from "./menu";
import { IconCheck, IconX } from "@tabler/icons-react";
import MenuCrud from "./menucrud";

const TableAdmin = ({ data, setrc }) => {

  const [accessGranted, setAccessGranted] = useState(true);

  return (
    <Table.ScrollContainer minWidth={500} mah="500px" type="native">
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th />
            <Table.Th>ID</Table.Th>
            <Table.Th>First Name</Table.Th>
            <Table.Th>Middle Name</Table.Th>
            <Table.Th>Last Name</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((r) => (
            <Table.Tr>
              <Table.Td>
                <Avatar color="red" radius="xl">
                  {r.initials}
                </Avatar>
              </Table.Td>
              <Table.Td>{r.id}</Table.Td>
              <Table.Td>{r.fn}</Table.Td>
              <Table.Td>{r.mn}</Table.Td>
              <Table.Td>{r.ln}</Table.Td>
              <Table.Td>{r.email}</Table.Td>

              <Table.Td>
                <MenuCrud admin={r} id={r.id} />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};

export default TableAdmin;
