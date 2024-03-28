import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Center, Loader } from "@mantine/core";
import styles from "./booksmobile.module.scss";
import BookCover from "@/images/bookcover.jpg";
import Link from "next/link";
const BooksMobile = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("/api/books");
      const data = await response.json();
      setData(data);
      setLoading(false);
    };

    fetchBooks();
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

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // Group books by starting letter
  const groupedBooks = alphabet.split("").map((letter) => ({
    letter,
    books: data.filter((book) => book.title.startsWith(letter)),
  }));

  return (
    <>
      <div className={styles.container}>
        {groupedBooks.map((group) => (
          <div key={group.letter} className={styles.alphabet}>
            <div className={styles.header}>
              <h1>{group.letter}</h1>
            </div>

            {group.books.map((book) => (
              <Link href={`/books/${book.id}`} className={styles.container}>
                <div key={book.id} className={styles.book}>
                  <div className={styles.row_one}>
                    <h1>{book.title}</h1>
                    <p>{book.barcode}</p>
                  </div>
                  <div className={styles.row_two}>
                    <p>{book.author}</p>
                  </div>
                  <div className={styles.row_three}>
                    <p>{book.status}</p>
                    <p>#{book.id}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default BooksMobile;
