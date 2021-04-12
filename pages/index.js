import Head from "next/head";
import { useState } from "react";
import VoteForm from "../components/VoteForm";
import styles from "../styles/home.module.css";
import VoteInputId from "../components/VoteInputId";

export default function Home() {
   const [isSubmit, setIsSubmit] = useState(false);
   const [statusInputId, setStatusInputId] = useState(false);
   const [statusVoteForm, setStatusVoteForm] = useState(false);

   function chooseForm(typeForm) {
      if (typeForm === "create") {
         if (statusVoteForm === true) {
            setStatusVoteForm(false);
         }

         if (statusVoteForm === false) {
            setStatusVoteForm(true);
            setStatusInputId(false);
         }
      }

      if (typeForm === "join") {
         if (statusInputId === true) {
            setStatusInputId(false);
         }

         if (statusInputId === false) {
            setStatusVoteForm(false);
            setStatusInputId(true);
         }
      }
   }

   return (
      <>
         <Head>
            <title>📢 Pilih</title>
         </Head>

         <div className={styles.container}>
            <div className={styles.header}>
               <h1 className={styles.header__title}>
                  <span className={styles.header__emoji}>📢</span> PILIH
               </h1>

               <div className={styles.header_buttons}>
                  <button
                     disabled={isSubmit === true}
                     onClick={() => chooseForm("create")}
                     className={styles.header_button__create}
                     style={{
                        cursor: isSubmit === true ? "default" : "pointer",
                     }}
                  >
                     Create voting
                  </button>

                  <button
                     disabled={isSubmit === true}
                     onClick={() => chooseForm("join")}
                     className={styles.header_button__join}
                     style={{
                        cursor: isSubmit === true ? "default" : "pointer",
                     }}
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
               <h1 className={styles.about__title}>
                  🤔 What the hell is this ??
               </h1>

               <div className={styles.about__section}>
                  <h1 className={styles.about__sub_title}>😀 😁</h1>
                  <p className={styles.about__sub_desc}>
                     Just web app to create voting and plaing with your friends
                  </p>
               </div>

               <div className={styles.about__section}>
                  <h1 className={styles.about__sub_title}>👌</h1>
                  <p className={styles.about__sub_desc}>
                     Easy to use and you dont have to create an account
                  </p>
               </div>

               <div className={styles.about__section}>
                  <h1 className={styles.about__sub_title}>🔐</h1>
                  <p className={styles.about__sub_desc}>
                     If you want make a voting you should have unique voting ID
                     from who create the voting
                  </p>
               </div>

               <div className={styles.about__section}>
                  <h1 className={styles.about__sub_title}>👀</h1>
                  <p className={styles.about__sub_desc}>
                     Don't worry, I dont steal your data
                  </p>
               </div>
            </div>

            <footer className={styles.footer}>
               <p className={styles.footer__desc}>Built with 💚 with Next.Js</p>

               <a
                  rel="noopener"
                  target="_blank"
                  className={styles.footer__link}
                  href="https://twitter.com/calon_jenazah__"
               >
                  Twitter
               </a>
            </footer>
         </div>
      </>
   );
}
