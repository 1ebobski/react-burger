import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import appHeaderStyles from "./app-header.module.css";

export default function AppHeader() {
  const [tab, setTab] = useState("constructor");
  const { pathname } = useLocation();

  useEffect(() => {
    const tabName =
      pathname === "/" ? "constructor" : pathname.replace(/\//, "");
    setTab(tabName);
  }, [pathname]);

  return (
    <header className={`${appHeaderStyles.header}`}>
      <nav
        className={`text text_type_main-default ${appHeaderStyles.navigation}`}>
        <Link
          to={{
            pathname: "/",
          }}
          className={`mt-4 mb-4 pt-4 pr-5 pb-4 pl-5 ${appHeaderStyles.link}`}>
          <BurgerIcon type={tab === "constructor" ? "primary" : "secondary"} />
          <span
            className={`ml-2 ${
              tab !== "constructor" ? "text_color_inactive" : ""
            }`}>
            Конструктор
          </span>
        </Link>
        <Link
          to={{ pathname: "/order-list" }}
          className={`mt-4 mb-4 pt-4 pr-5 pb-4 pl-5  ${appHeaderStyles.link}`}>
          <ListIcon type={tab === "order-list" ? "primary" : "secondary"} />
          <span
            className={`ml-2  ${
              tab !== "order-list" ? "text_color_inactive" : ""
            }`}>
            Лента заказов
          </span>
        </Link>
        <div className={appHeaderStyles.logo}>
          <Logo />
        </div>
        <Link
          to={{
            pathname: "/profile",
          }}
          className={`mt-4 mb-4 pt-4 pr-5 pb-4 pl-5 ${appHeaderStyles.link}`}>
          <ProfileIcon type={tab === "profile" ? "primary" : "secondary"} />
          <span
            className={`ml-2 ${
              tab !== "profile" ? "text_color_inactive" : ""
            }`}>
            Личный кабинет
          </span>
        </Link>
      </nav>
    </header>
  );
}
