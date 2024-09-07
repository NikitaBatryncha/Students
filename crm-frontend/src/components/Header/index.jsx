import {useRef} from "react"
import ThemeToggle from "../ThemeToggle";
import styles from "./styles.module.scss";
import searchClient from "@/hooks/searchClient";
import useClientStore from "@/store/useClientStore";


export default function Header () {
  const clientSearch = useClientStore((state) => state.clientSearch);
  const updateResult = useClientStore((state) => state.updateResult);
  const clients = useClientStore((state) => state.clients);

  const searchbar = useRef(null);

  const handleSearch = (value) => {
      const result = [];
      const preresult = searchClient(clientSearch, value);

      for (let client of clients) {
        for (let item of preresult) {
          client.id === item.id ? result.push(client) : null
        }
      }

      updateResult(result)
  }

  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__wrapper}>
          <img src="/logo.svg" alt="skb." className={styles.header__logo}/>
          <input type="text" className={styles.header__search} ref={searchbar} placeholder="Введите запрос" onChange={(e) => handleSearch(e.target.value)}/>
        </div>
        <ThemeToggle/>
      </div>

    </div>
  )
}
