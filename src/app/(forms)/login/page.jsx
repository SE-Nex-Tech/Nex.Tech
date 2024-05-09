"use client";

import React, { useRef, useState, useEffect } from "react";
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

  const isLocalStorageAvailable =
    typeof window !== "undefined" && window.localStorage;

  const initialLoginAttempts = isLocalStorageAvailable
    ? Number(localStorage.getItem("loginAttempts")) || 0
    : 0;
  const initialCounter = isLocalStorageAvailable
    ? Number(localStorage.getItem("counter")) || 5 * 60
    : 5 * 60;

  const [loginAttempts, setLoginAttempts] = useState(initialLoginAttempts);
  const [isButtonDisabled, setIsButtonDisabled] = useState(
    initialLoginAttempts >= 5
  );
  const [counter, setCounter] = useState(initialCounter);

  useEffect(() => {
    if (isLocalStorageAvailable) {
      localStorage.setItem("loginAttempts", loginAttempts);
      localStorage.setItem("counter", counter);
    }
    let intervalId;

    if (isButtonDisabled && counter > 0) {
      intervalId = setInterval(() => {
        setCounter((counter) => counter - 1);
      }, 1000);
    } else if (counter === 0) {
      setIsButtonDisabled(false);
      setCounter(5 * 60);
      setLoginAttempts(0);
    }

    return () => clearInterval(intervalId);
  }, [isButtonDisabled, counter, loginAttempts, isLocalStorageAvailable]);

  const onSubmit = async () => {
    const result = await signIn("credentials", {
      email: email.current,
      password: password.current,
      redirect: false,
      callbackUrl: "/",
    });

    const type = await (
      await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          email: email.current,
        }),
      })
    ).json();

    if (result.ok) {
      toast.success("Logged in successfully, please wait", {
        autoClose: 2000,
        position: "top-center",
      });
      setTimeout(() => {
        if (type.type == "admin") {
          router.push("/dashboard");
        } else if (type.type == "superadmin") {
          router.push("/admin");
        }
      }, 2000);
    } else {
      toast.error("Incorrect Credentials!", {
        autoClose: 90000,
        position: "top-center",
      });
      setLoginAttempts((prevAttempts) => prevAttempts + 1);
      if (loginAttempts + 1 >= 5) {
        setIsButtonDisabled(true);
      }
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
              onKeyDown={isButtonDisabled ? null : handleKeyDown}
            />
            <PasswordInput
              placeholder="Password"
              withAsterisk
              leftSection={<IconLock size={16} />}
              classNames={styles}
              onChange={(e) => (password.current = e.target.value)}
              onKeyDown={isButtonDisabled ? null : handleKeyDown}
            />
          </div>
          <div className={styles.leftLower}>
            {isButtonDisabled && (
              <p className={styles.countdown}>
                Try again in {Math.floor(counter / 60)}:
                {counter % 60 < 10 ? `0${counter % 60}` : counter % 60} minutes
              </p>
            )}
            <Button
              variant="filled"
              color="#e8b031"
              radius="xl"
              classNames={{ root: styles.btn }}
              onClick={onSubmit}
              disabled={isButtonDisabled}
            >
              Login
            </Button>

            <Link href="/signup">
              <Button
                variant="outline"
                color="gray"
                radius="xl"
                classNames={{ root: styles.btn2 }}
              >
                Sign Up
              </Button>
            </Link>
          </div>
          <h2 className={styles.forgot}>
            <Link href="/reset" className={styles.forgot}>
              Forgot Password?
            </Link>
          </h2>
        </div>
        <div className={styles.right}>
          <div className={styles.gradientOverlay}></div>
          <div className={styles.hero}>
            <h1>CICS BiblioTechAI</h1>
            <p>Online Portal</p>
          </div>
          <Image src={building} className={styles.building} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
