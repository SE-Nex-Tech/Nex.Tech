import React from "react";
import styles from "./pagination.module.scss";
import { Button } from "@mantine/core";
import {
  IconChevronLeftPipe,
  IconChevronRightPipe,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react";

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
      <div className={styles.pagination}>
        <li
          onClick={() => paginate(1)}
          className={`${styles.page_item} ${
            currentPage === 1 ? styles.current_page : ""
          }`}
        >
          <IconChevronLeftPipe
            onClick={() => paginate(1)}
            className={styles.pagelink}
          />
        </li>
        {pageNumbers.map((number) => (
          <li
            onClick={() => paginate(number)}
            key={number}
            className={`${styles.page_item} ${
              currentPage === number ? styles.current_page : ""
            }`}
          >
            <Button
              variant="filled"
              color="#e8b031"
              radius="xl"
              onClick={() => paginate(number)}
              className="pagelink"
            >
              {number}
            </Button>
          </li>
        ))}
        <li
          onClick={() => paginate(totalPages)}
          className={`${styles.page_item} ${
            currentPage === totalPages ? styles.current_page : ""
          }`}
        >
          <IconChevronRightPipe
            onClick={() => paginate(totalPages)}
            className={styles.pagelink}
          />
        </li>
      </div>
    </nav>
  );
};

export default Pagination;
