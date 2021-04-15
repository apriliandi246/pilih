import Head from "next/head";
import Link from "next/link";
import styles from "../styles/usage.module.css";

export default function Usage() {
   return (
      <>
         <Head>
            <title>Pilih | Usage</title>
         </Head>

         <div className={styles.home}>
            <Link href="/">
               <a className={styles.home__link}>
                  <svg
                     width="26px"
                     height="26px"
                     fill="#000000"
                     viewBox="0 0 24 24"
                     style={{ marginRight: "10px" }}
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path d="M0 0h24v24H0z" fill="none" />
                     <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                  Home
               </a>
            </Link>
         </div>

         <div className={styles.container}>
            <div className={styles.header}>
               <svg
                  width="30px"
                  height="30px"
                  fill="#000000"
                  viewBox="0 0 24 24"
                  style={{ marginRight: "10px" }}
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
               </svg>

               <h1>Usage</h1>
            </div>

            <div className={styles.explanation_section}>
               <h1 className={styles.explanation_section__title}>
                  <span style={{ marginRight: "10px" }}>📌</span> About create a
                  voting
               </h1>

               <div className={styles.explanation_section__desc}>
                  It's easy to create a voting and playing with your friend.{" "}
                  Just click{" "}
                  <span className={styles.highlight}>create voting button</span>{" "}
                  on the top and you will see form for making a voting.
               </div>

               <ul className={styles.explanation_section__lists}>
                  <li>
                     In the first input you have to fill your name or who is
                     make the voting
                  </li>

                  <li>
                     Next input is{" "}
                     <span className={styles.highlight}>
                        title for your voting
                     </span>
                     . For example{" "}
                     <span className={styles.highlight}>
                        Pizza or Burger ????
                     </span>
                  </li>

                  <li>
                     The third input is{" "}
                     <span className={styles.highlight}>maximum votes</span>.
                     For example, if you set 10 and if one of subject has 10
                     votes, user can't give a vote anymore for one of subject.
                  </li>

                  <li>
                     <span className={styles.highlight}>
                        The fourth and fifth input is subject one and subject
                        two
                     </span>
                     . For example in the previous example (Pizza or Burger),
                     you set one of the subject. For example,{" "}
                     <span className={styles.highlight}>
                        subject one is pizza{" "}
                     </span>
                     and{" "}
                     <span className={styles.highlight}>
                        subject two is burger
                     </span>
                  </li>

                  <li>
                     And the last fu*king input is{" "}
                     <span className={styles.highlight}>
                        details description of your voting
                     </span>
                     . For example in the previous example,{" "}
                     <span className={styles.highlight}>
                        What you prever, Pizza or Burger ????
                     </span>
                  </li>
               </ul>
            </div>

            <div className={styles.explanation_section}>
               <h1 className={styles.explanation_section__title}>
                  <span style={{ marginRight: "10px" }}>📌</span> About join a
                  voting
               </h1>

               <div
                  className={styles.explanation_section__desc}
                  style={{ marginBottom: "0" }}
               >
                  After you create a voting in previous form, you will get{" "}
                  <span className={styles.highlight}>unique voting ID</span>. It
                  will become your or another user (if you give to another user
                  that you want) key to join that voting and make a fu*king vote
                  to one of subject.
               </div>
            </div>
         </div>
      </>
   );
}
