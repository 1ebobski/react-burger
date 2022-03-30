import React from "react";

import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import appHeaderStyles from "./app-header.module.css";

function AppHeader() {
  return (
    <header className={`${appHeaderStyles.header}`}>
      <nav
        className={`text text_type_main-default ${appHeaderStyles.navigation}`}>
        <div
          className={`mt-4 mr-2 mb-4 pt-4 pr-5 pb-4 pl-5 ${appHeaderStyles.tab}`}>
          <BurgerIcon type='primary' />
          <span className='ml-2'>Конструктор</span>
        </div>
        <div
          className={`mt-4 mb-4 pt-4 pr-5 pb-4 pl-5  ${appHeaderStyles.tab}`}>
          <ListIcon type='secondary' />
          <span className='ml-2 text_color_inactive'>Лента заказов</span>
        </div>
        <div className={appHeaderStyles.logo}>
          <Logo />
        </div>

        <div className={`mt-4 mb-4 pt-4 pr-5 pb-4 pl-5 ${appHeaderStyles.tab}`}>
          <ProfileIcon type='secondary' />
          <span className='ml-2 text_color_inactive'>Личный кабинет</span>
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;
