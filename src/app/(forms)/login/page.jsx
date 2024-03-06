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
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const email = useRef("");
  const password = useRef("");

  const router = useRouter();

  const onSubmit = async () => {
    const result = await signIn("credentials", {
      email: email.current,
      password: password.current,
      redirect: false,
      callbackUrl: "/",
    });

    if (result.ok) {
      toast.success("Logged in successfully, please wait", { autoClose: 2000 });
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } else {
      toast.error("Incorrect Credentials!");
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
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
              onKeyDown={handleKeyDown}
            />
            <PasswordInput
              placeholder="Password"
              withAsterisk
              leftSection={<IconLock size={16} />}
              classNames={styles}
              onChange={(e) => (password.current = e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className={styles.leftLower}>
            <Button
              variant="filled"
              color="rgb(141, 16, 56)"
              radius="xl"
              classNames={{ root: styles.btn }}
              onClick={onSubmit}
            >
              Login
            </Button>

            <Link href="/signup">
              <Button
                variant="filled"
                color="rgb(141, 16, 56)"
                radius="xl"
                classNames={{ root: styles.btn2 }}
              >
                Sign Up
              </Button>
            </Link>
          </div>
          <h2 className={styles.forgot}>
            <Link href="/verify" className={styles.forgot}>
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
      <ToastContainer />
    </div>
  );
};

export default Login;
