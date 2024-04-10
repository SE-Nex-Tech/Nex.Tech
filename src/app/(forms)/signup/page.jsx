"use client";

import React, { useRef, useState } from "react";
import styles from "./signup.module.scss";
import { Input, Button, PasswordInput, InputWrapper } from "@mantine/core";
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

  const router = useRouter();

  const email = useRef("");
  const [emailValue, setEmailValue] = useState("");
  const password = useRef("");
  const [passwordValue, setPasswordValue] = useState("");
  const fname = useRef("");
  const [fnameValue, setFnameValue] = useState("");
  const lname = useRef("");
  const [lnameValue, setLnameValue] = useState("");
  const num = useRef("");
  const [numValue, setNumValue] = useState("");

  const onSubmit = async () => {
    const response = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({
        email: email.current,
        password: password.current,
        fname: fname.current,
        lname: lname.current,
        num: num.current,
      }),
    });

    const result = await response.json();

    if (result.invalid == undefined) {
      router.push("/login");
    } else {
      toast.warning("Invalid email");
    }
  };

  const handleKeyDown = (e) => {
    if (e.keycode === 13) {
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
            <div className={styles.name}>
              <Input.Wrapper label={<strong>First Name</strong>}>
                <Input
                  placeholder="Juan"
                  label="First Name"
                  classNames={styles}
                  onChange={(e) => {
                    fname.current = e.target.value;
                    setFnameValue(e.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                />
              </Input.Wrapper>
              <Input.Wrapper label={<strong>Last Name</strong>}>
                <Input
                  placeholder="De la Cruz"
                  classNames={styles}
                  onChange={(e) => {
                    lname.current = e.target.value;
                    setLnameValue(e.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                />
              </Input.Wrapper>
            </div>
            <Input.Wrapper label={<strong>Email</strong>}>
              <Input
                placeholder="juan.delacruz.cics@ust.edu.ph"
                classNames={styles}
                onChange={(e) => {
                  email.current = e.target.value;
                  setEmailValue(e.target.value);
                }}
                onKeyDown={handleKeyDown}
              />
            </Input.Wrapper>
            <Input.Wrapper label={<strong>Employee / Student Number</strong>}>
              <Input
                placeholder="2021157407"
                classNames={styles}
                onChange={(e) => {
                  num.current = e.target.value;
                  setNumValue(e.target.value);
                }}
                onKeyDown={handleKeyDown}
              />
            </Input.Wrapper>
            <Input.Wrapper label={<strong>Password</strong>}>
              <PasswordInput
                placeholder="At least 6 characters"
                withAsterisk
                classNames={styles}
                onChange={(e) => {
                  password.current = e.target.value;
                  setPasswordValue(e.target.value);
                }}
                onKeyDown={handleKeyDown}
              />
            </Input.Wrapper>
          </div>
          <div className={styles.leftLower}>
            <Button
              classNames={{ root: styles.btn }}
              radius={"xl"}
              w={"400px"}
              color="rgb(141, 16, 56)"
              onClick={onSubmit}
              disabled={
                !emailValue ||
                !passwordValue ||
                !fnameValue ||
                !lnameValue ||
                !numValue
              }
            >
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
