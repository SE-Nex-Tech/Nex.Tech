"use client";

import React from "react";
import styles from "@/_components/header/header.module.scss";
import getPageTitle from "./pageTitles";
import { useState, useEffect } from "react";

const Header = ({ currentRoute }) => {
  const title = getPageTitle(currentRoute);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    setCurrentDate(currentDate);
  }, []);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <h1 className={styles.date}>{currentDate}</h1>
    </div>
  );
};

export default Header;
