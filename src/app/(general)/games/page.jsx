"use client";

import Header from "@/_components/header/Header";
import React, { useState, useCallback, useEffect } from "react";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { usePathname, useRouter } from "next/navigation";
import cx from "clsx";
import "@mantine/carousel/styles.css";
import { IconCircleArrowRightFilled } from "@tabler/icons-react";

import {
  Center,
  Container,
  MantineProvider,
  createTheme,
  Skeleton,
  Button,
} from "@mantine/core";
import { Carousel, Embla } from "@mantine/carousel";

const page = () => {
  const current = usePathname();

  const theme = createTheme({
    components: {
      Container: Container.extend({
        classNames: (_, { size }) => ({
          root: cx({ [styles.responsiveContainer]: size === "responsive" }),
        }),
      }),
    },
  });

  return (
    <MantineProvider theme={theme}>
      <div>
        <Header currentRoute={current} />
      </div>
    </MantineProvider>
  );
};

export default page;
