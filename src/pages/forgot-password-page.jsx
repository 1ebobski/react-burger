import formStyles from "./styles/form.module.css";
import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getUserThunk } from "../services/auth/thunks";
import { forgotPasswordThunk } from "../services/password/thunks";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      dispatch(getUserThunk());
    }
  }, []);

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
    history.push({
      pathname: "/reset-password",
    });
  });

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
