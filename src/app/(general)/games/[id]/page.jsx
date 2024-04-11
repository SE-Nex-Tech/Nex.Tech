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

const GamePage = () => {
  const { id } = useParams();
  const [game, setGame] = useState([]);
  const [loading, setLoading] = useState(true);
  var copyright_date = "";

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`/api/games`);
        const data = await response.json();
        const selectedGame = data.find((game) => game.id === parseInt(id));
        setGame(selectedGame);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching game:", error);
      }
    };

    fetchGame();
  }, [id]);

  if (!game) {
    return <div>Game not found</div>;
  }

  if (game.copyright_date) {
    copyright_date = format(Date.parse(game.copyright_date), "MM/dd/yyyy");
  }

  return (
    <>
      <div>
        <Header currentRoute={"/games"} />
      </div>
      <Center className={styles.center} maw="100%" m={25} h="81.5%">
        <Navigator buttonText={"Go Back"} showIcon disableLink={false} />
        <div className={styles.main_container}>
          <div className={styles.row_one}>
            <div className={styles.main_information}>
            {!game.image && (<Skeleton className={styles.img_holder}></Skeleton>)}
            {game.image && (<div className={styles.img_container}><Image className={styles.image} src={game.image} width={110} height={140} alt="" /></div>)}
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

                  {game.accession_num && (<p>{game.accession_num}</p>)}
                  {!game.accession_num && (<p>N/A</p>)}

                  {game.copyright_date && (<p>{(new Date(game.copyright_date)).getFullYear()}</p>)}
                  {!game.copyright_date && (<p>N/A</p>)}

                  {game.status && (<p>{game.status}</p>)}
                  {!game.status && (<p>N/A</p>)}

                </div>
              </div>
              <Link href={`/borrowform/${game.id}?type=game`}>
                <button className={styles.btn}>Borrow</button>
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
