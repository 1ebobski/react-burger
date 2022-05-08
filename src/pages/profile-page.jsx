import profileStyles from "./styles/profile.module.css";
import { useEffect, useState, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { updateUserThunk, logoutThunk } from "../services/auth/thunks";

export default function ProfilePage() {
  const initialState = {
    name: "",
    email: "",
    password: "",
  };

  const [form, setForm] = useState(initialState);
  const [activeInput, setActiveInput] = useState(null);

  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const inputsRef = useRef({});

  useEffect(() => {
    if (user) {
      setForm({ ...user, password: "******" });
    }
  }, []);

  useEffect(() => {
    if (activeInput) {
      for (const key in form) {
        if (key === activeInput) {
          inputsRef.current[key].focus();
        } else {
          inputsRef.current[key].blur();
        }
      }
    }
  }, [activeInput]);

  const handleEdit = (e, { inputName }) => {
    e.preventDefault();
    setActiveInput(inputName);
  };

  const handleBlur = (e) => {
    e.preventDefault();
    setActiveInput(null);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleExit = (e) => {
    e.preventDefault();
    dispatch(logoutThunk());
  };

  const updateUser = (e) => {
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
            ref={(input) => (inputsRef.current.name = input)}
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
            ref={(input) => (inputsRef.current.email = input)}
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
            ref={(input) => (inputsRef.current.password = input)}
            disabled={true}
          />
          <Button>Применить</Button>
        </form>
      </div>
    );
  }, [form, activeInput]);

  return content;
}
