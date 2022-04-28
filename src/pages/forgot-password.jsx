import formStyles from "./form.module.css";
import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getUserThunk } from "../services/auth";
import { forgotPasswordThunk } from "../services/password";
import { getCookie } from "../utils";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    if (accessToken && accessToken !== "") {
      dispatch(getUserThunk({ accessToken }));
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
    localStorage.setItem("passwordResetRequested", true);
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
    <form className={`text ${formStyles.form}`}>
      <h1 className='text_type_main-medium'>Восстановление пароля</h1>

      <Input
        value={email}
        name='email'
        onChange={onChange}
        placeholder='Укажите e-mail'
        size='default'
      />

      <Button htmlType='submit' onClick={handleSubmit}>
        Восстановить
      </Button>
      <footer
        className={`text_type_main-default text_color_inactive ${formStyles.footer}`}>
        <span>
          Вспомнили пароль?
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
