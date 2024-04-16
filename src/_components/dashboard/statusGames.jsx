import React from "react";
import styles from "./status.module.scss";
import Image from "next/image";
import cover from "@/images/bookcover.jpg";
import { Skeleton } from "@mantine/core";
import placeholderImg from "@/images/placeholder.jpg"

const StatusGames = ({ title, publisher, status, image }) => {
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
            {!image && (<Image
              src={placeholderImg}
              width={110} height={140}
              className={styles.img_holder}
              alt="Item No Image"
            />)}
            {image && (<div className={styles.img_container}><Image className={styles.image} src={image} width={110} height={140} alt="" /></div>)}
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
