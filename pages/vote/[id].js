import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import fire from "../../config/config";
import styles from "../../styles/vote.module.css";
import styles_2 from "../../styles/notfound.module.css";

export default function VotePage({ idVote }) {
   const [vote, setVote] = useState("");
   const [isLoading, setIsLoading] = useState(true);
   const [isVoteExist, setIsVoteExist] = useState(false);
   const [percentSubjectOne, setPercentSubjectOne] = useState(0);
   const [percentSubjectTwo, setPercentSubjectTwo] = useState(0);

   function votingSubjectOne() {
      fire
         .firestore()
         .collection("votes")
         .doc(idVote)
         .update({
            totalVotesSubjectOne: (vote.totalVotesSubjectOne += 1),
         });
   }

   function votingSubjectTwo() {
      fire
         .firestore()
         .collection("votes")
         .doc(idVote)
         .update({
            totalVotesSubjectTwo: (vote.totalVotesSubjectTwo += 1),
         });
   }

   function scrollToBottom() {
      setTimeout(() => {
         window.scrollTo(0, 500);
      }, 0);
   }

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
   }, [vote]);

   useEffect(() => {
      fire
         .firestore()
         .collection("votes")
         .doc(idVote.trim())
         .onSnapshot((snap) => {
            if (snap.exists === true) {
               setIsVoteExist(true);
               setVote(snap.data());
            } else {
               setIsVoteExist(false);
            }

            setIsLoading(false);
         });
   }, []);

   if (isLoading === true) {
      return (
         <div className={styles_2.container} style={{ marginTop: "200px" }}>
            <h1 className={styles.total_votes}>Loading....</h1>
         </div>
      );
   }

   return (
      <>
         <Head>
            <title>Let's voting</title>
         </Head>

         <div className={styles.container}>
            {isVoteExist === false ? (
               <div className={styles_2.container}>
                  <h1 className={styles_2.title}>Vote Not Found</h1>

                  <Link href="/">
                     <a className={styles_2.home}>Home</a>
                  </Link>
               </div>
            ) : (
               <>
                  <h1 className={styles.total_votes}>{vote.voteTitle}</h1>

                  <div className={styles.subject_desc}>
                     <h2 className={styles.subject_title}>
                        {vote.subjectOneName}
                     </h2>
                     <span className={styles.subject_votes}>
                        {vote.maxVote > 0
                           ? `${vote.totalVotesSubjectOne} / ${vote.maxVote}`
                           : vote.totalVotesSubjectOne}{" "}
                        votes
                     </span>
                  </div>

                  <div className={styles.subject_one}>
                     <div
                        className={styles.subject_progress}
                        style={{ width: `${percentSubjectOne}%` }}
                     ></div>
                  </div>

                  <div className={styles.subject_desc}>
                     <h2 className={styles.subject_title}>
                        {vote.subjectTwoName}
                     </h2>
                     <span className={styles.subject_votes}>
                        {vote.maxVote > 0
                           ? `${vote.totalVotesSubjectTwo} / ${vote.maxVote}`
                           : vote.totalVotesSubjectTwo}{" "}
                        votes
                     </span>
                  </div>

                  <div className={styles.subject_two}>
                     <div
                        className={styles.subject_progress}
                        style={{ width: `${percentSubjectTwo}%` }}
                     ></div>
                  </div>

                  <div className={styles.subject_buttons}>
                     <button onClick={() => votingSubjectOne()}>
                        Voting {vote.subjectOneName}
                     </button>
                     <button onClick={() => votingSubjectTwo()}>
                        Voting {vote.subjectTwoName}
                     </button>
                  </div>

                  <details className={styles.subject_detail}>
                     <summary onClick={scrollToBottom}>
                        Vote description
                     </summary>
                     <p>{vote.voteDesc}</p>
                     <p>by {vote.fullName}</p>
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
         idVote: params.id,
      },
   };
}
