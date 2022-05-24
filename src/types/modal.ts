import { ReactNode } from "react";

export interface IModal {
  title?: string;
  children: ReactNode;
  handleClose?: () => void;
}
