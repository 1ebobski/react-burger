import formStyles from "./styles/form.module.css";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, Redirect } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { resetPasswordThunk } from "../services/password/thunks";
import { Loader } from "../components";

export default function ResetPasswordPage() {
  const [form, setForm] = useState({ password: "", code: "" });
  const dispatch = useDispatch();
  const history = useHistory();
  const requested = localStorage.getItem("passwordResetRequested");
  const { request, success } = useSelector((store) => store.password.reset);

  useEffect(() => {
    if (!requested) {
      history.replace({ pathname: "/forgot-password" });
    }
  }, []);

  const onChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(resetPasswordThunk({ ...form }));
    },
    [dispatch, form]
  );

  return request ? (
    <Loader size='large' />
  ) : success ? (
    <Redirect
      to={{
        pathname: "/login",
      }}
    />
  ) : (
    <form className={formStyles.form} onSubmit={handleSubmit}>
      <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
      <Input
        value={form.password}
        name='password'
        onChange={onChange}
        placeholder='Введите новый пароль'
        size='default'
      />
      <Input
        value={form.code}
        name='code'
        onChange={onChange}
        placeholder='Введите код из письма'
        size='default'
      />

      <Button htmlType='submit'>Сохранить</Button>
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
