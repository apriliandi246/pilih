import styles from "../styles/form.module.css";

export default function SignInForm() {
   return (
      <div className={styles.container}>
         <form>
            <div className={styles.input}>
               <label htmlFor="yourName">Full name *</label>
               <input
                  required
                  type="text"
                  id="yourName"
                  autoComplete="off"
                  placeholder="your name"
               />
            </div>

            <div className={styles.input}>
               <label htmlFor="title">Title *</label>
               <input
                  required
                  id="title"
                  type="text"
                  autoComplete="off"
                  placeholder="title"
               />
            </div>

            <div className={styles.input}>
               <label htmlFor="maxVote">Maximum votes</label>
               <input
                  min="1"
                  id="maxVote"
                  type="number"
                  autoComplete="off"
                  placeholder="maximum votes"
               />
            </div>

            <div className={styles.input}>
               <label htmlFor="subjectOne">Subject one *</label>
               <input
                  id="subjectOne"
                  type="text"
                  autoComplete="off"
                  placeholder="subject one name"
               />
            </div>

            <div className={styles.input}>
               <label htmlFor="subjectTwo">Subject two *</label>
               <input
                  id="subjectTwo"
                  type="text"
                  autoComplete="off"
                  placeholder="subject two name"
               />
            </div>

            <div className={styles.input}>
               <label htmlFor="desc">Detail description *</label>
               <textarea
                  id="desc"
                  cols="30"
                  rows="14"
                  required
                  autoComplete="off"
                  placeholder="detail vote description"
               ></textarea>
            </div>

            <button className={styles.submit_btn}>Create Vote</button>
         </form>
      </div>
   );
}
