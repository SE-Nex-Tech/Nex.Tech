"use client";

import React, { useRef } from "react";
import styles from "./login.module.scss";
import { Input, Button, PasswordInput } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import Image from "next/image";
import logo from "@/images/logo.png";
import building from "@/images/building.jpg";
import Link from "next/link";
import { signIn } from "next-auth/react";

const Login = () => {
  const email = useRef("");
  const password = useRef("");

  const onSubmit = async () => {
    const result = await signIn("credentials", {
      email: email.current,
      password: password.current,
      redirect: true,
      callbackUrl: "/dashboard",
    });
  };

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
            <Input
              placeholder="Email"
              leftSection={<IconAt size={16} />}
              classNames={styles}
              onChange={(e) => (email.current = e.target.value)}
            />
            <PasswordInput
              placeholder="Password"
              withAsterisk
              leftSection={<IconLock size={16} />}
              classNames={styles}
              onChange={(e) => (password.current = e.target.value)}
            />
          </div>
          <div className={styles.leftLower}>
            <Button classNames={{ root: styles.btn }} onClick={onSubmit}>
              Login
            </Button>

            <Link href="/">
              <Button classNames={{ root: styles.btn2 }}>Sign Up</Button>
            </Link>
          </div>
          <h2 className={styles.forgot}>
            <Link href="/" className={styles.forgot}>
              {" "}
              Forgot Password?
            </Link>
          </h2>
        </div>
        <div className={styles.right}>
          <div className={styles.gradientOverlay}></div>
          <Image src={building} className={styles.building} />
        </div>
      </div>
    </div>
  );
};

export default Login;
