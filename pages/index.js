import Head from "next/head";
import { useState } from "react";
import Alert from "../components/Alert";
import VoteForm from "../components/VoteForm";
import VoteInputId from "../components/VoteInputId";
import styles from "../styles/home.module.css";

export default function Home() {
   const [statusVoteForm, setStatusVoteForm] = useState(false);
   const [statusInputId, setStatusInputId] = useState(false);

   function onClickButton(typeForm) {
      if (typeForm === "signin") {
         if (statusVoteForm === true) {
            setStatusVoteForm(false);
         } else {
            setStatusVoteForm(true);
            setStatusInputId(false);
         }
      }

      if (typeForm === "vote") {
         if (statusInputId === true) {
            setStatusInputId(false);
         } else {
            setStatusVoteForm(false);
            setStatusInputId(true);
         }
      }
   }

   return (
      <>
         <Head>
            <title>Home</title>
         </Head>

         <div className={styles.container}>
            <div className={styles.header}>
               <h1 className={styles.title}>PILIH</h1>

               <div className={styles.auth}>
                  <button onClick={() => onClickButton("signin")}>
                     Create vote
                  </button>
                  <button onClick={() => onClickButton("vote")}>
                     Join vote
                  </button>
               </div>
            </div>

            {statusVoteForm === true && <VoteForm />}
            {statusInputId === true && <VoteInputId />}

            <div className={styles.about}>
               <h1 className={styles.about_title}>
                  🤔 What the hell is this ??
               </h1>

               <div
                  className={`${styles.about_sectionOne} ${styles.about_section}`}
               >
                  <h1>🤝</h1>
                  <p>
                     Just web app to make a vote that you can use with your
                     friend
                  </p>
               </div>

               <div
                  className={`${styles.about_sectionTwo} ${styles.about_section}`}
               >
                  <h1>👌</h1>
                  <p>Easy to use that's mean you just sign in</p>
               </div>

               <div
                  className={`${styles.about_sectionThree} ${styles.about_section}`}
               >
                  <h1>🔐</h1>
                  <p>
                     If you want to voting, you should have unique id from who
                     make the vote
                  </p>
               </div>

               <div
                  className={`${styles.about_sectionFour} ${styles.about_section}`}
               >
                  <h1>👀</h1>
                  <p>Don't worry, I dont steal your data</p>
               </div>
            </div>

            <footer className={styles.footer}>
               <p>Built with 💚 with Next.Js</p>

               <a
                  href="https://twitter.com/calon_jenazah__"
                  target="_blank"
                  rel="noopener"
               >
                  Twitter
               </a>
            </footer>
         </div>
      </>
   );
}
