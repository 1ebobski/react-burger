import { ReactNode } from "react";

export interface IDraggableContainer {
  id: string;
  index: number;
  moveComponent: (dragIndex: number, hoverIndex: number) => void;
  children: ReactNode;
}
