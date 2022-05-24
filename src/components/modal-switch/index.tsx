import { ReactElement } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { ProtectedRoute, Modal, IngredientDetails } from "..";
import {
  HomePage,
  LoginPage,
  RegistrationPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  NotFoundPage,
} from "../../pages";

interface ILocation extends Location {
  background: ILocation;
  state: ILocation | undefined;
}

export default function ModalSwitch(): ReactElement {
  const location = useLocation<ILocation>();
  const background: ILocation = location.state && location.state.background;

  // useEffect(() => {
  //   console.log(location, background);
  // }, [location]);

  return (
    <>
      <Switch location={background || location}>
        <Route path='/' exact={true} children={<HomePage />} />
        <ProtectedRoute
          from='authorized'
          path='/login'
          children={<LoginPage />}
        />
        <ProtectedRoute
          from='authorized'
          path='/registration'
          children={<RegistrationPage />}
        />
        <ProtectedRoute
          from='authorized'
          path='/forgot-password'
          children={<ForgotPasswordPage />}
        />
        <ProtectedRoute
          from='authorized'
          path='/reset-password'
          children={<ResetPasswordPage />}
        />
        <ProtectedRoute
          from='unauthorized'
          path='/profile'
          children={<ProfilePage />}
        />
        <Route path='/ingredients/:_id' children={<IngredientDetails />} />
        <Route children={<NotFoundPage />} />
      </Switch>
      {background && (
        <Route path='/ingredients/:_id'>
          <Modal>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
    </>
  );
}
