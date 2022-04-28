import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ErrorBoundary from "../error-boundary/error-boundary";
import { AppHeader, ProtectedRoute } from "../";
import {
  HomePage,
  LoginPage,
  RegistrationPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  IngredientPage,
} from "../../pages";

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AppHeader />
        <Switch>
          <Route path='/' exact={true}>
            <HomePage />
          </Route>
          <Route path='/login' exact={true}>
            <LoginPage />
          </Route>
          <Route path='/registration' exact={true}>
            <RegistrationPage />
          </Route>
          <Route path='/forgot-password' exact={true}>
            <ForgotPasswordPage />
          </Route>
          <Route path='/reset-password' exact={true}>
            <ResetPasswordPage />
          </Route>
          <ProtectedRoute path='/profile' exact={true}>
            <ProfilePage />
          </ProtectedRoute>
          <Route path='/ingredients/:id' exact={true}>
            <IngredientPage />
          </Route>
          <Route>{/* <NotFound404 /> */}</Route>
        </Switch>
      </Router>
    </ErrorBoundary>
  );
}
