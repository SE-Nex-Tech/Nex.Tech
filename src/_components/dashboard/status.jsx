import React from "react";
import styles from "./status.module.scss";
import Image from "next/image";
import cover from "@/images/bookcover.jpg";

const Status = ({ title, author, genre, status, imagepath }) => {
  return (
    <table className={styles.main_table}>
      <tr>
        <th>Image</th>
        <th>Title</th>
        <th>Author</th>
        <th>Genre</th>
        <th>Status</th>
      </tr>
      <tr>
        <td>
          <div className={styles.cover_holder}>
            <Image src={cover} className={styles.cover} />
          </div>
        </td>
        <td>{title}</td>
        <td>{author}</td>
        <td>{genre}</td>
        <td>{status}</td>
      </tr>
    </table>
  );
};

export default Status;
