import React from "react";
import styles from "./pagination.module.scss";

const Pagination = ({ booksPerPage, totalBooks, currentPage, paginate }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalBooks / booksPerPage);

  let startPage = currentPage - 2;
  let endPage = currentPage + 2;

  if (startPage < 1) {
    startPage = 1;
    endPage = Math.min(5, totalPages);
  }

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, totalPages - 4);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={styles.pagination}>
        <li
          onClick={() => paginate(1)}
          className={`${styles.page_item} ${
            currentPage === 1 ? styles.current_page : ""
          }`}
        >
          <a onClick={() => paginate(1)} href="#" className="page-link">
            First
          </a>
        </li>
        {pageNumbers.map((number) => (
          <li
            onClick={() => paginate(number)}
            key={number}
            className={`${styles.page_item} ${
              currentPage === number ? styles.current_page : ""
            }`}
          >
            <a onClick={() => paginate(number)} href="#" className="page-link">
              {number}
            </a>
          </li>
        ))}
        <li
          onClick={() => paginate(totalPages)}
          className={`${styles.page_item} ${
            currentPage === totalPages ? styles.current_page : ""
          }`}
        >
          <a
            onClick={() => paginate(totalPages)}
            href="#"
            className="page-link"
          >
            Last
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
