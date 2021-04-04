import styles from "../styles/Alert.module.css";

export default function Alert({ message }) {
   return (
      <div class={styles.alert}>
         <p class={styles.alert__message}>Vote created</p>
         <span class={styles.alert__close_button}>×</span>
      </div>
   );
}
