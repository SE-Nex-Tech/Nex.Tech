import React from "react";
import styles from "./status.module.scss";
import Image from "next/image";
import cover from "@/images/bookcover.jpg";

const Queuer = ({ title, borrower, email, user_type, imagepath }) => {
  return (
    <table className={styles.main_table}>
      <tr>
        <th>Image</th>
        <th>Title</th>
        <th>Borrower Name</th>
        <th>Email</th>
        <th>User Type</th>
      </tr>
      <tr>
        <td>
          <div className={styles.cover_holder}>
            <Image src={cover} className={styles.cover} />
          </div>
        </td>
        <td>{title}</td>
        <td>{borrower}</td>
        <td>{email}</td>
        <td>{user_type}</td>
      </tr>
    </table>
  );
};

export default Queuer;
