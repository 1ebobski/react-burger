import { ReactNode } from "react";

export interface IProtectedRoute {
  children: ReactNode;
  from: "unauthorized" | "authorized";
  path: string;
}
