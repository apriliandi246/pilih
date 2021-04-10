import styles from "../styles/Alert.module.css";

export default function Alert({ message }) {
   return (
      <div className={styles.alert}>
         <p className={styles.alert__message}>{message}</p>
      </div>
   );
}
