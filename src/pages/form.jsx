import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Registration from "./registration";
import SignInPage from "./login";

export default function FormPage({ children }) {
  return (
    <Router>
      <Switch>
        <Route path='/login' exact={true}>
          <SignInPage />
        </Route>
        <Route path='/registration' exact={true}>
          <Registration />
        </Route>
      </Switch>
    </Router>
  );
}
