"use client";

import Header from "@/_components/header/Header";
import React, { useState, useCallback, useEffect } from "react";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { usePathname, useRouter } from "next/navigation";
import styles from "./landing.module.scss";
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

  const autoplay = useRef(Autoplay({ delay: 2000 }));

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
      <Center
        maw="100%"
        h="85%"
        style={{ display: "flex", flexDirection: "column", gap: "1.5em" }}
      >
        <Container
          size="responsive"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "3em",
          }}
        >
          <Container
            size="responsive"
            bg="#ffffff"
            px="2em"
            pt="1em"
            style={{ borderRadius: "15px", textAlign: "center" }}
          >
            <h1 className={styles.legend}>New Additions</h1>
            <Carousel
              withIndicators
              withControls={false}
              height={250}
              width="80%"
              plugins={[autoplay.current]}
              onMouseEnter={autoplay.current.stop}
              onMouseLeave={autoplay.current.reset}
              classNames={styles}
            >
              <Carousel.Slide
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1em",
                  width: "80px",
                  justifyContent: "center",
                }}
              >
                <div className={styles.holder}>
                  <Skeleton height={150} mt={20} width={100} />
                  <div className={styles.titleDiv}>
                    <p className={styles.title}>Introduction to Computing</p>
                  </div>
                </div>
                <div className={styles.holder}>
                  <Skeleton height={150} mt={20} width={100} />
                  <div className={styles.titleDiv}>
                    <p className={styles.title}>Introduction to Computing</p>
                  </div>
                </div>
              </Carousel.Slide>
              <Carousel.Slide
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1em",
                  width: "80px",
                  justifyContent: "center",
                }}
              >
                <div className={styles.holder}>
                  <Skeleton height={150} mt={20} width={100} />
                  <div className={styles.titleDiv}>
                    <p className={styles.title}>Introduction to Computing</p>
                  </div>
                </div>
                <div className={styles.holder}>
                  <Skeleton height={150} mt={20} width={100} />
                  <div className={styles.titleDiv}>
                    <p className={styles.title}>Introduction to Computing</p>
                  </div>
                </div>
              </Carousel.Slide>
              <Carousel.Slide
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1em",
                  width: "80px",
                  justifyContent: "center",
                }}
              >
                <div className={styles.holder}>
                  <Skeleton height={150} mt={20} width={100} />
                  <div className={styles.titleDiv}>
                    <p className={styles.title}>Introduction to Computing</p>
                  </div>
                </div>
                <div className={styles.holder}>
                  <Skeleton height={150} mt={20} width={100} />
                  <div className={styles.titleDiv}>
                    <p className={styles.title}>Introduction to Computing</p>
                  </div>
                </div>
              </Carousel.Slide>
            </Carousel>
          </Container>
          <Container
            size="responsive"
            bg="#ffffff"
            px="2em"
            pt="1em"
            style={{ borderRadius: "15px", textAlign: "center" }}
          >
            <h1 className={styles.legend}>New Additions</h1>
            <Carousel
              withIndicators
              withControls={false}
              height={250}
              width="80%"
              plugins={[autoplay.current]}
              onMouseEnter={autoplay.current.stop}
              onMouseLeave={autoplay.current.reset}
              classNames={styles}
            >
              <Carousel.Slide
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1em",
                  width: "80px",
                  justifyContent: "center",
                }}
              >
                <div className={styles.holder}>
                  <Skeleton height={150} mt={20} width={100} />
                  <div className={styles.titleDiv}>
                    <p className={styles.title}>Introduction to Computing</p>
                  </div>
                </div>
                <div className={styles.holder}>
                  <Skeleton height={150} mt={20} width={100} />
                  <div className={styles.titleDiv}>
                    <p className={styles.title}>Introduction to Computing</p>
                  </div>
                </div>
              </Carousel.Slide>
              <Carousel.Slide
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1em",
                  width: "80px",
                  justifyContent: "center",
                }}
              >
                <div className={styles.holder}>
                  <Skeleton height={150} mt={20} width={100} />
                  <div className={styles.titleDiv}>
                    <p className={styles.title}>Introduction to Computing</p>
                  </div>
                </div>
                <div className={styles.holder}>
                  <Skeleton height={150} mt={20} width={100} />
                  <div className={styles.titleDiv}>
                    <p className={styles.title}>Introduction to Computing</p>
                  </div>
                </div>
              </Carousel.Slide>
              <Carousel.Slide
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1em",
                  width: "80px",
                  justifyContent: "center",
                }}
              >
                <div className={styles.holder}>
                  <Skeleton height={150} mt={20} width={100} />
                  <div className={styles.titleDiv}>
                    <p className={styles.title}>Introduction to Computing</p>
                  </div>
                </div>
                <div className={styles.holder}>
                  <Skeleton height={150} mt={20} width={100} />
                  <div className={styles.titleDiv}>
                    <p className={styles.title}>Introduction to Computing</p>
                  </div>
                </div>
              </Carousel.Slide>
            </Carousel>
          </Container>
          <Container
            size="responsive"
            pt="1em"
            style={{
              borderRadius: "15px",
              textAlign: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className={styles.browseBooks}>
              <h1>Browse Books</h1>
              <IconCircleArrowRightFilled />
            </div>
            <div className={styles.browseGames}>
              <h1>Browse Board Games</h1>
              <IconCircleArrowRightFilled />
            </div>
            <div className={styles.reserve}>
              <h1>How to Reserve or Borrow</h1>
              <IconCircleArrowRightFilled />
            </div>
          </Container>
        </Container>

        <Container
          size="responsive"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "3em",
          }}
        >
          <Container
            size="responsive"
            bg="#ffffff"
            px="2em"
            pt="1em"
            style={{
              borderRadius: "15px",
              textAlign: "center",
              width: "540px",
            }}
          >
            <h1 className={styles.legend}>Most Popular Books</h1>
            <Carousel
              withIndicators
              withControls={false}
              height={250}
              width="80%"
              plugins={[autoplay.current]}
              onMouseEnter={autoplay.current.stop}
              onMouseLeave={autoplay.current.reset}
              classNames={styles}
            >
              <Carousel.Slide
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1em",
                  width: "80px",
                  justifyContent: "center",
                }}
              >
                <div className={styles.holder}>
                  <Skeleton height={150} mt={20} width={100} />
                  <div className={styles.titleDiv}>
                    <p className={styles.title}>Introduction to Computing</p>
                  </div>
                </div>
                <div className={styles.holder}>
                  <Skeleton height={150} mt={20} width={100} />
                  <div className={styles.titleDiv}>
                    <p className={styles.title}>Introduction to Computing</p>
                  </div>
                </div>
                <div className={styles.holder}>
                  <Skeleton height={150} mt={20} width={100} />
                  <div className={styles.titleDiv}>
                    <p className={styles.title}>Introduction to Computing</p>
                  </div>
                </div>

                <div className={styles.holder}>
                  <Skeleton height={150} mt={20} width={100} />
                  <div className={styles.titleDiv}>
                    <p className={styles.title}>Introduction to Computing</p>
                  </div>
                </div>
              </Carousel.Slide>
              <Carousel.Slide
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1em",
                  width: "80px",
                  justifyContent: "center",
                }}
              >
                <div className={styles.holder}>
                  <Skeleton height={150} mt={20} width={100} />
                  <div className={styles.titleDiv}>
                    <p className={styles.title}>Introduction to Computing</p>
                  </div>
                </div>
                <div className={styles.holder}>
                  <Skeleton height={150} mt={20} width={100} />
                  <div className={styles.titleDiv}>
                    <p className={styles.title}>Introduction to Computing</p>
                  </div>
                </div>
              </Carousel.Slide>
              <Carousel.Slide
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1em",
                  width: "80px",
                  justifyContent: "center",
                }}
              >
                <div className={styles.holder}>
                  <Skeleton height={150} mt={20} width={100} />
                  <div className={styles.titleDiv}>
                    <p className={styles.title}>Introduction to Computing</p>
                  </div>
                </div>
                <div className={styles.holder}>
                  <Skeleton height={150} mt={20} width={100} />
                  <div className={styles.titleDiv}>
                    <p className={styles.title}>Introduction to Computing</p>
                  </div>
                </div>
              </Carousel.Slide>
            </Carousel>
          </Container>
          <Container
            size="responsive"
            bg="#ffffff"
            px="2em"
            pt="1em"
            style={{
              borderRadius: "15px",
              textAlign: "center",
              width: "540px",
            }}
          >
            <h1 className={styles.legend}>Most Popular Board Games</h1>
            <Carousel
              withIndicators
              withControls={false}
              height={250}
              width="80%"
              plugins={[autoplay.current]}
              onMouseEnter={autoplay.current.stop}
              onMouseLeave={autoplay.current.reset}
              classNames={styles}
            >
              <Carousel.Slide
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1em",
                  width: "80px",
                  justifyContent: "center",
                }}
              >
                <div className={styles.holder}>
                  <Skeleton height={150} mt={20} width={100} />
                  <div className={styles.titleDiv}>
                    <p className={styles.title}>Monopoly</p>
                  </div>
                </div>
                <div className={styles.holder}>
                  <Skeleton height={150} mt={20} width={100} />
                  <div className={styles.titleDiv}>
                    <p className={styles.title}>Monopoly</p>
                  </div>
                </div>
                <div className={styles.holder}>
                  <Skeleton height={150} mt={20} width={100} />
                  <div className={styles.titleDiv}>
                    <p className={styles.title}>Monopoly</p>
                  </div>
                </div>
                <div className={styles.holder}>
                  <Skeleton height={150} mt={20} width={100} />
                  <div className={styles.titleDiv}>
                    <p className={styles.title}>Monopoly</p>
                  </div>
                </div>
              </Carousel.Slide>
              <Carousel.Slide
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1em",
                  width: "80px",
                  justifyContent: "center",
                }}
              >
                <div className={styles.holder}>
                  <Skeleton height={150} mt={20} width={100} />
                  <div className={styles.titleDiv}>
                    <p className={styles.title}>Monopoly</p>
                  </div>
                </div>
                <div className={styles.holder}>
                  <Skeleton height={150} mt={20} width={100} />
                  <div className={styles.titleDiv}>
                    <p className={styles.title}>Monopoly</p>
                  </div>
                </div>
              </Carousel.Slide>
              <Carousel.Slide
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1em",
                  width: "80px",
                  justifyContent: "center",
                }}
              >
                <div className={styles.holder}>
                  <Skeleton height={150} mt={20} width={100} />
                  <div className={styles.titleDiv}>
                    <p className={styles.title}>Monopoly</p>
                  </div>
                </div>
                <div className={styles.holder}>
                  <Skeleton height={150} mt={20} width={100} />
                  <div className={styles.titleDiv}>
                    <p className={styles.title}>Monopoly</p>
                  </div>
                </div>
                <div className={styles.holder}>
                  <Skeleton height={150} mt={20} width={100} />
                  <div className={styles.titleDiv}>
                    <p className={styles.title}>Monopoly</p>
                  </div>
                </div>
                <div className={styles.holder}>
                  <Skeleton height={150} mt={20} width={100} />
                  <div className={styles.titleDiv}>
                    <p className={styles.title}>Monopoly</p>
                  </div>
                </div>
              </Carousel.Slide>
            </Carousel>
          </Container>
        </Container>
        <Container size="responsive" style={{ width: "1160px" }}>
          <Button
            fullWidth
            style={{ backgroundColor: "#8d1038", borderRadius: "10px" }}
            className={styles.button}
          >
            Visit UST Miguel Benavides Library Website
          </Button>
        </Container>
      </Center>
    </MantineProvider>
  );
};

export default page;
