import styles from "../styles/form.module.css";

export default function VoteInput() {
   return (
      <div className={styles.container}>
         <form>
            <div className={styles.input}>
               <label htmlFor="voteid">Vote ID *</label>
               <input
                  required
                  id="voteid"
                  type="text"
                  placeholder="vote id"
                  autoComplete="off"
               />
            </div>

            <button className={styles.submit_btn}>Join</button>
         </form>
      </div>
   );
}
