"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/_components/header/Header";
import { Center, Skeleton } from "@mantine/core";
import styles from "./gamepage.module.scss";
import Link from "next/link";
import { IconChevronLeft } from "@tabler/icons-react";
import { format } from "date-fns";
import Navigator from "@/_components/navigator/navigator";
import Image from "next/image";
import placeholderImg from "@/images/placeholder.jpg";

const GamePage = () => {
  const { id } = useParams();
  const [game, setGame] = useState([]);
  const [loading, setLoading] = useState(true);
  const [queued, setQueued] = useState(false);
  var copyright_date = "";

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`/api/games`);
        const data = await response.json();
        const selectedGame = data.find((game) => game.id === parseInt(id));
        setGame(selectedGame);
        setLoading(false);

        const res = await fetch("/api/queue", {
          method: "POST",
          body: JSON.stringify({
            id: parseInt(id),
          }),
        });
        const d = await res.json();
        setQueued(d.gq.length > 0 ? true : false);
      } catch (error) {
        console.error("Error fetching game:", error);
      }
    };

    fetchGame();
  }, [id]);

  if (!game) {
    return <div>Game not found</div>;
  }

  const [showHeader, setShowHeader] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1105) {
        setIsMobile(true);
        setShowHeader(false);
      } else {
        setIsMobile(false);
        setShowHeader(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div>
        {showHeader && (
          <div>
            <Header currentRoute={"/games"} />
          </div>
        )}
      </div>
      <Center className={styles.center} maw="100%" m={25} h="81.5%">
        <Navigator
          buttonText={"Go Back"}
          showIcon
          disableLink={false}
          link={"games"}
        />
        <div className={styles.main_container}>
          <div className={styles.row_one}>
            <div className={styles.main_information}>
              {!game.image && (
                <Image
                  src={placeholderImg}
                  width={110}
                  height={140}
                  className={styles.img_holder}
                  alt="Item No Image"
                />
              )}
              {game.image && (
                <div className={styles.img_container}>
                  <Image
                    className={styles.image}
                    src={game.image}
                    width={110}
                    height={140}
                    alt=""
                  />
                </div>
              )}
              <p>{game.call_num}</p>
              <h1>{game.title}</h1>
              <p>
                <span style={{ fontWeight: "bold" }}>Publisher:</span>{" "}
                {game.publisher}
              </p>
            </div>
            <div className={styles.information}>
              <div className={styles.information_text}>
                <div className={styles.headers}>
                  <h4>Accession No.: </h4>
                  <h4>Copyright Year:</h4>
                  <h4>Status:</h4>
                </div>
                <div className={styles.contents}>
                  {game.accession_num && <p>{game.accession_num}</p>}
                  {!game.accession_num && <p>N/A</p>}

                  {game.copyright_date && <p>{game.copyright_date}</p>}
                  {!game.copyright_date && <p>N/A</p>}

                  {game.status && <p>{game.status}</p>}
                  {!game.status && <p>N/A</p>}
                </div>
              </div>
              <Link href={`/borrowform/${game.id}?type=game`}>
                <button className={styles.btn}>
                  {game.status === "Unavailable"
                    ? "Reserve (Wait in queue)"
                    : "Borrow"}
                </button>
              </Link>
            </div>
          </div>

          <div className={styles.row_two}></div>
        </div>
      </Center>
    </>
  );
};

export default GamePage;
