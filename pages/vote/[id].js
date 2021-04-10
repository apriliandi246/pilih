import Head from "next/head";
import Link from "next/link";
import Time from "../../utils/date";
import fire from "../../config/config";
import { useEffect, useState } from "react";
import scrollTo from "../../utils/scrollTo";
import Spinner from "../../components/Spinner";
import styles from "../../styles/vote.module.css";
import styles_2 from "../../styles/notfound.module.css";

export default function VotePage({ idVote }) {
   const [vote, setVote] = useState("");
   const [isLoading, setIsLoading] = useState(true);
   const [isUserAllow, setIsUserAllow] = useState(false);
   const [isVoteExist, setIsVoteExist] = useState(false);
   const [percentSubjectOne, setPercentSubjectOne] = useState(0);
   const [percentSubjectTwo, setPercentSubjectTwo] = useState(0);

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

   useEffect(() => {
      fire
         .firestore()
         .collection("votes")
         .doc(idVote.trim())
         .onSnapshot((snap) => {
            const data = snap.data();
            const identity = localStorage.getItem("user") === true;

            if (snap.exists === true) {
               setVote(data);
               setIsVoteExist(true);
            }

            if (snap.exists === false) {
               setIsVoteExist(false);
            }

            if (data.peoplesVoted.includes(identity)) {
               setIsUserAllow(true);
            }

            if (data.maxVote > 0) {
               if (
                  data.totalVotesSubjectOne === data.maxVote ||
                  data.totalVotesSubjectTwo === data.maxVote
               ) {
                  setIsUserAllow(true);
               }
            }

            setTimeout(() => {
               setIsLoading(false);
            }, 500);
         });
   }, []);

   function votingSubject(subject) {
      fire
         .firestore()
         .collection("votes")
         .doc(idVote)
         .update({
            peoplesVoted: [...vote.peoplesVoted, localStorage.getItem("user")],
            [subject]: (vote[subject] += 1),
         })
         .then(() => {
            setIsUserAllow(true);
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
            <div className={styles.link_home}>
               <Link href="/">
                  <a className={styles.to_home}>Home</a>
               </Link>
            </div>
         )}

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
                  <h1 className={styles.title_vote}>{vote.voteTitle}</h1>

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

                  {isUserAllow === false && (
                     <div className={styles.subject_buttons}>
                        <button
                           onClick={() => votingSubject("totalVotesSubjectOne")}
                        >
                           {vote.subjectOneName}
                        </button>
                        <button
                           onClick={() => votingSubject("totalVotesSubjectTwo")}
                        >
                           {vote.subjectTwoName}
                        </button>
                     </div>
                  )}

                  <details className={styles.subject_detail}>
                     <summary onClick={() => scrollTo(0, 500)}>
                        Voting details
                     </summary>

                     <p className={styles.desc}>{vote.voteDesc}</p>
                     <p className={styles.voteBy}>
                        <span style={{ marginRight: "8px" }}>😀</span> Created
                        by {vote.fullName}
                     </p>
                     <p className={styles.date}>
                        <span style={{ marginRight: "8px" }}>⏲</span>{" "}
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
         idVote: params.id,
      },
   };
}
