import { useState } from "react";
import { useRouter } from "next/router";
import fire from "../config/config";
import Alert from "./Alert";
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
               onSubmit(false);
               router.push(`/vote/${idVote}`);
            }

            if (querySnapshot.exists === false) {
               onSubmit(false);
               setIsNotif(true);
            }
         })
         .catch((err) => {
            console.log(err);
         });
   }

   return (
      <div className={styles.container}>
         {isNotif === true && (
            <Alert onCloseAlert={setIsNotif} message="Vote not found" />
         )}

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
