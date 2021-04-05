import { useState } from "react";
import styles from "../styles/form.module.css";

export default function VoteInput({ isSubmit, onSubmit }) {
   const [idVote, setIdVote] = useState("");

   function submitForm(event) {
      event.preventDefault();
      onSubmit(true);
   }

   return (
      <div className={styles.container}>
         <form onSubmit={submitForm}>
            <div className={styles.input}>
               <label htmlFor="voteid">Vote ID *</label>
               <input
                  required
                  id="voteid"
                  type="text"
                  value={idVote}
                  autoComplete="off"
                  spellCheck="false"
                  placeholder="vote id"
                  disabled={isSubmit === true}
                  onChange={(e) => setIdVote(e.target.value)}
               />
            </div>

            <button disabled={isSubmit === true} className={styles.submit_btn}>
               {isSubmit === true ? "Loading" : "Join"}
            </button>
         </form>
      </div>
   );
}
