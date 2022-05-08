import formStyles from "./styles/form.module.css";
import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { forgotPasswordThunk } from "../services/password/thunks";
import { Loader } from "../components";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { success, request } = useSelector((store) => store.password.forgot);

  const onChange = useCallback(
    (e) => {
      e.preventDefault();
      setEmail(e.target.value);
    },
    [email]
  );

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    dispatch(forgotPasswordThunk({ email }));
  });

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
