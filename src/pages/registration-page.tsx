import formStyles from "./styles/form.module.css";
import { useState, useCallback, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { registerThunk } from "../services/auth/thunks";
import { useAppDispatch } from "../hooks";

export default function RegistrationPage(): JSX.Element {
  const [form, setForm] = useState<{
    name: string;
    email: string;
    password: string;
  }>({ name: "", email: "", password: "" });
  const dispatch = useAppDispatch();

  const onChange = (e: ChangeEvent) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    setForm({ ...form, [target.name]: target.value });
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(registerThunk({ ...form }));
    },
    [dispatch, form]
  );

  return (
    <form className={formStyles.form} onSubmit={handleSubmit}>
      <h1 className='text text_type_main-medium'>Регистрация</h1>
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
      <Button htmlType='submit'>Зарегистрироваться</Button>
      <div className={formStyles.textContainer}>
        <span className='text_type_main-default text_color_inactive'>
          Уже зарегистрированы?
          <Link to={{ pathname: "/login" }} className={formStyles.link}>
            Войти
          </Link>
        </span>
      </div>
    </form>
  );
}
