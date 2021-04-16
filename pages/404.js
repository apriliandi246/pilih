import Link from "next/link";
import Head from "next/head";
import styles from "../styles/not-found.module.css";

export default function Custom404() {
   return (
      <>
         <Head>
            <title>Pilih | 404</title>
         </Head>

         <div className={styles.container}>
            <h1 className={styles.title}>404 Page Not Found</h1>

            <Link href="/">
               <a className={styles.home}>Home</a>
            </Link>
         </div>
      </>
   );
}
