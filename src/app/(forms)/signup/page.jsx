"use client";

import React, { useRef, useState } from "react";
import styles from "./signup.module.scss";
import { Input, Button, PasswordInput, TextInput } from "@mantine/core";
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
  const mname = useRef("");
  const [mnameValue, setMnameValue] = useState("");
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
        mname: mname.current,
        lname: lname.current,
        num: num.current,
      }),
    });

    const result = await response.json();

    if (result.invalid == undefined) {
      toast.success("Signed up successfully, please wait for authorization.", {
        autoClose: 4000,
      });
      setTimeout(() => {
        router.push("/login");
      }, 4200);
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
              <TextInput
                placeholder="Juan"
                label="First Name"
                classNames={styles}
                error={
                  fname.current === "" || /^[a-zA-Z]+$/.test(fname.current)
                    ? ""
                    : "Numeric characters not allowed."
                }
                onChange={(e) => {
                  fname.current = e.target.value;
                  setFnameValue(e.target.value);
                }}
                onKeyDown={handleKeyDown}
              />
              <TextInput
                placeholder="Manuel"
                label="Middle Name"
                error={
                  mname.current === "" || /^[a-zA-Z]+$/.test(mname.current)
                    ? ""
                    : "Numeric characters not allowed."
                }
                classNames={styles}
                onChange={(e) => {
                  mname.current = e.target.value;
                  setMnameValue(e.target.value);
                }}
                onKeyDown={handleKeyDown}
              />
            </div>
            <TextInput
              placeholder="De la Cruz"
              label="Last Name"
              classNames={styles}
              error={
                lname.current === "" || /^[a-zA-Z]+$/.test(lname.current)
                  ? ""
                  : "Numeric characters not allowed."
              }
              onChange={(e) => {
                lname.current = e.target.value;
                setLnameValue(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
            <TextInput
              placeholder="juan.delacruz.cics@ust.edu.ph"
              label="Email"
              error={
                email.current &&
                !/^[A-Za-z0-9._%+-]+@ust\.edu\.ph$/.test(email.current)
                  ? "Invalid email address."
                  : ""
              }
              classNames={styles}
              onChange={(e) => {
                email.current = e.target.value;
                setEmailValue(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
            <TextInput
              placeholder="2021157407"
              label="Employee / Student Number"
              error={
                num.current &&
                (!/^\d+$/.test(num.current) || num.current.length < 10)
                  ? "Invalid number."
                  : ""
              }
              classNames={styles}
              onChange={(e) => {
                num.current = e.target.value;
                setNumValue(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
            <PasswordInput
              placeholder="- - - - - - - -"
              withAsterisk
              label="Password"
              error={
                password.current.length < 8 && password.current !== ""
                  ? "Password must be at least 8 characters long."
                  : ""
              }
              classNames={styles}
              onChange={(e) => {
                password.current = e.target.value;
                setPasswordValue(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
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
                !numValue ||
                !/^[a-zA-Z]+$/.test(fnameValue) ||
                !/^[a-zA-Z]+$/.test(lnameValue) ||
                !/^\d+$/.test(numValue) ||
                numValue.length < 10 ||
                passwordValue.length < 8
              }
            >
              Create an account
            </Button>
          </div>
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

export default Signup;
