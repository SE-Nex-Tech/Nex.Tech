import React, { useState } from "react";
import { Table, Avatar, rem } from "@mantine/core";
import MenuActions from "./menu";
import { IconCheck, IconX } from "@tabler/icons-react";
import MenuCrud from "./menucrud";

const TableAdmin = () => {
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
          <Table.Tr>
            <Table.Td>
              <Avatar color="red" radius="xl">
                CP
              </Avatar>
            </Table.Td>
            <Table.Td>1</Table.Td>
            <Table.Td>Carl Mitzchel</Table.Td>
            <Table.Td></Table.Td>
            <Table.Td>Padua</Table.Td>
            <Table.Td>carlmitzchel.padua.cics@ust.edu.ph</Table.Td>

            <Table.Td>
              <MenuCrud
                setAccessGranted={setAccessGranted}
                accessGranted={accessGranted}
              />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <Avatar color="red" radius="xl">
                AA
              </Avatar>
            </Table.Td>
            <Table.Td>2</Table.Td>
            <Table.Td>Alessandro</Table.Td>
            <Table.Td>Z</Table.Td>
            <Table.Td>Araza</Table.Td>
            <Table.Td>alessandro.araza.cics@ust.edu.ph</Table.Td>

            <Table.Td>
              <MenuCrud
                setAccessGranted={setAccessGranted}
                accessGranted={accessGranted}
              />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <Avatar color="red" radius="xl">
                EP
              </Avatar>
            </Table.Td>
            <Table.Td>3</Table.Td>
            <Table.Td>Edjin Jerney</Table.Td>
            <Table.Td>Z</Table.Td>
            <Table.Td>Payumo</Table.Td>
            <Table.Td>edjinjerney.payumo.cics@ust.edu.ph</Table.Td>

            <Table.Td>
              <MenuCrud
                setAccessGranted={setAccessGranted}
                accessGranted={accessGranted}
              />
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};

export default TableAdmin;
