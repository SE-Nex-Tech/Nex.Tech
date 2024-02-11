"use client";

import Header from "@/_components/header/Header";
import React, { useState, useCallback, useEffect } from "react";

import { usePathname, useRouter } from "next/navigation";

const BooksCatalog = () => {
  const current = usePathname();

  return (
    <div>
      <Header currentRoute={current} />
    </div>
  );
};

export default BooksCatalog;
