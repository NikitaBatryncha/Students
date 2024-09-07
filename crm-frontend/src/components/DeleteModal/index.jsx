"use client"
import { useState, useRef } from "react";
import styles from "./styles.module.scss";
import createUser from "@/hooks/createUser";
import clsx from "clsx";
import useADM from "@/store/useActiveDeleteModal";
import useClientStore from "@/store/useClientStore";
import useId from "@/store/useId";

export default function DeleteModal() {
  const id = useId(store => store.id)
  const active = useADM(state => state.active);
  const setActive = useADM(state => state.setActive);
  const deleteUser = useClientStore(state => state.deleteClient)

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id)
      setActive(false)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={clsx(styles.modal, { [styles.active]: active })} onClick={() => setActive(false)}>
      <div className={styles.modal__wrapper} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modal__title}>
          Удалить клиента
        </h2>
        <p className={styles.modal__descr}>
          Вы действительно хотите удалить клиента?
        </p>
        <button
          className={styles.modal__delete}
          onClick={
            async (e) => {
              e.preventDefault()
              await handleDeleteUser(id)
            }
          }

        >
          Удалить
        </button>
        <button
          value=""
          className={styles.modal__close}
          onClick={() => setActive(false)}
        >
          Отмена
        </button>
      </div>
    </div>
  )
}

