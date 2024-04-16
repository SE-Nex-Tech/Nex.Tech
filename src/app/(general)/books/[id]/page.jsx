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
import Image from "next/image";

const BookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const [queued, setQueued] = useState(false)

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`/api/books`);
        const data = await response.json();
        const selectedBook = data.find((book) => book.id === parseInt(id));
        setBook(selectedBook);
        setLoading(false);

        const res = await fetch('/api/queue', {
          method: 'POST',
          body: JSON.stringify({
            id: parseInt(id)
          })
        })
        const d = await res.json()
        setQueued(d.bq.length > 0 ? true : false)
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
        <Navigator buttonText={"Go Back"} showIcon disableLink={false} link={"books"} />
        <div className={styles.main_container}>
          <div className={styles.row_one}>
            <div className={styles.main_information}>
              {!book.image && (<Skeleton className={styles.img_holder}></Skeleton>)}
              {book.image && (<div className={styles.img_container}><Image className={styles.image} src={book.image} width={110} height={140} alt="" /></div>)}
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
                  <h4>Publisher:</h4>
                  <h4>Copyright Year:</h4>
                  <h4>Status:</h4>
                </div>
                <div className={styles.contents}>
                  {book.accession_num && (<p>{book.accession_num}</p>)}
                  {!book.accession_num && (<p>N/A</p>)}

                  {book.edition && ( <p>{book.edition}</p>)}
                  {!book.edition && (<p>N/A</p>)}

                 

                  {book.publisher && ( <p>{book.publisher}</p>)}
                  {!book.publisher && (<p>N/A</p>)}

                  {book.copyright_date && ( <p>{book.copyright_date}</p>)}
                  {!book.copyright_date && (<p>N/A</p>)}

                  {book.status && ( <p>{book.status}</p>)}
                  {!book.status && (<p>N/A</p>)}
                </div>
              </div>
              <Link href={`/borrowform/${book.id}?type=book`}>
                <button className={styles.btn}>{queued ? "Reserve (Wait in queue)" : "Borrow"}</button>
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
