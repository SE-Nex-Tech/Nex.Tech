import React from "react";
import { Menu, Button, Text, rem } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconCheck, IconTrash, IconX } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

const MenuActions = ({ accessGranted, setAccessGranted, setrc, id }) => {
  const handleApproveClick = async () => {
    setAccessGranted((prevAccessGranted) => !prevAccessGranted);
    setrc((prev) => prev + 1)

    const response = await fetch('/api/superadmin/authorization', {
      method: 'POST',
      body: JSON.stringify({
        id,
        access: !accessGranted
      })
    })
  };

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: <h2>Warning</h2>,
      centered: true,
      children: (
        <p size="sm">
          Are you sure you want to delete this row? This action is irreversible
          and you will have to contact support to restore the data.
        </p>
      ),
      labels: { confirm: "Delete", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
    });

  return (
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <h2 style={{ cursor: "pointer" }}>...</h2>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Actions</Menu.Label>
          <Menu.Item
            leftSection={
              accessGranted ? (
                <IconX style={{ width: rem(14), height: rem(14) }} />
              ) : (
                <IconCheck style={{ width: rem(14), height: rem(14) }} />
              )
            }
            onClick={handleApproveClick}
          >
            {accessGranted ? "Restrict" : "Authorize"}
          </Menu.Item>

          <Menu.Divider />

          <Menu.Item
            color="red"
            leftSection={
              <IconTrash style={{ width: rem(14), height: rem(14) }} />
            }
            onClick={openDeleteModal}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default MenuActions;
