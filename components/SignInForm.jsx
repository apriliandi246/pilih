import styles from "../styles/form.module.css";

export default function SignInForm() {
   return (
      <div className={styles.container}>
         <form>
            <div className={styles.input}>
               <label htmlFor="fullname">Full name *</label>
               <input
                  id="fullname"
                  type="text"
                  autoComplete="off"
                  placeholder="full name"
               />
            </div>

            <div className={styles.input}>
               <label htmlFor="email">Email *</label>
               <input
                  id="email"
                  type="email"
                  autoComplete="off"
                  placeholder="email"
               />
            </div>

            <div className={styles.input}>
               <label htmlFor="password">Password *</label>
               <input
                  id="password"
                  type="password"
                  autoComplete="off"
                  placeholder="password"
               />
            </div>

            <div className={styles.input}>
               <label htmlFor="twitter">Twitter</label>
               <input
                  id="twitter"
                  type="text"
                  autoComplete="off"
                  placeholder="twitter username"
               />
            </div>

            <div className={styles.input}>
               <label htmlFor="instagram">Instagram</label>
               <input
                  id="instagram"
                  type="text"
                  autoComplete="off"
                  placeholder="instagram username"
               />
            </div>

            <button className={styles.submit_btn}>Sign In</button>
         </form>
      </div>
   );
}
