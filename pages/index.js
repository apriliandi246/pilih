import Head from "next/head";
import { useEffect, useState } from "react";
import VoteForm from "../components/VoteForm";
import VoteInputId from "../components/VoteInputId";
import styles from "../styles/home.module.css";

export default function Home() {
   const [isSubmit, setIsSubmit] = useState(false);
   const [statusInputId, setStatusInputId] = useState(false);
   const [statusVoteForm, setStatusVoteForm] = useState(false);

   useEffect(() => {
      async function getIdentity() {
         try {
            const res = await fetch("http://api.ipify.org/?format=json");
            const result = await res.json();
            localStorage.setItem("user", result.ip);
         } catch (err) {
            throw new Error(err.message);
         }
      }

      if (localStorage.getItem("user") === null) {
         getIdentity();
      }
   }, []);

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
            <title>Pilih | Home</title>
         </Head>

         <div className={styles.container}>
            <div className={styles.header}>
               <h1 className={styles.title}>PILIH</h1>

               <div className={styles.auth}>
                  <button
                     disabled={isSubmit === true}
                     onClick={() => onClickButton("signin")}
                  >
                     Create voting
                  </button>
                  <button
                     disabled={isSubmit === true}
                     onClick={() => onClickButton("vote")}
                  >
                     Join voting
                  </button>
               </div>
            </div>

            {statusVoteForm === true && (
               <VoteForm isSubmit={isSubmit} onSubmit={setIsSubmit} />
            )}

            {statusInputId === true && (
               <VoteInputId isSubmit={isSubmit} onSubmit={setIsSubmit} />
            )}

            <div className={styles.about}>
               <h1 className={styles.about_title}>
                  🤔 What the hell is this ??
               </h1>

               <div
                  className={`${styles.about_sectionOne} ${styles.about_section}`}
               >
                  <h1>🤝</h1>
                  <p>
                     Just web app to create voting and plaing with your friends
                  </p>
               </div>

               <div className={styles.about_section}>
                  <h1>👌</h1>
                  <p>Easy to use and you dont have to create an account</p>
               </div>

               <div className={styles.about_section}>
                  <h1>🔐</h1>
                  <p>
                     If you want make a voting you should have unique voting ID
                     from who create the voting
                  </p>
               </div>

               <div className={styles.about_section}>
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
