import Head from "next/head";
import Link from "next/link";
import Time from "../../utils/date";
import fire from "../../config/config";
import { useEffect, useState } from "react";
import scrollTo from "../../utils/scrollTo";
import Spinner from "../../components/Spinner";
import styles from "../../styles/vote.module.css";
import not_found from "../../styles/not-found.module.css";

export default function VotePage({ voteId }) {
   const [vote, setVote] = useState("");
   const [isLoading, setIsLoading] = useState(true);
   const [isUserAllow, setIsUserAllow] = useState(true);
   const [isVoteExist, setIsVoteExist] = useState(true);
   const [percentSubjectOne, setPercentSubjectOne] = useState(0);
   const [percentSubjectTwo, setPercentSubjectTwo] = useState(0);

   useEffect(() => {
      const unsubscribe = fire
         .firestore()
         .collection("votes")
         .doc(voteId.trim())
         .onSnapshot((snap) => {
            const data = snap.data();
            const identity = localStorage.getItem("user");

            if (snap.exists === false) {
               setIsVoteExist(false);
            }

            if (snap.exists === true) {
               setVote(data);

               if (data.peoplesVoted.includes(identity) === true) {
                  setIsUserAllow(false);
               }

               if (data.maxVote > 0) {
                  if (
                     data.totalVotesSubjectOne === data.maxVote ||
                     data.totalVotesSubjectTwo === data.maxVote
                  ) {
                     setIsUserAllow(false);
                  }
               }
            }

            setTimeout(() => {
               setIsLoading(false);
            }, 300);
         });

      return () => {
         unsubscribe();
      };
   }, []);

   useEffect(() => {
      setPercentSubjectOne(
         Math.floor(
            (100 / (vote.totalVotesSubjectOne + vote.totalVotesSubjectTwo)) *
               vote.totalVotesSubjectOne
         ) || 0
      );

      setPercentSubjectTwo(
         Math.floor(
            (100 / (vote.totalVotesSubjectOne + vote.totalVotesSubjectTwo)) *
               vote.totalVotesSubjectTwo
         ) || 0
      );

      if (vote.maxVote > 0) {
         if (
            vote.totalVotesSubjectOne === vote.maxVote ||
            vote.totalVotesSubjectTwo === vote.maxVote
         ) {
            setIsUserAllow(true);
         }
      }
   }, [vote]);

   function votingSubject(subject) {
      fire
         .firestore()
         .collection("votes")
         .doc(voteId.trim())
         .update({
            [subject]: (vote[subject] += 1),
            peoplesVoted: [...vote.peoplesVoted, localStorage.getItem("user")],
         })
         .then(() => {
            setIsUserAllow(false);
         })
         .catch((err) => {
            throw new Error(err.message);
         });
   }

   if (isLoading === true) {
      return <Spinner />;
   }

   return (
      <>
         <Head>
            <title>Pilih | Voting</title>
         </Head>

         {isVoteExist === true && (
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
                     </svg>{" "}
                     Home
                  </a>
               </Link>
            </div>
         )}

         <div className={styles.container}>
            {isVoteExist === false ? (
               <div className={not_found.container}>
                  <h1 className={not_found.title}>Vote Not Found</h1>

                  <Link href="/">
                     <a className={not_found.home}>Home</a>
                  </Link>
               </div>
            ) : (
               <>
                  <h1 className={styles.vote__title}>{vote.voteTitle}</h1>

                  {/* Subject Two */}
                  <div className={styles.vote__subject}>
                     <h2>{vote.subjectOneName}</h2>

                     <span>
                        {vote.maxVote > 0
                           ? `${vote.totalVotesSubjectOne} / ${vote.maxVote}`
                           : vote.totalVotesSubjectOne}{" "}
                        votes
                     </span>
                  </div>

                  <div className={styles.vote_progress__container_one}>
                     <div
                        className={styles.vote__subject_progress}
                        style={{ width: `${percentSubjectOne}%` }}
                     ></div>
                  </div>

                  {/* Subject Two */}
                  <div className={styles.vote__subject}>
                     <h2>{vote.subjectTwoName}</h2>

                     <span>
                        {vote.maxVote > 0
                           ? `${vote.totalVotesSubjectTwo} / ${vote.maxVote}`
                           : vote.totalVotesSubjectTwo}{" "}
                        votes
                     </span>
                  </div>

                  <div className={styles.vote_progress__container_two}>
                     <div
                        className={styles.vote__subject_progress}
                        style={{ width: `${percentSubjectTwo}%` }}
                     ></div>
                  </div>

                  {isUserAllow === true && (
                     <div className={styles.vote__buttons}>
                        <button
                           className={styles.vote__submit_btn}
                           onClick={() => votingSubject("totalVotesSubjectOne")}
                        >
                           <svg
                              width="26px"
                              height="26px"
                              fill="#000000"
                              viewBox="0 0 24 24"
                              style={{ marginRight: "10px" }}
                              xmlns="http://www.w3.org/2000/svg"
                           >
                              <path d="M0 0h24v24H0V0z" fill="none" />
                              <path d="M18 13h-.68l-2 2h1.91L19 17H5l1.78-2h2.05l-2-2H6l-3 3v4c0 1.1.89 2 1.99 2H19c1.1 0 2-.89 2-2v-4l-3-3zm-1-5.05l-4.95 4.95-3.54-3.54 4.95-4.95L17 7.95zm-4.24-5.66L6.39 8.66c-.39.39-.39 1.02 0 1.41l4.95 4.95c.39.39 1.02.39 1.41 0l6.36-6.36c.39-.39.39-1.02 0-1.41L14.16 2.3c-.38-.4-1.01-.4-1.4-.01z" />
                           </svg>
                           {vote.subjectOneName}
                        </button>

                        <button
                           className={styles.vote__submit_btn}
                           onClick={() => votingSubject("totalVotesSubjectTwo")}
                        >
                           <svg
                              width="26px"
                              height="26px"
                              fill="#000000"
                              viewBox="0 0 24 24"
                              style={{ marginRight: "10px" }}
                              xmlns="http://www.w3.org/2000/svg"
                           >
                              <path d="M0 0h24v24H0V0z" fill="none" />
                              <path d="M18 13h-.68l-2 2h1.91L19 17H5l1.78-2h2.05l-2-2H6l-3 3v4c0 1.1.89 2 1.99 2H19c1.1 0 2-.89 2-2v-4l-3-3zm-1-5.05l-4.95 4.95-3.54-3.54 4.95-4.95L17 7.95zm-4.24-5.66L6.39 8.66c-.39.39-.39 1.02 0 1.41l4.95 4.95c.39.39 1.02.39 1.41 0l6.36-6.36c.39-.39.39-1.02 0-1.41L14.16 2.3c-.38-.4-1.01-.4-1.4-.01z" />
                           </svg>
                           {vote.subjectTwoName}
                        </button>
                     </div>
                  )}

                  <details className={styles.vote__details}>
                     <summary
                        className={styles.vote__show_details}
                        onClick={() => scrollTo(0, 500)}
                     >
                        <svg
                           width="26px"
                           height="26px"
                           fill="#000000"
                           viewBox="0 0 24 24"
                           style={{ marginRight: "12px" }}
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path d="M0 0h24v24H0z" fill="none" />
                           <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                        </svg>
                        Voting details
                     </summary>

                     <p className={styles.vote__desc_details}>
                        {vote.voteDesc}
                     </p>

                     <p className={styles.vote__by}>
                        <svg
                           width="28px"
                           height="28px"
                           fill="#000000"
                           viewBox="0 0 24 24"
                           style={{ marginRight: "15px" }}
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path d="M0 0h24v24H0V0z" fill="none" />
                           <circle cx="15.5" cy="9.5" r="1.5" />
                           <circle cx="8.5" cy="9.5" r="1.5" />
                           <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-5-6c.78 2.34 2.72 4 5 4s4.22-1.66 5-4H7z" />
                        </svg>
                        Created by {vote.fullName}
                     </p>

                     <p className={styles.vote__date}>
                        <svg
                           width="28px"
                           height="28px"
                           fill="#000000"
                           viewBox="0 0 24 24"
                           style={{ marginRight: "15px" }}
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path d="M0 0h24v24H0z" fill="none" />
                           <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                           <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                        </svg>
                        {new Time(vote.createdAt).getNormalRt()}
                     </p>
                  </details>
               </>
            )}
         </div>
      </>
   );
}

export async function getServerSideProps({ params }) {
   return {
      props: {
         voteId: params.id,
      },
   };
}
