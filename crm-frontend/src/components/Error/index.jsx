import ThemeToggle from "../ThemeToggle";
import styles from "./styles.module.scss";

export default function Error () {
  return (
    <div className={styles.error}>
      <h1 className={styles.error__message}>
        Упс... Что-то пошло не так.
      </h1>
      <p className={styles.error__message}>
        Попробуйте перезагрузить страницу
      </p>
    </div>
  )
}
