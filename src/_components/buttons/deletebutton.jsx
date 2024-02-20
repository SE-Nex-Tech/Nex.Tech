import React from "react";
import { useState } from "react";
import { Modal, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
const DeleteButton = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal opened={opened} onClose={close} title="Edit database" centered>
        TEST3
      </Modal>

      <Button
        onClick={open}
        variant="filled"
        color="rgb(141, 16, 56)"
        radius="xl"
      >
        Delete
      </Button>
    </>
  );
};

export default DeleteButton;
