import { useEffect, useState, ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import appHeaderStyles from "./app-header.module.css";

type TTab = "constructor" | "feed" | "profile";

export default function AppHeader(): ReactElement {
  const [tab, setTab] = useState<TTab>("constructor");
  const { pathname } = useLocation();

  useEffect(() => {
    const tabName: TTab =
      pathname === "/"
        ? ("constructor" as TTab)
        : (pathname.replace(/\//, "") as TTab);
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
          to={{ pathname: "/feed" }}
          className={`mt-4 mb-4 pt-4 pr-5 pb-4 pl-5  ${appHeaderStyles.link}`}>
          <ListIcon type={tab === "feed" ? "primary" : "secondary"} />
          <span
            className={`ml-2  ${tab !== "feed" ? "text_color_inactive" : ""}`}>
            Лента заказов
          </span>
        </Link>
        <Link to={{ pathname: "/" }} className={appHeaderStyles.logo}>
          <Logo />
        </Link>
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
