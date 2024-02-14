"use client";

import Header from "@/_components/header/Header";
import React, { useState, useCallback, useEffect } from "react";
import { Center, Box, Loader } from "@mantine/core";
import styles from "./books.module.scss";

import { usePathname, useRouter } from "next/navigation";
import Books from "@/_components/catalogs/books";
import { useSession, getSession } from "next-auth/react";

const BooksCatalog = () => {
  const current = usePathname();

  return (
    <>
      <div>
        <Header currentRoute={current} />
      </div>
      <Center className={styles.center} maw="100%" m={25} h="81.5%">
        <Books />
      </Center>
    </>
  );
};

export default BooksCatalog;
