import React from "react";
import styles from "./status.module.scss";
import Image from "next/image";
import cover from "@/images/bookcover.jpg";

const StatusGames = ({ title, publisher, status, imagepath }) => {
  return (
    <table className={styles.main_table}>
      <tr>
        <th>Image</th>
        <th>Title</th>
        <th>Publisher</th>
        <th>Status</th>
      </tr>
      <tr>
        <td>
          <div className={styles.cover_holder}>
            <Image src={cover} className={styles.cover} />
          </div>
        </td>
        <td>{title}</td>
        <td>{publisher}</td>
        <td>{status}</td>
      </tr>
    </table>
  );
};

export default StatusGames;
