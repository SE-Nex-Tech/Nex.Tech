"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div>
      <h1>{book.book_title}</h1>
      <p>{book.book_author}</p>
      <p>{book.book_publisher}</p>
    </div>
  );
};

export default BookPage;
