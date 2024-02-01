"use client";

import Header from "@/_components/header/Header";
import React, { useState, useCallback, useEffect } from "react";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { usePathname, useRouter } from "next/navigation";
import cx from "clsx";
import "@mantine/carousel/styles.css";
import { IconCircleArrowRightFilled } from "@tabler/icons-react";
import styles from "./games.module.scss";
import { Center, Skeleton, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";

const page = () => {
  const current = usePathname();
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <div>
        <Header currentRoute={current} />
      </div>
      <Center
        className={styles.center}
        maw="100%"
        m={30}
        h="81.5%"
        bg="var(--mantine-color-gray-light)"
      >
        <div className={styles.main_container}>
          <div className={styles.first_row}>
            <div className={styles.books_carousel}>
              <h1>New Books</h1>
              <Carousel
                withIndicators
                height={250}
                w={300}
                // plugins={[autoplay.current]}
                // onMouseEnter={autoplay.current.stop}
                // onMouseLeave={autoplay.current.reset}
                classNames={styles}
              >
                <Carousel.Slide
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingBottom: "20px",
                  }}
                >
                  <div className={styles.carousel_body}>
                    <div className={styles.book}>
                      <Skeleton height={150} width="80%" />
                      <p>Introduction to Computing</p>
                    </div>

                    <div className={styles.book}>
                      <Skeleton height={150} width="80%" />

                      <p>Introduction to Computing</p>
                    </div>
                  </div>
                </Carousel.Slide>
                <Carousel.Slide
                  w={1}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingBottom: "20px",
                  }}
                >
                  <div className={styles.carousel_body}>
                    <div className={styles.book}>
                      <Skeleton height={150} width="80%" />
                      <p>Introduction to Computing</p>
                    </div>

                    <div className={styles.book}>
                      <Skeleton height={150} width="80%" />

                      <p>Introduction to Computing</p>
                    </div>
                  </div>
                </Carousel.Slide>
                <Carousel.Slide
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingBottom: "20px",
                  }}
                >
                  <div className={styles.carousel_body}>
                    <div className={styles.book}>
                      <Skeleton height={150} width="80%" />
                      <p>Introduction to Computing</p>
                    </div>

                    <div className={styles.book}>
                      <Skeleton height={150} width="80%" />

                      <p>Introduction to Computing</p>
                    </div>
                  </div>
                </Carousel.Slide>
              </Carousel>
            </div>
            <div className={styles.games_carousel}>
              <h1>New Games</h1>
              <Carousel
                withIndicators
                height={250}
                w={300}
                // plugins={[autoplay.current]}
                // onMouseEnter={autoplay.current.stop}
                // onMouseLeave={autoplay.current.reset}
                classNames={styles}
              >
                <Carousel.Slide
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingBottom: "20px",
                  }}
                >
                  <div className={styles.carousel_body}>
                    <div className={styles.book}>
                      <Skeleton height={150} width="80%" />
                      <p>Introduction to Computing</p>
                    </div>

                    <div className={styles.book}>
                      <Skeleton height={150} width="80%" />

                      <p>Introduction to Computing</p>
                    </div>
                  </div>
                </Carousel.Slide>
                <Carousel.Slide
                  w={1}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingBottom: "20px",
                  }}
                >
                  <div className={styles.carousel_body}>
                    <div className={styles.book}>
                      <Skeleton height={150} width="80%" />
                      <p>Introduction to Computing</p>
                    </div>

                    <div className={styles.book}>
                      <Skeleton height={150} width="80%" />

                      <p>Introduction to Computing</p>
                    </div>
                  </div>
                </Carousel.Slide>
                <Carousel.Slide
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingBottom: "20px",
                  }}
                >
                  <div className={styles.carousel_body}>
                    <div className={styles.book}>
                      <Skeleton height={150} width="80%" />
                      <p>Introduction to Computing</p>
                    </div>

                    <div className={styles.book}>
                      <Skeleton height={150} width="80%" />

                      <p>Introduction to Computing</p>
                    </div>
                  </div>
                </Carousel.Slide>
              </Carousel>
            </div>
            <div className={styles.help}>
              <div className={styles.browse_books}>
                <h1>Browse Books</h1>
                <IconCircleArrowRightFilled className={styles.icon} />
              </div>
              <div className={styles.browse_games}>
                <h1>Browse Games</h1>
                <IconCircleArrowRightFilled className={styles.icon} />
              </div>
              <div className={styles.reserve} onClick={open} onClose={close}>
                <h1>How to Reserve or Borrow?</h1>
                <IconCircleArrowRightFilled className={styles.icon} />
              </div>
            </div>
          </div>
          <div className={styles.second_row}>2</div>
          <div className={styles.three_row}>3</div>
        </div>
        <Modal.Root
          opened={opened}
          onClose={close}
          title="Borrow / Reservation"
          centered
          size={800}
        >
          <Modal.Overlay />
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>
                <h1 className={styles.modal_title}>How to Borrow / Reserve?</h1>
              </Modal.Title>
              <Modal.CloseButton />
            </Modal.Header>
            <Modal.Body>
              1. &nbsp;Go to the "Browse Books" or "Browse Board Games" to be
              directed to the Books Catalog or Board Games Catalog. <br />
              2. &nbsp;Search and select any Book or Board Game in their
              respective catalog. <br /> <br />
              <span style={{ fontWeight: "bold" }}>
                If the item is not currently being used:
              </span>
              <br />
              1. &nbsp;Click the "Borrow" button to borrow the item. <br />
              2. &nbsp;Fill out the Borrow Request Form to continue borrowing
              the item. <br />
              3. &nbsp;Wait for the Borrow Receipt to pop up. <br />
              4. &nbsp;Present the QR code receipt to the librarian so that they
              may authorize your request. <br />
              <br />
              <span style={{ fontWeight: "bold" }}>
                If the item is currently being used:
              </span>
              <br />
              1. &nbsp;Check the reservation queue in the pop-up upon clicking
              on the item you want to borrow. <br />
              2. &nbsp;Fill out the Reservation Request Form to continue
              reserving the item for future use. <br />
              3. &nbsp;Wait for the Reserve Receipt to pop up. <br />
              4. &nbsp;Wait for an email notification stating that the item is
              now available. <br />
              5. &nbsp;Present the QR code receipt to the librarian so that they
              may authorize your request.
            </Modal.Body>
          </Modal.Content>
        </Modal.Root>
      </Center>
    </>
  );
};

export default page;
