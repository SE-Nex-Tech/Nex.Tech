"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/_components/header/Header";
import { Center, Skeleton } from "@mantine/core";
import styles from "./bookpage.module.scss";
import Link from "next/link";
import { IconChevronLeft } from "@tabler/icons-react";
import { format } from "date-fns";
import Navigator from "@/_components/navigator/navigator";

const BookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  var copyright_date = "";

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

  if (!book) {
    return <div>Book not found</div>;
  }

  if (book.copyright_date) {
    copyright_date = format(Date.parse(book.copyright_date), "MM/dd/yyyy");
  }

  return (
    <>
      <div>
        {showHeader && (
          <div>
            <Header currentRoute={"/books"} />
          </div>
        )}
      </div>
      <Center className={styles.center} maw="100%" m={25} h="81.5%">
        <Navigator buttonText={"Go Back"} showIcon disableLink={false} />
        <div className={styles.main_container}>
          <div className={styles.row_one}>
            <div className={styles.main_information}>
              <Skeleton className={styles.img_holder}></Skeleton>
              <p>{book.call_num}</p>
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
                  <p>{book.accession_num}</p>
                  <p>{book.edition}</p>
                  <p>{book.publication_place}</p>
                  <p>{book.publisher}</p>
                  <p>{copyright_date}</p>
                  <p>{book.status}</p>
                </div>
              </div>
              <Link href={`/borrowform/${book.id}`}>
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

export default BookPage;
