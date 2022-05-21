import { TIngredient } from ".";

export interface IStore {
  auth: {
    user: null | { name: string; email: string };
    registration: {
      request: boolean;
      success: boolean;
      failed: boolean;
    };
    login: {
      request: boolean;
      success: boolean;
      failed: boolean;
    };
    logout: {
      request: boolean;
      success: boolean;
      failed: boolean;
    };
    token: {
      request: boolean;
      success: boolean;
      failed: boolean;
    };
    getUser: {
      request: boolean;
      success: boolean;
      failed: boolean;
    };
    updateUser: {
      request: boolean;
      success: boolean;
      failed: boolean;
    };
  };
  burger: {
    ingredients: TIngredient[] | null;
    selected: TIngredient | null | undefined;
    bun: TIngredient | null;
    fillingList: TIngredient[];
    request: boolean;
    success: boolean;
    failed: boolean;
    tab: "bun" | "sauce" | "main";
  };
  order: {
    ingredients: string[];
    id: string;
    request: boolean;
    success: boolean;
    failed: boolean;
  };
  password: {
    forgot: {
      request: boolean;
      success: boolean;
      failed: boolean;
    };
    reset: {
      request: boolean;
      success: boolean;
      failed: boolean;
    };
  };
}
