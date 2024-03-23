import React from "react";
import { Group, Stack, Input, Button } from "@mantine/core";
import { useRef } from 'react'

const EditAdmin = ({ closeModal, admin }) => {

  const fn = useRef(admin.fn)
  const mn = useRef(admin.mn)
  const ln = useRef(admin.ln)
  const email = useRef(admin.email)

  const editRecord = async () => {
    const response = await fetch('/api/superadmin/editadmin', {
      method: 'POST',
      body: JSON.stringify({
        id: admin.id,
        fn: fn.current,
        mn: mn.current,
        ln: ln.current,
        email: email.current
      })
    })
  }

  return (
    <>
      <>
        <Group grow mb={20}>
          <Input.Wrapper label={<strong>First Name</strong>}>
            <Input
              placeholder="First Name"
              defaultValue={fn.current}
              onChange={(e) => (fn.current = e.target.value)}
            />
          </Input.Wrapper>
          <Input.Wrapper label={<strong>Middle Name</strong>}>
            <Input
              placeholder="Middle Name"
              defaultValue={mn.current}
              onChange={(e) => (mn.current = e.target.value)}
              //   onChange={(e) => (author.current = e.target.value)}
            />
          </Input.Wrapper>
        </Group>
        <Group grow mb={20}>
          <Input.Wrapper label={<strong>Last Name</strong>}>
            <Input
              placeholder="Last Name"
              defaultValue={ln.current}
              onChange={(e) => (ln.current = e.target.value)}
              //   onChange={(e) => (callnum.current = e.target.value)}
            />
          </Input.Wrapper>
        </Group>
        <Group grow mb={20}>
          <Input.Wrapper label={<strong>Email</strong>}>
            <Input
              placeholder="Email"
              defaultValue={email.current}
              onChange={(e) => (email.current = e.target.value)}
              //   onChange={(e) => (callnum.current = e.target.value)}
            />
          </Input.Wrapper>
        </Group>

        <Stack justify="center" grow mt="xl">
          <Button
            variant="filled"
            color="rgb(141, 16, 56)"
            radius="xl"
            onClick={editRecord}
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
