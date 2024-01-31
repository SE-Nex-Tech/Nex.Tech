"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "@/_components/sideNav/sidebar.module.scss";
import logo from "@/images/logo.png";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  IconHome,
  IconLayoutDashboard,
  IconQrcode,
  IconBooks,
  IconDice,
  IconReport,
  IconDatabase,
  IconUserCircle,
  IconLogin,
  IconLogout,
  IconChevronLeftPipe,
  IconChevronRightPipe,
} from "@tabler/icons-react";

const sideBarItems = [
  {
    name: "Home",
    href: "/",
    icon: IconHome,
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: IconLayoutDashboard,
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

const User = () => {
  const { data: session } = useSession();

  return (
    <p className={styles.information}>
      {session && session.user && session.user.name}
    </p>
  );
};

const Email = () => {
  const { data: session } = useSession();

  return (
    <p className={styles.information2}>
      {session && session.user && session.user.email}
    </p>
  );
};

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prevIsCollapsed) => !prevIsCollapsed);
  };

  const focusActive = (index) => {
    setIsActive(index);
  };

  const notify = () => toast("Successfully signed out!");

  const { data: session } = useSession();

  if (session) {
    return (
      <aside
        className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}
      >
        <div className={styles.heading}>
          <div className={styles.headingLeft}>
            <Image
              src={logo}
              width={isCollapsed ? 50 : 105} // Adjust the values as needed
              height={isCollapsed ? 57.5 : 130} // Adjust the values as needed
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
              <div>
                <User />
                <Email />
              </div>
              <Link href="/" className={styles.link}>
                <IconLogout
                  size="28px"
                  onClick={() => {
                    notify();
                    signOut({ redirect: false, callbackUrl: "/" });
                  }}
                />
                <ToastContainer toastStyle={{ backgroundColor: "white" }} />
              </Link>
            </div>
          </>
        )}
      </aside>
    );
  } else {
    return (
      <aside
        className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}
      >
        <div className={styles.heading}>
          <div className={styles.headingLeft}>
            <Image
              src={logo}
              width={isCollapsed ? 50 : 105} // Adjust the values as needed
              height={isCollapsed ? 57.5 : 130} // Adjust the values as needed
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
          {sideBarItems
            .filter(
              ({ href }) =>
                ![
                  "/dashboard",
                  "/qrscanner",
                  "/adreport",
                  "/addatabase",
                ].includes(href)
            )
            .map(({ name, href, icon: Icon }, index) => (
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
              Login as Admin
              <IconLogin size="28px" onClick={() => signIn()} />
            </div>
          </>
        )}
      </aside>
    );
  }
}

export default Sidebar;
