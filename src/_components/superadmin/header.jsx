"use client";

import React from "react";
import styles from "./header.module.scss";
import { Button } from "@mantine/core";
import { signOut } from "next-auth/react";

const Header = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.text}>Administrator</h1>
      <Button
        variant="filled"
        color="yellow"
        radius="xl"
        style={{ transition: "all 0.2s" }}
        onClick={() => {
          signOut({ redirect: false, callbackUrl: "/" });
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default Header;
