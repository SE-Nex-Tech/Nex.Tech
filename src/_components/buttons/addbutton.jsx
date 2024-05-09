import React from "react";
import { useState } from "react";
import { Modal, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AddForm from "../crudforms/add";

const AddButton = ({ selectedRows, refreshKey, setRefreshKey, setNotification, selectedType, bookDB, gameDB }) => {
  
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
          setNotification={setNotification}
          selectedType={selectedType}
          bookDB={bookDB}
          gameDB={gameDB}
        />
      </Modal>

      <Button
        onClick={open}
        variant="filled"
        color="#e8b031"
        radius="xl"
        disabled={selectedRows.length > 0}
        style={{ transition: "all 0.2s" }}
      >
        Add
      </Button>
    </>
  );
};

export default AddButton;
