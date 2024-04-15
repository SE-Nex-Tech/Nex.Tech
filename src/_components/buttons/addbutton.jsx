import React from "react";
import { useState } from "react";
import { Modal, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AddForm from "../crudforms/add";
const AddButton = ({ refreshKey, setRefreshKey }) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="xl"
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        withCloseButton={false}
      >
        <AddForm
          closeModal={close}
          setRefreshKey={setRefreshKey}
          refreshKey={refreshKey}
        />
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
