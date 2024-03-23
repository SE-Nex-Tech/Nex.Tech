import React, { useState } from "react";
import { Table, Avatar, rem } from "@mantine/core";
import MenuActions from "./menu";
import { IconCheck, IconX } from "@tabler/icons-react";

const TableAuth = ({ data }) => {
  /* data = [
    {
      id: 1,
      fn: "Carl Mitzchel",
      mn: "",
      ln: "Padua",
      email: "carlmitzchel.padua.cics@ust.edu.ph",
    },
    {
      id: 2,
      fn: "Alessandro Andrei",
      mn: "A",
      ln: "Araza",
      email: "alessandroandrei.araza.cics@ust.edu.ph",
    },
    {
      id: 3,
      fn: "Edjin Jerney",
      mn: "",
      ln: "Payumo",
      email: "edjinjerney.payumo.cics@ust.edu.ph",
    },
  ]; */

  const admin_list = data.map((r) => {
    let x = r;
    const [accessGrantedd, setAccessGrantedd] = useState(true);
    x["access"] = [accessGrantedd, setAccessGrantedd];
    return x;
  });

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
            <Table.Th>Access</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {admin_list.map((r) => (
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
                {r.access[0] ? (
                  <IconCheck
                    style={{
                      width: rem(18),
                      height: rem(18),
                      color: "green",
                    }}
                  />
                ) : (
                  <IconX
                    style={{
                      width: rem(18),
                      height: rem(18),
                      color: "red",
                    }}
                  />
                )}
              </Table.Td>
              <Table.Td>
                <MenuActions
                  setAccessGranted={r.access[1]}
                  accessGrated={r.access[0]}
                />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};

export default TableAuth;
