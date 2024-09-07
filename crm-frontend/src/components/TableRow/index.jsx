"use client"
import { useRef } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import deleteUser from "@/hooks/deleteUser";
import patchUser from "@/hooks/patchUser";
import useTitle from "@/store/useTitle";
import useId from "@/store/useId"
import useAFM from "@/store/useActiveFormModal";
import useADM from "@/store/useActiveDeleteModal";
import useClientData from "@/store/useClientData";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

export default function TableRow({ data }) {

  const updateTitle = useTitle((state) => state.updateTitle);
  const updateId = useId((state) => state.updateId);
  const setActive = useAFM(store => store.setActive);
  const setADM = useADM(store => store.setActive);
  const getData = useClientData(store => store.getData)

  const handleModal = (id) => {
    updateTitle("Изменить даные");
    updateId(id);
    getData(data)
    setActive(true)
  }

  const handleDeleteModal = (id) => {
    updateId(id)
    setADM(true)
  }

  const deleteRef = useRef(null);
  const changeRef = useRef(null);

  const createdAt = {
    dd: data.createdAt.substring(8, 10),
    mm: data.createdAt.substring(5, 7),
    yy: data.createdAt.substring(0, 4),
    hh: (Number(data.createdAt.substring(11, 13)) + 3).toString(),
    min: data.createdAt.substring(14, 16),
  }

  const updatedAt = {
    dd: data.updatedAt.substring(8, 10),
    mm: data.updatedAt.substring(5, 7),
    yy: data.updatedAt.substring(0, 4),
    hh: (Number(data.updatedAt.substring(11, 13)) + 3).toString(),
    min: data.updatedAt.substring(14, 16),
  }

  return (
    <div className={styles.tableRow}>
      <div className={styles.tableRow_id}>
        {data.id.substring(7)}
      </div>
      <div className={styles.tableRow_name}>
        {[data.surname, " ", data.name, " ", data.lastName]}
      </div>
      <div className={styles.tableRow_creation}>
        <span className={styles.year}>{data.createdAt ? `${createdAt.dd}.${createdAt.mm}.${createdAt.yy}` : "N/A"}</span>
        {" "}
        <span>{`${createdAt.hh}:${createdAt.min}`}</span>
      </div>
      <div className={styles.tableRow_changes}>
        <span className={styles.year}>{data.updatedAt ? `${updatedAt.dd}.${updatedAt.mm}.${updatedAt.yy}` : "N/A"}</span>
        {" "}
        <span>{`${updatedAt.hh}:${updatedAt.min}`}</span>
      </div>
      <div className={styles.tableRow_contacts}>
        {data.contacts.map((el, index) => (
          <p key={index}>
            {
              el.type === "tel" && <Tippy content={<span>{el.value}</span>}>
                <img alt="" src="/phone.svg" className={styles.tableRow_contactsImg}/>
              </Tippy>
            }
            {
              el.type === "vk" && <Tippy content={<span>{el.value}</span>}>
                <img alt="" src="/vk.svg" className={styles.tableRow_contactsImg}/>
              </Tippy>
            }
            {
              el.type === "fb" && <Tippy content={<span>{el.value}</span>}>
                <img alt="" src="/fb.svg" className={styles.tableRow_contactsImg}/>
              </Tippy>
            }
            {
              el.type === "email" && <Tippy content={<span>{el.value}</span>}>
                <img alt="" src="/mail.svg" className={styles.tableRow_contactsImg}/>
              </Tippy>
            }
            {
              el.type === "tg" || 
              el.type === "inst" ||
              el.type === "x" ?
              <Tippy content={<span>{el.value}</span>}><img alt="" src="/other.svg"/></Tippy> :
              null
            }
          </p>
        ))}
      </div>
      <div className={styles.tableRow_actions}>
        <button
          ref={changeRef}
          className={clsx(styles.table__button, styles.table__buttonChange)}
          value={data.id}
          onClick={(e) => {
            e.preventDefault();
            handleModal(changeRef.current.value)
          }}
        >
          Изменить
        </button>
        <button
          ref={deleteRef}
          className={clsx(styles.table__button, styles.table__buttonDelete)}
          value={data.id}
          onClick={(e) => {
            e.preventDefault();
            handleDeleteModal(deleteRef.current.value)
          }}
        >
          Удалить
        </button>
      </div>
    </div>
  )
}
