import React from "react";
import { IconChevronLeft } from "@tabler/icons-react";
import styles from "./navigator.module.scss";
import Link from "next/link";

const Navigator = ({ buttonText, showIcon = true, disableLink = false, link }) => {
  return (
    <>
      {disableLink ? (
        <div className={styles.navigator}>
          {showIcon && <IconChevronLeft size={32} />}
          {buttonText}
        </div>
      ) : (
        <Link href={`/${link}`} className={styles.navigator}>
          {showIcon && <IconChevronLeft size={32} />}
          {buttonText}
        </Link>
      )}
    </>
  );
};

export default Navigator;
