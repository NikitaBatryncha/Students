"use client"
import styles from "./styles.module.scss";

export default function ThemeToggle () {
  const setDarkmode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark")
  }

  const setLightmode = () => {
    document.querySelector("body").setAttribute("data-theme", "light")
  }

  const toggleMode = (e) => {
    if (e.target.checked) setDarkmode();
    else setLightmode();
  }

  return (
    <input
      className={styles.themetoggle}
      type="checkbox"
      onChange={toggleMode}
    />
  )
}
