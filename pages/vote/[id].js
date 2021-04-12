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

      return () => unsubscribe();
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
            <title>Let's voting</title>
         </Head>

         {isVoteExist === true && (
            <div className={styles.home}>
               <Link href="/">
                  <a className={styles.home__link}>Home</a>
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
                           {vote.subjectOneName}
                        </button>

                        <button
                           className={styles.vote__submit_btn}
                           onClick={() => votingSubject("totalVotesSubjectTwo")}
                        >
                           {vote.subjectTwoName}
                        </button>
                     </div>
                  )}

                  <details className={styles.vote__details}>
                     <summary
                        className={styles.vote__show_details}
                        onClick={() => scrollTo(0, 500)}
                     >
                        Voting details
                     </summary>

                     <p className={styles.vote__desc_details}>
                        {vote.voteDesc}
                     </p>

                     <p className={styles.vote__vote_by}>
                        <span style={{ marginRight: "8px" }}>😀</span> Created
                        by {vote.fullName}
                     </p>

                     <p className={styles.vote__date}>
                        <span style={{ marginRight: "8px" }}>🕑</span>
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
