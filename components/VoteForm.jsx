import { useState } from "react";
import fire from "../config/config";
import Alert from "./Alert";
import styles from "../styles/form.module.css";

export default function SignInForm({ isSubmit, onSubmit }) {
   const [idVote, setIdVote] = useState("");
   const [maxVote, setMaxVote] = useState("");
   const [fullName, setFullName] = useState("");
   const [voteDesc, setVoteDesc] = useState("");
   const [isNotif, setIsNotif] = useState(false);
   const [voteTitle, setVoteTitle] = useState("");
   const [subjectOneName, setSubjectOneName] = useState("");
   const [subjectTwoName, setSubjectTwoName] = useState("");

   function submitForm(event) {
      event.preventDefault();
      onSubmit(true);

      fire
         .firestore()
         .collection("votes")
         .add({
            fullName,
            voteDesc,
            voteTitle,
            subjectOneName,
            subjectTwoName,
            peoplesVoted: [],
            totalVotesSubjectOne: 0,
            totalVotesSubjectTwo: 0,
            createdAt: `${new Date()}`,
            maxVote: parseInt(maxVote),
         })
         .then((data) => {
            setMaxVote(0);
            setFullName("");
            setVoteDesc("");
            onSubmit(false);
            setVoteTitle("");
            setIsNotif(true);
            setIdVote(data.id);
            setSubjectOneName("");
            setSubjectTwoName("");
            scrollToTop();
         });
   }

   return (
      <div className={styles.container}>
         {isNotif === true && <Alert voteID={idVote} />}

         <form onSubmit={submitForm}>
            <div className={styles.input}>
               <label htmlFor="yourName">Your name *</label>
               <input
                  required
                  type="text"
                  id="yourName"
                  value={fullName}
                  autoComplete="off"
                  spellCheck="false"
                  placeholder="your name"
                  disabled={isSubmit === true}
                  onChange={(e) => setFullName(e.target.value)}
               />
            </div>

            <div className={styles.input}>
               <label htmlFor="title">Title *</label>
               <input
                  required
                  id="title"
                  type="text"
                  value={voteTitle}
                  autoComplete="off"
                  spellCheck="false"
                  placeholder="title"
                  disabled={isSubmit === true}
                  onChange={(e) => setVoteTitle(e.target.value)}
               />
            </div>

            <div className={styles.input}>
               <label htmlFor="maxVote">Maximum votes</label>
               <input
                  min="1"
                  id="maxVote"
                  type="number"
                  value={maxVote}
                  autoComplete="off"
                  spellCheck="false"
                  placeholder="maximum votes"
                  disabled={isSubmit === true}
                  onChange={(e) => setMaxVote(e.target.value)}
               />
            </div>

            <div className={styles.input}>
               <label htmlFor="subjectOne">Subject one *</label>
               <input
                  type="text"
                  id="subjectOne"
                  autoComplete="off"
                  spellCheck="false"
                  value={subjectOneName}
                  disabled={isSubmit === true}
                  placeholder="subject one name"
                  onChange={(e) => setSubjectOneName(e.target.value)}
               />
            </div>

            <div className={styles.input}>
               <label htmlFor="subjectTwo">Subject two *</label>
               <input
                  id="subjectTwo"
                  autoComplete="off"
                  spellCheck="false"
                  value={subjectTwoName}
                  disabled={isSubmit === true}
                  placeholder="subject two name"
                  onChange={(e) => setSubjectTwoName(e.target.value)}
               />
            </div>

            <div className={styles.input}>
               <label htmlFor="desc">Detail description *</label>
               <textarea
                  id="desc"
                  cols="30"
                  rows="14"
                  required
                  value={voteDesc}
                  spellCheck="false"
                  autoComplete="off"
                  disabled={isSubmit === true}
                  placeholder="detail vote description"
                  onChange={(e) => setVoteDesc(e.target.value)}
               ></textarea>
            </div>

            <button disabled={isSubmit === true} className={styles.submit_btn}>
               {isSubmit === true ? "Loading" : "Create Vote"}
            </button>
         </form>
      </div>
   );
}

function scrollToTop() {
   setTimeout(() => {
      window.scrollTo(99999, 0);
   }, 0);
}
