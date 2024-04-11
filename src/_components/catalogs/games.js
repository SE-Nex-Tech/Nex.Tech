import { fetchData } from "next-auth/client/_utils";
import React, { useState, useEffect } from "react";
import Pagination from "../pagination/pagination";
import styles from "./games.module.scss";
import { Skeleton, Loader, Input } from "@mantine/core";
import Link from "next/link";
import { IconSearch } from "@tabler/icons-react";

const Games = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(10);
  const totalGames = 1000;

  useEffect(() => {
    const fetchGames = async () => {
      const response = await fetch("/api/games");
      const data = await response.json();
      setData(data);
      setLoading(false);
    };

    fetchGames();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setGamesPerPage(5); // Set booksPerPage to 5 for Mobile
      } else if (window.innerWidth <= 1024) {
        setGamesPerPage(8); // Set booksPerPage to 8 for Tablet
      } else {
        setGamesPerPage(10); // Set booksPerPage to 10 for Desktop
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (loading) {
    return (
      <Loader
        color="yellow"
        size="xl"
        cl
        classNames={{ root: styles.loading }}
      />
    );
  }

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = data.slice(indexOfFirstGame, indexOfLastGame);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const searchItems = async (key) => {
    if (key.length == 0) {
      const reset = await fetch("/api/games");

      const result = await reset.json();
      setData(result);
      return;
    }
    const response = await fetch("/api/db", {
      method: "POST",
      body: JSON.stringify({
        entity: "games",
        search: 1,
        dashboard: 1,
        contains: key,
      }),
    });

    const result = await response.json();
    setData(result);
  }

  return (
    <div className={styles.parent_container}>
      <Input
        placeholder="Search"
        leftSection={<IconSearch size={16} />}
        radius="xl"
        w="100%"
        onChange={(event) => searchItems(event.currentTarget.value)}
      />
      <div className={styles.book_container}>
        {currentGames.map((game, index) => (
          <Link href={`/games/${game.id}`} className={styles.container}>
            <div key={game.id}>
              <Skeleton className={styles.img_holder}></Skeleton>
              <h2 className={styles.book_title}>{game.title}</h2>
              <p className={styles.book_author}>{game.accession_number}</p>
              <p className={styles.book_status}>{game.publisher}</p>
            </div>
          </Link>
        ))}
      </div>

      <Pagination
        booksPerPage={gamesPerPage}
        totalBooks={totalGames}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default Games;
