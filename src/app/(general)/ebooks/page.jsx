"use client";

import { signIn } from "next-auth/react";
import React from "react";

const page = () => {
  return (
    <div>
      THIS IS JUST A TEST
      <button onClick={() => signIn()}>TEST</button>
    </div>
  );
};

export default page;
