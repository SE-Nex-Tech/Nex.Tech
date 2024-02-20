"use client";

import React, { useRef } from "react";
import styles from "./verify.module.scss";
import { Input, Button, PasswordInput } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import Image from "next/image";
import logo from "@/images/logo.png";
import building from "@/images/building.jpg";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Forgot = () => {
  return (
    <div className={styles.parent}>
      <div className={styles.container}>
        <Image
          src={logo}
          width={90.8125} // Adjust the values as needed
          height={128} // Adjust the values as needed
          className={styles.logo}
          alt="logo"
        />
        <div className={styles.left}>
          <div className={styles.leftUpper}>
            <Input placeholder="Email" classNames={styles} required="true" />
            <Input
              placeholder="Employee / Student Number"
              classNames={styles}
            />
          </div>
          <div className={styles.leftLower}>
            {/* must remove link and replace it with onClick function */}
            <Link href="/reset">
              <Button classNames={{ root: styles.btn }}>
                Forgot Password{" "}
              </Button>
            </Link>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.gradientOverlay}></div>
          <Image src={building} className={styles.building} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Forgot;
