"use client";

import React from "react";
import styles from "./header.module.scss";
import { Button } from "@mantine/core";
import { signOut } from "next-auth/react";
import { useSession, getSession } from "next-auth/react";
import Unauthenticated from "@/_components/authentication/unauthenticated";

const Header = () => {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    return <Unauthenticated />;
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.text}>Administrator</h1>
      <Button
        variant="filled"
        color="yellow"
        radius="xl"
        style={{ transition: "all 0.2s" }}
        onClick={() => {
          signOut({ redirect: true, callbackUrl: "/landing" });
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default Header;
