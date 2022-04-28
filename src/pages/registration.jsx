import formStyles from "./form.module.css";
import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getUserThunk, registerThunk } from "../services/auth";
import { getCookie } from "../utils";

export default function RegistrationPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    if (accessToken !== "") {
      dispatch(getUserThunk({ accessToken }));
    }
  }, [dispatch]);

  const onChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(registerThunk({ ...form }));
    },
    [dispatch, form]
  );

  if (user) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }

  return (
    <form className={`text ${formStyles.form}`}>
      <h1 className='text_type_main-medium'>Регистрация</h1>
      <Input
        value={form.name}
        name='name'
        onChange={onChange}
        placeholder='Имя'
        size='default'
      />
      <Input
        value={form.email}
        name='email'
        onChange={onChange}
        placeholder='E-mail'
        size='default'
      />
      <PasswordInput
        value={form.password}
        name='password'
        onChange={onChange}
        size='default'
      />
      <Button htmlType='submit' onClick={handleSubmit}>
        Зарегистрироваться
      </Button>
      <footer
        className={`text_type_main-default text_color_inactive ${formStyles.footer}`}>
        <span>
          Уже зарегистрированы?
          <Link
            to={{ pathname: "/login" }}
            className={`ml-1 ${formStyles.link}`}>
            Войти
          </Link>
        </span>
      </footer>
    </form>
  );
}
