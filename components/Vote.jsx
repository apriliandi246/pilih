import styles from "../styles/Vote.module.css";

export default function Vote() {
   return (
      <div className={styles.container}>
         <h1 className={styles.total_votes}>Total votes</h1>

         <h2 className={styles.subject_title}>Subject 1</h2>
         <span className={styles.subject_votes}>20 votes</span>
         <div className={styles.subject_one}>
            <div className={styles.subject_progress}></div>
         </div>

         <h2 className={styles.subject_title}>Subject 2</h2>
         <span className={styles.subject_votes}>20 votes</span>
         <div className={styles.subject_two}>
            <div className={styles.subject_progress}></div>
         </div>

         <div className={styles.subject_buttons}>
            <button>Voting Subject 1</button>
            <button>Voting Subject 2</button>
         </div>
      </div>
   );
}
