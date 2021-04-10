import Alert from "./Alert";
import { useState } from "react";
import fire from "../config/config";
import { useRouter } from "next/router";
import styles from "../styles/form.module.css";

export default function VoteInput({ isSubmit, onSubmit }) {
   const router = useRouter();
   const [idVote, setIdVote] = useState("");
   const [isNotif, setIsNotif] = useState(false);

   function submitForm(event) {
      event.preventDefault();
      onSubmit(true);

      fire
         .firestore()
         .collection("votes")
         .doc(idVote.trim())
         .get()
         .then((querySnapshot) => {
            if (querySnapshot.exists === true) {
               router.push(`/vote/${idVote.trim()}`);
            }

            if (querySnapshot.exists === false) {
               onSubmit(false);
               setIsNotif(true);
            }
         })
         .catch((err) => {
            throw new Error(err.message);
         });
   }

   return (
      <div className={styles.container}>
         {isNotif === true && <Alert message="Voting not found" />}

         <form onSubmit={submitForm}>
            <div className={styles.input}>
               <label htmlFor="voteid">Voting ID *</label>
               <input
                  required
                  id="voteid"
                  type="text"
                  value={idVote}
                  autoComplete="off"
                  spellCheck="false"
                  placeholder="voting ID"
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
