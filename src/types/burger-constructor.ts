import { SyntheticEvent } from "react";
export interface IBurgerConstructor {
  onOrderCreate: (event: SyntheticEvent) => void;
  onIngredientDrop: ({ _id }: { _id: string }) => void;
  onIngredientDelete: ({ id, index }: { id: string; index: number }) => void;
}
