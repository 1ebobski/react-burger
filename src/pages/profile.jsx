import profileStyles from "./profile.module.css";
import { useCallback, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { getUserThunk, updateUserThunk, logoutThunk } from "../services/auth";
import { getCookie, setCookie } from "../utils";

export default function ProfilePage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    dispatch(getUserThunk({ accessToken }));
  }, [dispatch]);

  useEffect(() => {
    setForm({ ...form, ...user });
  }, [form, user]);

  const onChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleExit = (e) => {
    e.preventDefault();
    const refreshToken = localStorage.getItem("refreshToken");
    dispatch(logoutThunk({ refreshToken }));
    setCookie("accessToken", "");
    localStorage.removeItem("refreshToken");
  };

  const updateData = useCallback(
    (e) => {
      e.preventDefault();
      const accessToken = getCookie("accessToken");
      dispatch(
        updateUserThunk({
          accessToken,
          ...form,
        })
      );
    },
    [form, dispatch]
  );

  const handleEditClick = (e) => {
    e.preventDefault();
  };

  return (
    <div className={`pt-30  ${profileStyles.container}`}>
      <nav className={`text text_type_main-medium ${profileStyles.navigation}`}>
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
      <form className={profileStyles.form}>
        <Input
          value={form.name}
          name='name'
          onChange={onChange}
          onIconClick={handleEditClick}
          placeholder='Имя'
          size='default'
          icon={"EditIcon"}
          ref={nameRef}
          // disabled
        ></Input>
        <Input
          value={form.email}
          name='email'
          onChange={onChange}
          onIconClick={handleEditClick}
          placeholder='Логин'
          size='default'
          icon={"EditIcon"}
          ref={emailRef}
          // disabled
        ></Input>
        <Input
          value={form.password}
          name='password'
          onChange={onChange}
          onIconClick={handleEditClick}
          placeholder='Пароль'
          size='default'
          icon={"EditIcon"}
          ref={passwordRef}
          disabled></Input>
        <Button onClick={updateData}>Применить</Button>
      </form>
    </div>
  );
}
