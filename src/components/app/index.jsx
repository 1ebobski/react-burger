import { BrowserRouter as Router } from "react-router-dom";
import { AppHeader, ErrorBoundary, ModalSwitch } from "..";

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AppHeader />
        <ModalSwitch />
      </Router>
    </ErrorBoundary>
  );
}
