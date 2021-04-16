import Head from "next/head";
import Link from "next/link";
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
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <meta charSet="utf-8" />
            <meta
               name="description"
               content="Web app for making a voting and playing with your fu*king friends"
            />

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta
               property="og:url"
               content="https://pilih.vercel.app"
               key="ogurl"
            />
            <meta property="og:site_name" content="📢 Pilih" key="ogsitename" />
            <meta
               property="og:image"
               content="https://i.ibb.co/LR67Djy/logo.jpg"
               key="ogimage"
            />
            <meta
               property="og:image:secure_url"
               content="https://i.ibb.co/LR67Djy/logo.jpg"
               key="ogimagesecureurl"
            />
            <meta property="og:title" content="📢 Pilih" key="ogtitle" />
            <meta
               property="og:description"
               content="Web app for making a voting and playing with your fu*king friends"
               key="ogdesc"
            />

            {/* twitter open graph */}
            <meta property="twitter:card" content="summary" />
            <meta
               property="twitter:image"
               content="https://i.ibb.co/LR67Djy/logo.jpg"
            />
            <meta property="twitter:site" content="@calon_jenazah__" />
         </Head>

         <div className={styles.container}>
            <div className={styles.header}>
               <h1 className={styles.header__title}>
                  <span style={{ marginRight: "-14px" }}>📢</span> PILIH
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
                     <svg
                        width="26px"
                        height="26px"
                        fill="#00000"
                        viewBox="0 0 24 24"
                        className={styles.icon}
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                     </svg>
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
                     <svg
                        width="26px"
                        height="26px"
                        fill="#00000"
                        viewBox="0 0 24 24"
                        className={styles.icon}
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                     </svg>
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
                     Just web app to create voting and playing with your friends
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
               <a
                  rel="noopener"
                  target="_blank"
                  className={styles.footer__link}
                  href="https://twitter.com/calon_jenazah__"
               >
                  <svg
                     width="25"
                     height="25"
                     fill="#00000"
                     viewBox="0 0 24 24"
                     className={styles.icon}
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                  Twitter
               </a>

               <p className={styles.footer__desc}>Built with 💚 with Next.Js</p>

               <Link href="/usage">
                  <a className={styles.footer__usage}>
                     <svg
                        width="25px"
                        height="25px"
                        fill="#000000"
                        viewBox="0 0 24 24"
                        className={styles.icon}
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
                     </svg>
                     Usage
                  </a>
               </Link>
            </footer>
         </div>
      </>
   );
}
