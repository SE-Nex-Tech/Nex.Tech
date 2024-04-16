"use client";

import Header from "@/_components/header/Header";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { usePathname } from "next/navigation";
import styles from "./landing.module.scss";
import "@mantine/carousel/styles.css";
import { IconCircleArrowRightFilled } from "@tabler/icons-react";

import { Center, Skeleton, Modal, Button } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";

const page = () => {
  const current = usePathname();

  const autoplay1 = useRef(Autoplay({ delay: 2000 }));
  const autoplay2 = useRef(Autoplay({ delay: 2000 }));

  const [latestBook, setLatestBook] = useState({});
  const [latestGames, setLatestGames] = useState({});

  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1105) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchLatestBooks = async () => {
      try {
        const response = await fetch("/api/books");
        if (!response.ok) {
          console.log("Error fetching latest books");
        }
        const books = await response.json();
        const sortedBooks = books.sort((a, b) => b.id - a.id);
        const latestBook = sortedBooks.slice(0, 6);
        setLatestBook(latestBook);
        console.log(latestBook);
      } catch (error) {
        console.log("Error fetching latest books");
      }
    };
    fetchLatestBooks();

    const fetchLatestGames = async () => {
      try {
        const response = await fetch("/api/games");
        if (!response.ok) {
          console.log("Error fetching latest games");
        }
        const games = await response.json();
        const sortedGames = games.sort((a, b) => b.id - a.id);
        const latestGames = sortedGames.slice(0, 6);
        setLatestGames(latestGames);
        console.log(latestGames);
      } catch (error) {
        console.log("Error fetching latest games");
      }
    };
    fetchLatestGames();
  }, []);

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      {showHeader && (
        <div>
          <Header currentRoute={current} />
        </div>
      )}

      <Center
        maw="100%"
        h="80%"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5em",
        }}
      >
        <div className={styles.first_row}>
          <div className={styles.first_carousel}>
            <h3 className={styles.legend}>Latest Books</h3>
            <Carousel
              withIndicators
              withControls={false}
              height={250}
              width="80%"
              plugins={[autoplay1.current]}
              onMouseEnter={autoplay1.current.stop}
              onMouseLeave={autoplay1.current.reset}
              classNames={styles}
            >
              {[...Array(3)].map((_, index) => (
                <Carousel.Slide
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "1em",
                    width: "80px",
                    justifyContent: "center",
                  }}
                >
                  {[...Array(2)].map((_, innerIndex) => {
                    const bookIndex = index * 2 + innerIndex;
                    const book = latestBook[bookIndex];
                    return book ? (
                      <div key={book.id} className={styles.holder}>
                        <Link href={`/books/${book.id}`}>
                          <Image
                            src={book.image}
                            alt={book.title}
                            height={150}
                            width={100}
                            className={styles.image}
                          />

                          <div className={styles.titleDiv}>
                            <p className={styles.title}>{book.title}</p>
                          </div>
                        </Link>
                      </div>
                    ) : (
                      <div
                        key={`skeleton-${innerIndex}`}
                        className={styles.holder}
                      >
                        <Skeleton height={150} mt={20} width={100} />
                        <div className={styles.titleDiv}>
                          <p className={styles.title}>Loading...</p>
                        </div>
                      </div>
                    );
                  })}
                </Carousel.Slide>
              ))}
            </Carousel>
          </div>
          <div className={styles.second_carousel}>
            <h3 className={styles.legend}>Latest Games</h3>
            <Carousel
              withIndicators
              withControls={false}
              height={250}
              width="80%"
              plugins={[autoplay2.current]}
              onMouseEnter={autoplay2.current.stop}
              onMouseLeave={autoplay2.current.reset}
              classNames={styles}
            >
              {[...Array(3)].map((_, index) => (
                <Carousel.Slide
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "1em",
                    width: "80px",
                    justifyContent: "center",
                  }}
                >
                  {[...Array(2)].map((_, innerIndex) => {
                    const gamesIndex = index * 2 + innerIndex;
                    const game = latestGames[gamesIndex];
                    return game ? (
                      <div key={game.id} className={styles.holder}>
                        <Link href={`/games/${game.id}`}>
                          <Image
                            src={game.image}
                            alt={game.title}
                            height={150}
                            width={100}
                            className={styles.image}
                          />
                          <div className={styles.titleDiv}>
                            <p className={styles.title}>{game.title}</p>
                          </div>
                        </Link>
                      </div>
                    ) : (
                      <div
                        key={`skeleton-${innerIndex}`}
                        className={styles.holder}
                      >
                        <Skeleton height={150} mt={20} width={100} />
                        <div className={styles.titleDiv}>
                          <p className={styles.title}>Loading...</p>
                        </div>
                      </div>
                    );
                  })}
                </Carousel.Slide>
              ))}
            </Carousel>
          </div>

          <div className={styles.navigators}>
            <Link href="/books">
              <div className={styles.browseBooks}>
                <h1>Browse Books</h1>
                <IconCircleArrowRightFilled width={16} height={16} />
              </div>
            </Link>

            <Link href="/games">
              <div className={styles.browseGames}>
                <h1>Browse Board Games</h1>
                <IconCircleArrowRightFilled width={16} height={16} />
              </div>
            </Link>
            <div className={styles.reserve} onClick={open}>
              <h1>How to Reserve or Borrow</h1>
              <IconCircleArrowRightFilled width={16} height={16} />
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
          </div>
        </div>
        <Button
          component={Link}
          href="https://library.ust.edu.ph/"
          variant="filled"
          color="#e8b031"
          radius="xl"
          miw="50%"
          mih={30}
        >
          UST Miguel de Benavides Library
        </Button>
      </Center>
    </>
  );
};

export default page;
