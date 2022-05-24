import { ReactElement } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppHeader, ErrorBoundary, ModalSwitch } from "..";

export default function App(): ReactElement {
  return (
    <ErrorBoundary>
      <Router>
        <AppHeader />
        <ModalSwitch />
      </Router>
    </ErrorBoundary>
  );
}
