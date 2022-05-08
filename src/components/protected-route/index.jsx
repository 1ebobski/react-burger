import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { getUserThunk } from "../../services/auth/thunks";
import { Loader } from "..";
import PropTypes from "prop-types";

export default function ProtectedRoute({
  children,
  from = "unauthorized",
  ...rest
}) {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user === undefined) {
      dispatch(getUserThunk());
    }
  }, []);

  return user === undefined ? (
    <Loader size='large' />
  ) : from === "unauthorized" ? (
    <Route
      {...rest}
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
      {...rest}
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

ProtectedRoute.propTypes = {
  from: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};
