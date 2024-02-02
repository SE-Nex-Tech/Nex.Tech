"use client";

import React from "react";
import Link from "next/link";
import Header from "@/_components/header/Header";
import { usePathname, useRouter } from "next/navigation";
import { Center } from "@mantine/core";
import styles from "./dashboard.module.scss";

const Dashboard = () => {
  const current = usePathname();

  return (
    <>
      <div>
        <Header currentRoute={current} />
      </div>
      <Center className={styles.center} maw="100%" m={25} h="81.5%">
        <div className={styles.first_row}>
          <div className={styles.borrow_status}>
            <div className={styles.header_borrow}>
              <h1>Borrow Status</h1>{" "}
              <div className={styles.header_actions}>
                <h1>Books</h1>
                <h1>Board Games</h1>
                <h1>Queue</h1>
              </div>
            </div>
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
                  <img src="book_image_url" alt="book title" />
                </td>
                <td>Introduction to Object Oriented Programming</td>
                <td>Santos, Jose A.</td>
                <td>Programming</td>
                <td>
                  <select>
                    <option value="available">Available</option>
                    <option value="unavailable">Unavailable</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <img src="book_image_url" alt="book title" />
                </td>
                <td>Introduction to Object Oriented Programming</td>
                <td>Santos, Jose A.</td>
                <td>Programming</td>
                <td>
                  <select>
                    <option value="available">Available</option>
                    <option value="unavailable">Unavailable</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <img src="book_image_url" alt="book title" />
                </td>
                <td>Introduction to Object Oriented Programming</td>
                <td>Santos, Jose A.</td>
                <td>Programming</td>
                <td>
                  <select>
                    <option value="available">Available</option>
                    <option value="unavailable">Unavailable</option>
                  </select>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className={styles.second_row}>
          <div className={styles.database}>
            <div className={styles.header_database}>Database</div>
          </div>
          <div className={styles.reports}>
            <div className={styles.header_reports}>Reports</div>
          </div>
        </div>
      </Center>
    </>
  );
};

export default Dashboard;
