"use client"
import {useEffect, useState} from "react";
import styles from "./page.module.css";
import Header from "@/components/Header";
import Main from "@/components/Main";
import FormModal from "@/components/FormModal";
import DeleteModal from "@/components/DeleteModal";
import useClientStore from "@/store/useClientStore";

export default function Home() {
  const getUsers = useClientStore(store => store.fetchClients);

  useEffect(() => {
    getUsers()
  });
  
  return (

      <main className={styles.main}>
        <Header />
        <Main
          title={"Клиенты"}
        />
        <FormModal/>
        <DeleteModal/>
      </main>
  );
}
