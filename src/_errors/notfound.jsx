import React from "react";
import styles from "./error.module.scss";
import { Button, Center } from "@mantine/core";
import { signIn } from "next-auth/react";
import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <Center maw="100%" mih="100%">
        <div className={styles.container}>
          <h1>404</h1>
          <h3>Item Not Found</h3>
          <p>
            The item you're looking for may have been deleted or possibly never
            existed.
          </p>
          <Button
            variant="filled"
            color="rgb(141, 16, 56)"
            radius="xl"
            mt="0.8em"
            w="100%"
            component={Link}
            href="/landing"
          >
            Return
          </Button>
        </div>
      </Center>
    </>
  );
};

export default NotFound;
