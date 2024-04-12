"use client";

import Header from "@/_components/header/Header";
import React, { useState, useCallback, useEffect } from "react";
import { Center, Box, Loader } from "@mantine/core";
import styles from "./games.module.scss";

import { usePathname, useRouter } from "next/navigation";
import { useSession, getSession } from "next-auth/react";
import BooksMobile from "@/_components/catalogs/booksMobile";
import Games from "@/_components/catalogs/games";

const GamesCatalog = () => {
  const current = usePathname();
  const [showHeader, setShowHeader] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1105) {
        setIsMobile(true);
        setShowHeader(false);
      } else {
        setIsMobile(false);
        setShowHeader(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div>
        {showHeader && (
          <div>
            <Header currentRoute={current} />
          </div>
        )}
      </div>
      <Center className={styles.center} maw="100%" mih="80%">
        {isMobile ? <BooksMobile /> : <Games />}
      </Center>
    </>
  );
};

export default GamesCatalog;
