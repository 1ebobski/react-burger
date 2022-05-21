import { RefObject } from "react";

export interface IBurgerIngredients {
  onTabClick: (
    ref: RefObject<HTMLDivElement>,
    scrollRef: RefObject<HTMLDivElement>
  ) => void;
  onScroll: (
    event: Event,
    scrollRef: RefObject<HTMLDivElement>,
    bunRef: RefObject<HTMLDivElement>,
    sauceRef: RefObject<HTMLDivElement>,
    mainRef: RefObject<HTMLDivElement>
  ) => void;
}
