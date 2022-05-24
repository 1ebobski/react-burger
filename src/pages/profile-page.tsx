import profileStyles from "./styles/profile.module.css";
import {
  useEffect,
  useState,
  useRef,
  useMemo,
  SyntheticEvent,
  FocusEvent,
} from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { updateUserThunk, logoutThunk } from "../services/auth/thunks";
import { IStore } from "../types";
import { useAppDispatch } from "../hooks";

export default function ProfilePage(): JSX.Element {
  const initialState = {
    name: "",
    email: "",
    password: "",
  };

  const [form, setForm] = useState<{
    name: string;
    email: string;
    password: string;
  }>(initialState);

  const [activeInput, setActiveInput] = useState<
    "name" | "email" | "password" | null
  >(null);

  const { user } = useSelector((store: IStore) => store.auth);
  const dispatch = useAppDispatch();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setForm({ ...user, password: "******" });
    }
  }, []);

  useEffect(() => {
    if (activeInput) {
      switch (activeInput) {
        case "name":
          nameRef.current?.focus();
          emailRef.current?.blur();
          break;
        case "email":
          emailRef.current?.focus();
          nameRef.current?.blur();
      }
    }
  }, [activeInput]);

  const handleEdit = (
    e: SyntheticEvent,
    { inputName }: { inputName: "name" | "email" | "password" }
  ): void => {
    e.preventDefault();
    setActiveInput(inputName);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    event.preventDefault();
    setActiveInput(null);
  };

  const handleChange = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    setForm({ ...form, [target.name]: target.value });
  };

  const handleExit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(logoutThunk());
  };

  const updateUser = (e: SyntheticEvent) => {
    const { name, email } = form;
    e.preventDefault();
    dispatch(updateUserThunk({ name, email }));
  };

  const content = useMemo(() => {
    return (
      <div className={`pt-30  ${profileStyles.container}`}>
        <nav
          className={`text text_type_main-medium ${profileStyles.navigation}`}>
          <Link to={{ pathname: "/profile" }} className={profileStyles.link}>
            <span>Профиль</span>
          </Link>
          <Link to={{ pathname: "/profile" }} className={profileStyles.link}>
            <span className='text_color_inactive'>История заказов</span>
          </Link>
          <Link
            to={{ pathname: "/login" }}
            className={profileStyles.link}
            onClick={handleExit}>
            <span className='text_color_inactive'>Выход</span>
          </Link>
        </nav>
        <form className={profileStyles.form} onSubmit={updateUser}>
          <Input
            value={form.name}
            name='name'
            onChange={handleChange}
            onIconClick={(e) => handleEdit(e, { inputName: "name" })}
            onBlur={handleBlur}
            placeholder='Имя'
            size='default'
            icon={"EditIcon"}
            ref={nameRef}
            disabled={activeInput !== "name"}
          />
          <Input
            value={form.email}
            name='email'
            onChange={handleChange}
            onIconClick={(e) => handleEdit(e, { inputName: "email" })}
            onBlur={handleBlur}
            placeholder='Логин'
            size='default'
            icon={"EditIcon"}
            ref={emailRef}
            disabled={activeInput !== "email"}
          />
          <Input
            value={form.password}
            name='password'
            onChange={handleChange}
            onIconClick={(e) => handleEdit(e, { inputName: "password" })}
            onBlur={handleBlur}
            placeholder='Пароль'
            size='default'
            icon={"EditIcon"}
            disabled={true}
          />
          <Button>Применить</Button>
        </form>
      </div>
    );
  }, [form, activeInput]);

  return content;
}
