import React from "react";
import { Menu, rem, Modal } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconX, IconCheck } from "@tabler/icons-react";

const MenuPassword = () => {
  const openDisallowModal = () =>
    modals.openConfirmModal({
      title: <h2>Reject Request</h2>,
      overlayProps: { backgroundOpacity: 0.55, blur: 3 },
      centered: true,
      children: (
        <p size="sm">
          Are you sure you want to disallow this request? This action is
          irreversible.
        </p>
      ),
      labels: { confirm: "Disallow", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
    });

  const openAllowModal = () =>
    modals.openConfirmModal({
      title: <h2>Grant Request</h2>,
      overlayProps: { backgroundOpacity: 0.55, blur: 3 },
      centered: true,
      children: (
        <p size="sm">
          Are you sure you want to grant this request? This action is
          irreversible.
        </p>
      ),
      labels: { confirm: "Grant", cancel: "Cancel" },
      confirmProps: { color: "yellow" },
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
              <IconCheck style={{ width: rem(14), height: rem(14) }} />
            }
            onClick={openAllowModal}
          >
            Grant
          </Menu.Item>

          <Menu.Divider />

          <Menu.Item
            color="red"
            leftSection={<IconX style={{ width: rem(14), height: rem(14) }} />}
            onClick={openDisallowModal}
          >
            Decline
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default MenuPassword;
