import formStyles from "./styles/form.module.css";
import { useState, useCallback, SyntheticEvent } from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { forgotPasswordThunk } from "../services/password/thunks";
import { Loader } from "../components";
import { IStore } from "../types";
import { useAppDispatch } from "../hooks";

export default function ForgotPasswordPage(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const dispatch = useAppDispatch();
  const { success, request } = useSelector(
    (store: IStore) => store.password.forgot
  );

  const onChange = useCallback(
    (e) => {
      e.preventDefault();
      setEmail(e.target.value);
    },
    [email]
  );

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(forgotPasswordThunk({ email }));
  };

  return request ? (
    <Loader size='large' />
  ) : success ? (
    <Redirect
      to={{
        pathname: "/reset-password",
      }}
    />
  ) : (
    <form className={formStyles.form} onSubmit={handleSubmit}>
      <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
      <Input
        value={email}
        name='email'
        onChange={onChange}
        placeholder='Укажите e-mail'
        size='default'
      />

      <Button htmlType='submit'>Восстановить</Button>
      <div className={formStyles.textContainer}>
        <span className='text text_type_main-default text_color_inactive'>
          Вспомнили пароль?
          <Link
            to={{ pathname: "/login" }}
            className={`ml-1 ${formStyles.link}`}>
            Войти
          </Link>
        </span>
      </div>
    </form>
  );
}
