import { ReactElement } from "react";
// import { useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { AppHeader, ErrorBoundary, ModalSwitch } from "..";

export default function App(): ReactElement {
  // const { deviceType } = useSelector((store: IStore) => store.app);
  return (
    <ErrorBoundary>
      <Router>
        <AppHeader />
        <ModalSwitch />
      </Router>
    </ErrorBoundary>
  );
}
