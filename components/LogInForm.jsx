import styles from "../styles/form.module.css";

export default function SignInForm() {
   return (
      <div className={styles.container}>
         <form>
            <div className={styles.input}>
               <label htmlFor="email">Email *</label>
               <input
                  required
                  id="email"
                  type="email"
                  autoComplete="off"
                  placeholder="email"
               />
            </div>

            <div className={styles.input}>
               <label htmlFor="password">Password *</label>
               <input
                  required
                  id="password"
                  type="password"
                  autoComplete="off"
                  placeholder="password"
               />
            </div>

            <button className={styles.submit_btn}>Log In</button>
         </form>
      </div>
   );
}
