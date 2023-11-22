import Image from "next/image";
import styles from "./page.module.scss";
import Dashboard from "./dashboard/page";

export default function Home() {
  return (
    <div className={styles.container}>
      <Dashboard />
    </div>
  );
}
