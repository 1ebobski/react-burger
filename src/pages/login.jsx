import formStyles from "./form.module.css";
import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getUserThunk, loginThunk } from "../services/auth";
import { getCookie } from "../utils";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken !== null && accessToken !== "" && refreshToken !== null) {
      dispatch(getUserThunk({ accessToken, refreshToken }));
    }
  }, [dispatch, history]);

  useEffect(() => {
    if (user) {
      history.replace({ pathname: "/" });
    }
  }, [user, history]);

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
    <form className={`text ${formStyles.form}`}>
      <h1 className='text_type_main-medium'>Вход</h1>
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
        Войти
      </Button>
      <footer
        className={`text_type_main-default text_color_inactive ${formStyles.footer}`}>
        <span>
          Вы новый пользователь?
          <Link
            to={{ pathname: "/registration" }}
            className={`ml-1 ${formStyles.link}`}>
            Зарегистрироваться
          </Link>
        </span>
        <span>
          Забыли пароль?
          <Link
            to={{ pathname: "/forgot-password" }}
            className={`ml-1 ${formStyles.link}`}>
            Восстановить пароль
          </Link>
        </span>
      </footer>
    </form>
  );
}
