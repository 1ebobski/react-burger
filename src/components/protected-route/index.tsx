import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { getUserThunk } from "../../services/auth/thunks";
import { Loader } from "..";
import { IStore, IProtectedRoute } from "../../types";
import { useAppDispatch } from "../../hooks";

export default function ProtectedRoute({
  children,
  from = "unauthorized",
  path,
}: IProtectedRoute): JSX.Element {
  const { user, getUser } = useSelector((store: IStore) => store.auth);
  const { request } = getUser;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user === null) {
      dispatch(getUserThunk());
    }
  }, []);

  return user === null && request ? (
    <Loader size='large' />
  ) : from === "unauthorized" ? (
    <Route
      path={path}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  ) : (
    <Route
      path={path}
      render={({ location }) =>
        !user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
