"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/_components/header/Header";
import { Center, Skeleton } from "@mantine/core";
import styles from "./bookpage.module.scss";
import Link from "next/link";
import { IconChevronLeft } from "@tabler/icons-react";

const BookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`/api/books`);
        const data = await response.json();
        const selectedBook = data.find((book) => book.id === parseInt(id));
        setBook(selectedBook);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <>
      <div>
        <Header currentRoute={"/books"} />
      </div>
      <Center className={styles.center} maw="100%" m={25} h="81.5%">
        <Link href={"/books"} className={styles.navigator}>
          <IconChevronLeft size={32} />
          Go Back{" "}
        </Link>
        <div className={styles.main_container}>
          <div className={styles.row_one}>
            <div className={styles.main_information}>
              <Skeleton className={styles.img_holder}></Skeleton>
              <p>Call No.: QA76.73.J38 .H788j 2022</p>
              <h1>{book.title}</h1>
              <p>
                <span style={{ fontWeight: "bold" }}>Author:</span>{" "}
                {book.author}
              </p>
            </div>
            <div className={styles.information}>
              <div className={styles.information_text}>
                <div className={styles.headers}>
                  <h4>Accession No.: </h4>
                  <h4>Edition:</h4>
                  <h4>Publication Place:</h4>
                  <h4>Publisher:</h4>
                  <h4>Copyright Date:</h4>
                  <h4>Status:</h4>
                </div>
                <div className={styles.contents}>
                  <p>20152831231</p>
                  <p>11th Edition</p>
                  <p>New York City</p>
                  <p>AI Publishing Inc.</p>
                  <p>06/13/2016</p>
                  <p>Available</p>
                </div>
              </div>
              <button className={styles.btn}>Borrow</button>
            </div>
          </div>

          <div className={styles.row_two}></div>
        </div>
      </Center>
    </>
  );
};

export default BookPage;
