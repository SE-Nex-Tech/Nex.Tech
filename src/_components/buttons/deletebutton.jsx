import React from "react";
import { useState } from "react";
import { Modal, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ArchiveForm from "../crudforms/archive";
const DeleteButton = ({
  selectedRows,
  setSelectedRows,
  refreshKey,
  setRefreshKey,
  setNotification,
  selectedType,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size={500}
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        withCloseButton={false}
        style={{ overflowY: "auto" }}
      >
        <ArchiveForm
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          closeModal={close}
          setRefreshKey={setRefreshKey}
          refreshKey={refreshKey}
          setNotification={setNotification}
          selectedType={selectedType}
        />
      </Modal>

      <Button
        onClick={open}
        variant="filled"
        color="#e8b031"
        radius="xl"
        disabled={selectedRows.length === 0}
        style={{ transition: "all 0.2s" }}
      >
        Archive
      </Button>
    </>
  );
};

export default DeleteButton;
