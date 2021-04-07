import { useState } from "react";
import styles from "../styles/Alert.module.css";

export default function Alert({ voteID }) {
   const [isCopied, setIsCopied] = useState(false);

   async function clipBoardVoteId() {
      setIsCopied(true);
      await navigator.clipboard.writeText(voteID);

      setTimeout(() => {
         setIsCopied(false);
      }, 700);
   }

   return (
      <div className={styles.alert}>
         <p className={styles.alert__message}>
            Your vote ID <span style={{ marginLeft: "7px" }}>:</span>{" "}
            <span style={{ marginLeft: "7px" }}>{voteID}</span>
         </p>

         <span className={styles.alert__close_button} onClick={clipBoardVoteId}>
            {isCopied === true ? "copied" : "copy"}
         </span>
      </div>
   );
}
