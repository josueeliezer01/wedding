import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import InvitationPage from "./components/InvitationPage/InvitationPage";
import AdminRSVP from "./components/AdminRSVP/AdminRSVP";
import Cursor from "./components/Cursor/Cursor";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div>
        <Cursor />
        <Routes>
          <Route
            path="/"
            element={<InvitationPage />}
          />
          <Route
            path="/admin"
            element={<AdminRSVP />}
          />
          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
