import React from "react";
import { Menu, rem, Modal } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconTrash, IconPencil } from "@tabler/icons-react";
import EditAdmin from "./editmodal";
import { useDisclosure } from "@mantine/hooks";

const MenuCrud = ({ admin, id }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const deleteAdmin = async () => {
    const response = await fetch('/api/superadmin/deleteadmin', {
      method: 'POST',
      body: JSON.stringify({
        id
      })
    })

    // TODO: also apply toast here
  }

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: <h2>Warning</h2>,
      overlayProps: { backgroundOpacity: 0.55, blur: 3 },
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
      onConfirm: () => deleteAdmin()
    });

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="lg"
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        withCloseButton={false}
        style={{ overflowY: "auto" }}
      >
        <EditAdmin closeModal={close} admin={admin} />
      </Modal>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <h2 style={{ cursor: "pointer" }}>...</h2>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Actions</Menu.Label>
          <Menu.Item
            leftSection={
              <IconPencil style={{ width: rem(14), height: rem(14) }} />
            }
            onClick={open}
          >
            Edit
          </Menu.Item>

          <Menu.Divider />

          <Menu.Item
            color="red"
            leftSection={
              <IconTrash style={{ width: rem(14), height: rem(14) }} />
            }
            onClick={openDeleteModal} // Open the modal when the Delete menu is clicked
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default MenuCrud;
