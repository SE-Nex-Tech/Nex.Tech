import React from "react";
import styles from "./usedtable.module.scss";
import cover from "@/images/bookcover.jpg";
import Image from "next/image";

const UsageTable = () => {
  return (
    <>
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
          <td>Introduction to Object Oriented Programming</td>
          <td>Santos, Jose A.</td>
          <td>Programming</td>
          <td>Available</td>
        </tr>
      </table>
    </>
  );
};

export default UsageTable;
