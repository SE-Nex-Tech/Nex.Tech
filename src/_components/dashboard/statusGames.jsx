import React from "react";
import styles from "./status.module.scss";
import Image from "next/image";
import cover from "@/images/bookcover.jpg";
import { Skeleton} from "@mantine/core";

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
          {!image && (<Skeleton className={styles.img_holder}></Skeleton>)}
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
