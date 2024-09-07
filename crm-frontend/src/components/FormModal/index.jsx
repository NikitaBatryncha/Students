"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import useTitle from "@/store/useTitle";
import useId from "@/store/useId";
import useClientStore from "@/store/useClientStore";
import useAFM from "@/store/useActiveFormModal";
import useClientData from "@/store/useClientData";

export default function FormModal() {
  const title = useTitle((store) => store.title);
  const id = useId((store) => store.id);
  const createUser = useClientStore((state) => state.createClient);
  const patchUser = useClientStore((state) => state.patchClient);
  const active = useAFM((store) => store.active);
  const setActive = useAFM((store) => store.setActive);
  const data = useClientData((store) => store.data);

  const nameRef = useRef(null);
  const surnameRef = useRef(null);
  const lastNameRef = useRef(null);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [lastName, setLastName] = useState("");
  const [contacts, setContacts] = useState([]);
  const [type, setType] = useState("tel");
  const [inputError, setInputError] = useState(null);
  const [modId, setModId] = useState(null);
  const [error, setError] = useState(null);
  const [focus1, setFocus1] = useState(false);
  const [focus2, setFocus2] = useState(false);
  const [focus3, setFocus3] = useState(false);
  const [activeSelectors, setActiveSelectors] = useState([]);

  const options = [
    { value: "tel", label: "Телефон" },
    { value: "email", label: "Email" },
    { value: "fb", label: "Facebook" },
    { value: "vk", label: "VK" },
    { value: "inst", label: "Instagram" },
    { value: "x", label: "X (Twitter)" },
    { value: "tg", label: "Telegram" },
  ];

  useEffect(() => {
    if (active && id) {
      setModId(id);
      setName(data.name);
      setSurname(data.surname);
      setLastName(data.lastName);
      setContacts(data.contacts);
    }
  }, [active, id, data]);

  useEffect(() => {
    setActiveSelectors(contacts.map(() => false));
  }, [contacts]);

  // Очистка данных формы
  const cleanForm = () => {
    setName("");
    setSurname("");
    setLastName("");
    setContacts([]);
    setModId(null);
    setError(null);
  };

  const handleSelectorActive = () => {
    setSelectorActive(true)
  }

  const handleCloseSelector = (e) => {
    e.preventDefault();
    setActiveSelectors((prev) => prev.map(() => false));
  };

  const toggleSelector = (index) => {
    setActiveSelectors((prev) => {
      const newActiveSelectors = [...prev];
      newActiveSelectors[index] = !newActiveSelectors[index];
      return newActiveSelectors;
    });
  };

  const closeSelector = (index) => {
    setActiveSelectors((prev) => {
      const newActiveSelectors = [...prev];
      newActiveSelectors[index] = false;
      return newActiveSelectors;
    });
  };

  // Закрытие модального окна
  const handleCloseModal = (e) => {
    e.preventDefault();
    setActive(false);
    cleanForm();
    setError(null);
  };

  // Создание или обновление пользователя
  const handleCreateUser = async () => {
    const userData = {
      name: nameRef.current.value,
      surname: surnameRef.current.value,
      lastName: lastNameRef.current.value,
      contacts: contacts,
    };

    try {
      if (title === "Новый контакт") {
        await createUser(userData);
      } else {
        await patchUser(id, userData);
      }
      setActive(false);
      cleanForm();
    } catch (error) {
      console.error(error);
    }
  };

  // Удаление поля контакта
  const deleteContactField = (index) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  // Добавление нового поля контакта
  const addContactField = (e) => {
    e.preventDefault();
    if (contacts.length < 10) {
      setContacts([...contacts, { type: "tel", value: "" }]);
    } else {
      setError("Превышено допустимое количество контактов");
    }
  };

  // Обработка изменения контакта
  const handleContactChange = (index, field, value) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact, i) =>
        i === index ? { ...contact, [field]: value } : contact
      )
    );
  };

  const validateInput = (e) => {
    const type = e.target.getAttribute("type");

    const validation = (regex, message) => {
      !regex.test(e.target.value) ? setError(message) : setError(null)
    }
    type === "tel" ? validation(/^8\d{10}$/, "Введите номер в формате 89999999999") : null;
    type === "email" ? validation(/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/, "Введите номер в формате johndoe@example.com") : null;
    type === "text" ? validation(/^@/, "Введите номер в формате @johndoe") : null;
  }

  // Обработка клика на опцию в выпадающем списке
  const handleOptionClick = (e, index) => {
    const value = e.target.getAttribute("data-value");
    setType(handleType(value))
    setContacts((prevContacts) =>
      prevContacts.map((contact, i) =>
        i === index ? { ...contact, type: value } : contact
      )
    );
  };

  const handleType = (type) => {
    if (type !== "tel" && type !== "email") {
      return "text"
    } else {
      return type
    }
  }

  return (
    <div
      className={clsx(styles.formModal, { [styles.active]: active })}
      onClick={handleCloseModal}
    >
      <div
        className={styles.form__container}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.form__titleWrapper}>
          <h2 className={styles.form__title}>{title}</h2>
          <p className={styles.form__id}>
            {modId !== null && `ID: ${modId.substring(7)}`}
          </p>
        </div>
        <form
          className={styles.form}
          id="form"
          onSubmit={async (e) => {
            e.preventDefault();
            await handleCreateUser();
          }}
        >
          <span className={styles.form__wrapper}>
            <span className={styles.form__inputWrapper}>
              <label
                className={clsx(
                  styles.form__label,
                  styles.form__label1,
                  (focus2 || (surnameRef.current && surnameRef.current.value.length > 0)) && styles.form__labelTop
                )}
                htmlFor="#surname"
              >
                Фамилия
              </label>
              <input
                className={styles.form__item}
                ref={surnameRef}
                type="text"
                id="surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                onFocus={() => setFocus2(true)}
                onBlur={() => setFocus2(false)}
              />
            </span>
            <span className={styles.form__inputWrapper}>
              <label
                className={clsx(
                  styles.form__label,
                  styles.form__label1,
                  (focus1 || (nameRef.current && nameRef.current.value.length > 0)) && styles.form__labelTop
                )}
                htmlFor="#name"
              >
                Имя
              </label>
              <input
                id="name"
                className={styles.form__item}
                ref={nameRef}
                type="text"
                placeholder=""
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setFocus1(true)}
                onBlur={() => setFocus1(false)}
              />
            </span>
            <span className={styles.form__inputWrapper}>
              <label
                className={clsx(
                  styles.form__label,
                  (focus3 || (lastNameRef.current && lastNameRef.current.value.length > 0)) && styles.form__labelTop
                )}
                htmlFor="#lastName"
              >
                Отчество
              </label>
              <input
                className={styles.form__item}
                ref={lastNameRef}
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onFocus={() => setFocus3(true)}
                onBlur={() => setFocus3(false)}
              />
            </span>
          </span>

          <span
            className={clsx(
              styles.form__wrapper,
              styles.form__contactsWrapper,
              contacts.length > 0 && styles.form__contactsPadding
            )}
            onClick={handleCloseSelector}
          >
            {contacts.map((contact, index) => (
              <div key={index} className={styles.form__contact}>
                <div className={styles.dropdown} onClick={(e) => {e.stopPropagation()}}>
                  <div
                    data-value={contact.type}
                    className={clsx(styles.dropdown__head, activeSelectors[index] && styles.active)}
                    onClick={() => toggleSelector(index)}
                  >
                    {options.find((opt) => opt.value === contact.type)?.label || "Тип контакта"}
                  </div>
                  <div className={clsx(styles.dropdown__container, activeSelectors[index] && styles.selectorActive)}>
                    <ul className={clsx(styles.dropdown__list)} >
                      {options.map((opt) => (
                        <li
                          key={opt.value}
                          data-value={opt.value}
                          className={styles.dropdown__option}
                          onClick={(e) => {
                            handleOptionClick(e, index);
                            closeSelector(index);
                          }}
                        >
                          {opt.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <input
                  type={type}
                  value={contact.value}
                  onChange={(e) => {
                    handleContactChange(index, "value", e.target.value)
                    validateInput(e)
                  }}
                  placeholder="Значение"
                />
                <button
                  type="button"
                  onClick={() => deleteContactField(index)}
                  className={styles.deleteContact}
                >

                </button>
              </div>
            ))}
            {error !== null && <p className={styles.error}>{error}</p>}
            <button
              onClick={addContactField}
              className={styles.addContact}
            >
              Добавить контакт
            </button>
          </span>
          <button
            className={styles.form__submit}
            type="submit"
          >
            Сохранить
          </button>
        </form>
        <button
          className={styles.form__close}
          onClick={handleCloseModal}
        >
          Отмена
        </button>
      </div>
    </div>
  );
}
