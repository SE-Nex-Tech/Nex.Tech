import Image from "next/image";
import styles from "./page.module.scss";
import Dashboard from "./dashboard/page";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className={styles.container}>
      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
}
