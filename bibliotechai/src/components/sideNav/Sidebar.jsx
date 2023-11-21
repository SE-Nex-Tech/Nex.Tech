import React from "react";
import Image from "next/image";
import styles from "@/components/sideNav/sidebar.module.scss";
import logo from "@/images/logo.png";
import Link from "next/link";

import { Icon123, IconHome } from "@tabler/icons-react";
import { IconQrcode } from "@tabler/icons-react";
import { IconBooks } from "@tabler/icons-react";
import { IconDeviceMobile } from "@tabler/icons-react";
import { IconDice } from "@tabler/icons-react";
import { IconReport } from "@tabler/icons-react";
import { IconDatabase } from "@tabler/icons-react";
import { IconUserCircle } from "@tabler/icons-react";
import { IconLogout } from "@tabler/icons-react";

const sideBarItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: IconHome,
  },
  {
    name: "QR Scanner",
    href: "/",
    icon: IconQrcode,
  },
  {
    name: "Books",
    href: "/",
    icon: IconBooks,
  },
  {
    name: "eBooks",
    href: "/",
    icon: IconDeviceMobile,
  },
  {
    name: "Games",
    href: "/",
    icon: IconDice,
  },
  {
    name: "Reports",
    href: "/",
    icon: IconReport,
  },
  {
    name: "Database",
    href: "/",
    icon: IconDatabase,
  },
];

function Sidebar() {
  return (
    <div>
      <aside className={styles.sidebar}>
        <div className={styles.heading}>
          <h1>BiblioTechAI</h1>
          <Image
            src={logo}
            width={100}
            height={115}
            className={styles.logo}
            alt="logo"
          />
        </div>
        <ul className={styles.list}>
          {sideBarItems.map(({ name, href, icon: Icon }) => (
            <li className={styles.items} key={name}>
              <Link href="/" className={styles.link}>
                <span className={styles.icons}>
                  <Icon size="28px" />
                </span>
                <span className={styles.name}>{name}</span>
              </Link>
            </li>
          ))}
        </ul>
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
      </aside>
    </div>
  );
}

export default Sidebar;
