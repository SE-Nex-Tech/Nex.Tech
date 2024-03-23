import React from "react";
import { Group, Stack, Input, Button } from "@mantine/core";

const EditAdmin = ({ closeModal }) => {
  return (
    <>
      <>
        <Group grow mb={20}>
          <Input.Wrapper label={<strong>First Name</strong>}>
            <Input placeholder="First Name" defaultValue="Carl Mitzchel" />
          </Input.Wrapper>
          <Input.Wrapper label={<strong>Middle Name</strong>}>
            <Input
              placeholder="Middle Name"
              defaultValue=""
              //   onChange={(e) => (author.current = e.target.value)}
            />
          </Input.Wrapper>
        </Group>
        <Group grow mb={20}>
          <Input.Wrapper label={<strong>Last Name</strong>}>
            <Input
              placeholder="Last Name"
              defaultValue="Padua"
              //   onChange={(e) => (callnum.current = e.target.value)}
            />
          </Input.Wrapper>
        </Group>
        <Group grow mb={20}>
          <Input.Wrapper label={<strong>Email</strong>}>
            <Input
              placeholder="Email"
              defaultValue="carlmitzchel.padua.cics@ust.edu.ph"
              //   onChange={(e) => (callnum.current = e.target.value)}
            />
          </Input.Wrapper>
        </Group>

        <Stack justify="center" grow mt="xl">
          <Button
            variant="filled"
            color="rgb(141, 16, 56)"
            radius="xl"
            // onClick={editRecord}
          >
            Save
          </Button>
          <Button
            variant="outline"
            color="rgb(141, 16, 56)"
            radius="xl"
            onClick={closeModal}
          >
            Discard
          </Button>
        </Stack>
      </>
    </>
  );
};

export default EditAdmin;
