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
  OrderPage,
  OrderHistoryPage,
  FeedPage,
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
        <Route path='/feed' exact={true} children={<FeedPage />} />
        <Route path='/feed:id' exact={true} children={<OrderPage />} />
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
          exact={true}
          children={<ProfilePage />}
        />
        <ProtectedRoute
          from='unauthorized'
          path='/profile/orders'
          exact={true}
          children={<OrderHistoryPage />}
        />
        <ProtectedRoute
          from='unauthorized'
          path='/profile/orders/:id'
          children={<OrderPage />}
        />
        <Route path='/ingredients/:_id' children={<IngredientDetails />} />
        <Route children={<NotFoundPage />} />
      </Switch>
      {background && (
        <Switch>
          <Route path='/ingredients/:_id'>
            <Modal>
              <IngredientDetails />
            </Modal>
          </Route>
          <Route path='/feed/:orderId'>
            <Modal>
              <OrderPage />
            </Modal>
          </Route>
          <Route path='/profile/orders/:orderId'>
            <Modal>
              <OrderPage />
            </Modal>
          </Route>
        </Switch>
      )}
    </>
  );
}
