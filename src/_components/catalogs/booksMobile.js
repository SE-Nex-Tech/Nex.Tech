import React, { useState, useEffect } from "react";

const BooksMobile = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("/api/books");
      const data = await response.json();
      setData(data);
      setLoading(false);
    };

    fetchBooks();
  }, []);
  return <>TEST</>;
};

export default BooksMobile;
