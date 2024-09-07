"use client";
import { useEffect, useState, useRef } from "react";
import TableRow from "../TableRow";
import styles from "./styles.module.scss";
import Placeholder from "../Placeholder";
import Error from "../Error";
import clsx from "clsx";
import useClientStore from "@/store/useClientStore";
import sortClients from "@/hooks/sortClient";

export default function Table() {
  const loading = useClientStore((state) => state.isLoading);
  const isFetched = useClientStore((state) => state.isFetched);
  const error = useClientStore((state) => state.errors.length > 0);
  const data = useClientStore((state) => state.clients);
  const fetchClients = useClientStore((state) => state.fetchClients);
  const result = useClientStore((state) => state.result);
  const updateResult = useClientStore((state) => state.updateResult);

  const [userData, setUserData] = useState([]);
  const [sortDirectionId, setSortDirectionId] = useState(false);
  const [sortDirectionName, setSortDirectionName] = useState(false);

  useEffect(() => {
    setUserData(data);
  }, [data]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  useEffect(() => {
    setUserData(result);
  }, [result]);

  const handleSort = (prop, sortDirection, setSortDirection) => {
    setSortDirection(!sortDirection);
    updateResult(sortClients(userData, prop, !sortDirection));
  }

  return (
    <div className={styles.table}>
      <div className={styles.thead}>
        <div className={clsx(styles.table__titleWrapper, styles.table__title_idWrapper)}>
          <div
            value={false}
            className={clsx(styles.table__title, styles.table__title_sortable, styles.table__title_id)}
            onClick={() => {
              handleSort("id", sortDirectionId, setSortDirectionId);
            }}
          >
            ID
          </div>
        </div>
        <div className={clsx(styles.table__titleWrapper, styles.table__title_nameWrapper)}>
          <div
            className={clsx(styles.table__title, styles.table__title_sortable, styles.table__title_name)}
            onClick={() => {
              handleSort("surname", sortDirectionName, setSortDirectionName);
            }}
          >
            Фамилия Имя Отчество
          </div>
        </div>
        <div className={clsx(styles.table__titleWrapper, styles.table__title_creationWrapper)}>
          <div className={clsx(styles.table__title, styles.table__title_sortable, styles.table__title_creation)}>
            Дата и время создания
            <img src="/arrow_downward.svg" alt=""/>
          </div>
        </div>
        <div className={clsx(styles.table__titleWrapper, styles.table__title_changesWrapper)}>
          <div className={clsx(styles.table__title, styles.table__title_sortable, styles.table__title_changes)}>
            Последние изменения
            <img src="/arrow_downward.svg" alt=""/>
          </div>
        </div>
        <div className={clsx(styles.table__titleWrapper, styles.table__title_contactsWrapper)}>
          <div className={clsx(styles.table__title, styles.table__title_contacts)}>
            Контакты
          </div>
        </div>
        <div className={clsx(styles.table__titleWrapper, styles.table__title_actionsWrapper)}>
          <div className={clsx(styles.table__title, styles.table__title_actions)}>
            Действия
          </div>
        </div>
      </div>
      <div className={clsx(styles.table__body, userData.length > 0 && styles.white)}>
        {error ? <Error /> : null}
        {loading && <Placeholder />}
        {!loading && isFetched && userData.length === 0 && <h2>Здесь пока ничего нет</h2>}
        {!loading && userData.length > 0 && userData.map((item) => <TableRow key={item.id} data={item} />)}
      </div>
    </div>
  );
}
