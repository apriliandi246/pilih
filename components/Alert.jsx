import styles from "../styles/Alert.module.css";

export default function Alert({ onCloseAlert, message }) {
   return (
      <div className={styles.alert}>
         <p className={styles.alert__message}>{message}</p>
         <span
            className={styles.alert__close_button}
            onClick={() => onCloseAlert(false)}
         >
            ×
         </span>
      </div>
   );
}
