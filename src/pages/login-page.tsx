import formStyles from "./styles/form.module.css";
import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { loginThunk } from "../services/auth/thunks";
import { useAppDispatch } from "../hooks";

export default function LoginPage() {
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();

  const onChange = useCallback(
    (e) => {
      e.preventDefault();
      setForm({ ...form, [e.target.name]: e.target.value });
    },
    [form]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(loginThunk({ ...form }));
    },
    [dispatch, form]
  );

  return (
    <form className={formStyles.form} onSubmit={handleSubmit}>
      <h1 className='text text_type_main-medium'>Вход</h1>
      <Input
        value={form.email}
        name='email'
        type='email'
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
      <Button htmlType='submit'>Войти</Button>
      <div className={formStyles.textContainer}>
        <span className='text text_type_main-default text_color_inactive'>
          Вы новый пользователь?
          <Link to={{ pathname: "/registration" }} className={formStyles.link}>
            Зарегистрироваться
          </Link>
        </span>
        <span className='text text_type_main-default text_color_inactive'>
          Забыли пароль?
          <Link
            to={{ pathname: "/forgot-password" }}
            className={formStyles.link}>
            Восстановить пароль
          </Link>
        </span>
      </div>
    </form>
  );
}
