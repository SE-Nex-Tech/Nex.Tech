import React from "react";
import styles from "./unauthenticated.module.scss";
import { Button, Center } from "@mantine/core";
import { signIn } from "next-auth/react";

const Unauthenticated = () => {
  return (
    <>
      <Center maw="100%" mih="100%">
        <div className={styles.container}>
          <h1>401</h1>
          <h3>Unauthorized Access</h3>
          <p>You do not have the permission to view this directory.</p>
          <Button
            variant="filled"
            color="rgb(141, 16, 56)"
            radius="xl"
            mt="0.8em"
            w="100%"
            onClick={() => signIn()}
          >
            Log in
          </Button>
        </div>
      </Center>
    </>
  );
};

export default Unauthenticated;
