import React from "react";
import { useState } from "react";
import { Modal, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
const AddButton = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal opened={opened} onClose={close} title="Edit database" centered>
        TEST2
      </Modal>

      <Button
        onClick={open}
        variant="filled"
        color="rgb(141, 16, 56)"
        radius="xl"
      >
        Add
      </Button>
    </>
  );
};

export default AddButton;
