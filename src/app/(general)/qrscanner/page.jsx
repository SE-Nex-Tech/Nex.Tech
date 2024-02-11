"use client";

import React from "react";
import { TextInput } from "@mantine/core";
import styles from "./page.module.scss";

const page = () => {
  return (
    <TextInput
      label="Floating label input"
      classNames={{
        root: styles.root,
        input: styles.input,
        label: styles.label,
      }}
    />
  );
};

export default page;
