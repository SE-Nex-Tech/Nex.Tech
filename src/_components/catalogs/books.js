import { fetchData } from "next-auth/client/_utils";
import React, { useState, useEffect } from "react";
import Pagination from "../pagination/pagination";
import styles from "./books.module.scss";
import { Skeleton, Loader } from "@mantine/core";
import Link from "next/link";

const Books = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 12;
  const totalBooks = 1000;

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

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = data.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.parent_container}>
      <div className={styles.book_container}>
        {currentBooks.map((book, index) => (
          <Link href={`/books/${book.id}`} className={styles.container}>
            <div key={book.id}>
              <Skeleton className={styles.img_holder}></Skeleton>
              <h2 className={styles.book_title}>{book.title}</h2>
              <p className={styles.book_author}>{book.author}</p>
            </div>
          </Link>
        ))}
      </div>

      <Pagination
        booksPerPage={booksPerPage}
        totalBooks={totalBooks}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default Books;
