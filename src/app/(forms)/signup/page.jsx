"use client";

import React, { useRef } from "react";
import styles from "./signup.module.scss";
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

const Signup = () => {
  //   const email = useRef("");
  //   const password = useRef("");

  //   const router = useRouter();

  //   const onSubmit = async () => {
  //     const result = await signIn("credentials", {
  //       email: email.current,
  //       password: password.current,
  //       redirect: false,
  //       callbackUrl: "/",
  //     });

  //     if (result.ok) {
  //       toast.success("Logged in successfully, please wait", { autoClose: 2000 });
  //       setTimeout(() => {
  //         router.push("/dashboard");
  //       }, 2000);
  //     } else {
  //       toast.error("Incorrect Credentials!");
  //     }
  //   };

  const router = useRouter()

  const email = useRef('')
  const password = useRef('')
  const fname = useRef('')
  const lname = useRef('')
  const num = useRef('')

  const onSubmit = async () => {
    const response = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({
        email: email.current,
        password: password.current,
        fname: fname.current,
        lname: lname.current,
        num: num.current
      })
    })

    const result = await response.json()

    if (result.invalid == undefined) {
      router.push('/login')
    } else {
      toast.warning('Invalid email')
    }
  }

  const handleKeyDown = (e) => {
    if (e.keycode === 13) {
      onSubmit();
    }
  }

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
            <div className={styles.name}>
              <Input placeholder="First Name" classNames={styles} onChange={(e) => (fname.current = e.target.value)} onKeyDown={handleKeyDown} />
              <Input placeholder="Last Name" classNames={styles} onChange={(e) => (lname.current = e.target.value)} onKeyDown={handleKeyDown}/>
            </div>
            <Input placeholder="Email" classNames={styles} onChange={(e) => (email.current = e.target.value)} onKeyDown={handleKeyDown}/>
            <Input
              placeholder="Employee / Student Number"
              classNames={styles}
              onChange={(e) => (num.current = e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <PasswordInput
              placeholder="Password"
              withAsterisk
              classNames={styles}
              onChange={(e) => (password.current = e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className={styles.leftLower}>
            {/* must remove link and replace it with onClick function */}
            <Button classNames={{ root: styles.btn }} onClick={onSubmit}>
              Create an account
            </Button>
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

export default Signup;
