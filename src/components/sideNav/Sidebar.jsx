"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "@/components/sideNav/sidebar.module.scss";
import logo from "@/images/logo.png";
import Link from "next/link";

import {
  IconHome,
  IconQrcode,
  IconBooks,
  IconDeviceMobile,
  IconDice,
  IconReport,
  IconDatabase,
  IconUserCircle,
  IconLogout,
  IconChevronLeftPipe,
  IconChevronRightPipe,
} from "@tabler/icons-react";

const sideBarItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: IconHome,
  },
  {
    name: "QR Scanner",
    href: "/qrscanner",
    icon: IconQrcode,
  },
  {
    name: "Books",
    href: "/books",
    icon: IconBooks,
  },
  {
    name: "eBooks",
    href: "/ebooks",
    icon: IconDeviceMobile,
  },
  {
    name: "Games",
    href: "/games",
    icon: IconDice,
  },
  {
    name: "Reports",
    href: "/adreport",
    icon: IconReport,
  },
  {
    name: "Database",
    href: "/addatabase",
    icon: IconDatabase,
  },
];

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prevIsCollapsed) => !prevIsCollapsed);
  };

  const focusActive = (index) => {
    setIsActive(index);
  };

  return (
    <aside
      className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}
    >
      <div className={styles.heading}>
        <div className={styles.headingLeft}>
          <Image
            src={logo}
            width={isCollapsed ? 50 : 100} // Adjust the values as needed
            height={isCollapsed ? 57.5 : 115} // Adjust the values as needed
            className={styles.logo}
            alt="logo"
          />
          {!isCollapsed && <h1>BiblioTechAI</h1>}
        </div>
      </div>
      <button className={styles.headingRight} onClick={toggleSidebar}>
        {isCollapsed ? (
          <IconChevronRightPipe className={styles.chevron} />
        ) : (
          <IconChevronLeftPipe className={styles.chevron} />
        )}
      </button>
      <ul className={styles.list}>
        {sideBarItems.map(({ name, href, icon: Icon }, index) => (
          <li
            className={`${styles.items} ${
              isActive === index ? styles.isActive : ""
            }`}
            key={name}
            onClick={() => focusActive(index)}
          >
            {isCollapsed ? (
              <Link href={href} className={styles.link}>
                <span className={styles.icons}>
                  <Icon size="28px" />
                </span>
              </Link>
            ) : (
              <Link href={href} className={styles.link}>
                <span className={styles.icons}>
                  <Icon size="28px" />
                </span>
                <span className={styles.name}>{name}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
      {!isCollapsed && (
        <>
          <hr className={styles.line} />
          <div className={styles.profile}>
            <Link href="/" className={styles.link}>
              <IconUserCircle size="28px" />
            </Link>
            <div>
              <p className={styles.information}>Carl Mitzchel Padua</p>
              <p className={styles.information2}>admin1@gmail.com</p>
            </div>
            <Link href="/" className={styles.link}>
              <IconLogout size="28px" />
            </Link>
          </div>
        </>
      )}
    </aside>
  );
}

export default Sidebar;
