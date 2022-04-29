import formStyles from "./styles/form.module.css";
import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getUserThunk } from "../services/auth/thunks";
import { resetPasswordThunk } from "../services/password/thunks";

export default function ResetPasswordPage() {
  const [form, setForm] = useState({ password: "", code: "" });
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      dispatch(getUserThunk());
    }
  }, []);

  useEffect(() => {
    const requested = localStorage.getItem("passwordResetRequested");
    if (user) {
      history.replace({ pathname: "/" });
    } else {
      if (!requested) {
        history.replace({ pathname: "/login" });
      }
    }
  }, [user, history]);

  const onChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(resetPasswordThunk({ ...form }));
      localStorage.removeItem("passwordResetRequested");
      history.push({
        pathname: "/login",
      });
    },
    [dispatch, history, form]
  );

  return (
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
