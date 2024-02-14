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
  Modal,
} from "@mantine/core";
import { Carousel, Embla } from "@mantine/carousel";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";

const page = () => {
  const current = usePathname();

  const autoplay = useRef(Autoplay({ delay: 2000 }));

  const [opened, { open, close }] = useDisclosure(false);

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
            <Link href="/books">
              <div className={styles.browseBooks}>
                <h1>Browse Books</h1>
                <IconCircleArrowRightFilled />
              </div>
            </Link>

            <Link href="/games">
              <div className={styles.browseGames}>
                <h1>Browse Board Games</h1>
                <IconCircleArrowRightFilled />
              </div>
            </Link>
            <div className={styles.reserve} onClick={open}>
              <h1>How to Reserve or Borrow</h1>
              <IconCircleArrowRightFilled />
            </div>

            <Modal
              opened={opened}
              onClose={close}
              centered
              size="lg"
              title={
                <h2 style={{ fontWeight: "bold" }}>How to Borrow / Reserve?</h2>
              }
            >
              &nbsp;1.&nbsp;Go to the "Browse Books" or "Browse Board Games" to
              be directed to the Books Catalog or Board Games Catalog <br />{" "}
              &nbsp;2.&nbsp;Search and select any Book or Board Game in their
              respective catalog.
              <br />
              <br /> &nbsp;
              <span style={{ fontWeight: "bold" }}>
                If the item is not currently being used:
              </span>{" "}
              <br />
              &nbsp;1.&nbsp;Click the "Borrow" button to borrow the item.
              <br />
              &nbsp;2.&nbsp;Fill out the Borrow Request form.
              <br />
              &nbsp;3.&nbsp;Wait for the receipt to pop up.
              <br />
              &nbsp;4.&nbsp;Present the QR Code receipt to the librarian so that
              they may authorize your request.
              <br />
              <br />
              <span style={{ fontWeight: "bold" }}>
                If the item is currently being used:
              </span>{" "}
              <br />
              &nbsp;1.&nbsp;Check the reservation queue in the pop-up upon
              clicking on the item you want to borrow.
              <br />
              &nbsp;2.&nbsp;Fill out the Reservation Request Form to continue
              reserving the item for future use.
              <br />
              &nbsp;3.&nbsp;Wait for the Reserve Receipt to pop up.
              <br />
              &nbsp;4.&nbsp;Wait for an email notification stating that the item
              is now available.
              <br />
              &nbsp;5.&nbsp;Present the QR code receipt to the librarian so that
              they may authorize your request.
            </Modal>
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
