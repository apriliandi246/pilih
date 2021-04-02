import Head from "next/head";
import { useState } from "react";
import SignInForm from "../components/SignInForm";
import LogInForm from "../components/LogInForm";
import VoteInput from "../components/VoteInput";
import styles from "../styles/home.module.css";

export default function Home() {
   const [statusLogInForm, setStatusLogInForm] = useState(false);
   const [statusSignInForm, setStatusSignInForm] = useState(false);
   const [statusVoteInputForm, setStatusVoteInputInForm] = useState(false);

   function onClickButton(form) {
      if (form === "signin") {
         if (statusSignInForm === true) {
            setStatusSignInForm(false);
         } else {
            setStatusSignInForm(true);
            setStatusLogInForm(false);
            setStatusVoteInputInForm(false);
         }
      }

      if (form === "login") {
         if (statusLogInForm === true) {
            setStatusLogInForm(false);
         } else {
            setStatusLogInForm(true);
            setStatusSignInForm(false);
            setStatusVoteInputInForm(false);
         }
      }

      if (form === "vote") {
         if (statusVoteInputForm === true) {
            setStatusVoteInputInForm(false);
         } else {
            setStatusLogInForm(false);
            setStatusSignInForm(false);
            setStatusVoteInputInForm(true);
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
               <h2 className={styles.emoji}>☝️</h2>

               <div className={styles.auth}>
                  <button onClick={() => onClickButton("signin")}>
                     Sign In
                  </button>
                  <button onClick={() => onClickButton("login")}>Log In</button>
                  <button onClick={() => onClickButton("vote")}>
                     Join vote
                  </button>
               </div>
            </div>

            {statusSignInForm === true && <SignInForm />}
            {statusLogInForm === true && <LogInForm />}
            {statusVoteInputForm === true && <VoteInput />}

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
                     If you want to voting, you should have unique random id
                     from who make the vote
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
               <p>Built with 💚, with Next.Js</p>

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
