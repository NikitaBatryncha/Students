"use client"
import { useState, useEffect, useRef } from "react";
import Table from "../Table";
import styles from "./styles.module.scss";
import useId from '@/store/useId'
import useTitle from "@/store/useTitle";
import useAFM from "@/store/useActiveFormModal";

export default function Main({title}) {
  const create = useRef(null);
  const updateTitle = useTitle((state) => state.updateTitle);
  const setActive = useAFM(store => store.setActive);
  const updateId = useId((state) => state.updateId);

  const handleModal = () => {
    setActive(true)
    updateTitle("Новый контакт");
    updateId(null)
  }

  return (
    <div className={styles.main}>
      <div className={styles.main__container}>
        <header>
          <h1 className={styles.title}>
            {title}
          </h1>
        </header>
        <Table/>

        <button
          ref={create}
          className={styles.createButton}
          type="button"
          onClick={(e) => {
            e.preventDefault()
            handleModal()
          }}
        >
          <img src="/add_client.svg" alt="" />
          Добавить клиента
        </button>
      </div>
    </div>
  )
}
