import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export function ProtectedRoute({ children, ...rest }) {
  const { user } = useSelector((store) => store.auth);

  return (
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
  );
}
