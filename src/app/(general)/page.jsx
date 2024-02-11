import Image from "next/image";
import styles from "./page.module.scss";
import Dashboard from "./dashboard/page";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className={styles.container}>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos velit
      placeat rem beatae dolores nisi eveniet sapiente quae, fugit modi,
      veritatis odio quidem, obcaecati temporibus facilis quisquam. Ut,
      accusamus dolore!
    </div>
  );
}
