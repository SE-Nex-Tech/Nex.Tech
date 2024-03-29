"use client";

import React, { useRef } from "react";
import styles from "./reset.module.scss";
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

const Reset = () => {
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

  let email = ''
  let oldpass = ''
  let newpass = ''
  let confirmnew = ''

  const fetchData = async (obj) => {
    const response = await fetch('/api/reset/request', {
      method: 'POST',
      body: JSON.stringify(obj)
    })
    const data = await response.json()
    return data
  }

  const reset_pass = async () => {
    let flag = false
    if (newpass !== confirmnew) {
      toast.warning('New password confirmation does not match')
      flag = true
    }
    if (oldpass === newpass) {
      toast.warning('New password is the same as old password')
      flag = true
    }
    if (flag) {
      return
    }

    const fetch = await fetchData({
      email,
      oldpass,
      newpass,
      confirmnew
    })

    if (fetch.invalid != undefined) {
      toast.error(fetch.msg)
      return
    }

    toast.success('Password change requested')
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
            <Input placeholder="Email" classNames={styles} required="true" onChange={(e) => (email = e.target.value)}/>
            <PasswordInput
              placeholder="Old Password"
              withAsterisk
              classNames={styles}
              onChange={(e) => (oldpass = e.target.value)}
            />
            <PasswordInput
              placeholder="New Password"
              withAsterisk
              classNames={styles}
              onChange={(e) => (newpass = e.target.value)}
            />
            <PasswordInput
              placeholder="Confirm New Password"
              withAsterisk
              classNames={styles}
              onChange={(e) => (confirmnew = e.target.value)}
            />
          </div>
          <div className={styles.leftLower}>
            <Button classNames={{ root: styles.btn }} onClick={reset_pass}>
              Reset your password
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

export default Reset;
