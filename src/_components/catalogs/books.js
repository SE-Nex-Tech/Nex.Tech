import { fetchData } from "next-auth/client/_utils";
import React, { useState, useEffect } from "react";
import Pagination from "../pagination/pagination";
import styles from "./books.module.scss";
import { Skeleton, Loader, Input, rem } from "@mantine/core";
import Link from "next/link";
import { IconSearch } from "@tabler/icons-react";
import Image from "next/image";

const Books = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(10);
  const totalBooks = Object.keys(data).length;

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("/api/books");
      const data = await response.json();
      console.log(data);
      setData(data);
      setLoading(false);
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setBooksPerPage(5); // Set booksPerPage to 5 for Mobile
      } else if (window.innerWidth <= 1024) {
        setBooksPerPage(8); // Set booksPerPage to 8 for Tablet
      } else {
        setBooksPerPage(10); // Set booksPerPage to 10 for Desktop
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

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = data.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        {currentBooks.map((book, index) => (
          <Link href={`/books/${book.id}`} className={styles.container}>
            <div key={book.id}>
            
            {!book.image && (<Skeleton className={styles.img_holder}></Skeleton>)}
            {book.image && (<Image className={styles.img_container} src={book.image} width={110} height={140} alt="" />)}
              <h2 className={styles.book_title}>{book.title}</h2>
              <p className={styles.book_author}>{book.author}</p>
              <p className={styles.book_status}>{book.status}</p>
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
