import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Hero from "./components/Hero/Hero.jsx";
import Cursor from "./components/Cursor/Cursor.jsx";
import Curtain from "./components/Curtain/Curtain.jsx";
import AdminRSVP from "./components/AdminRSVP/AdminRSVP.jsx";

const InvitationPage = () => {
  const [revealed, setRevealed] = useState(false);
  const [showCurtain, setShowCurtain] = useState(true);

  return (
    <>
      <Cursor />
      {showCurtain && (
        <Curtain
          onComplete={() => {
            setRevealed(true);
            setTimeout(() => setShowCurtain(false), 2000);
          }}
        />
      )}
      <Hero revealed={revealed} />
    </>
  );
};

const App = () => {
  return (
    <Router>
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
    </Router>
  );
};

export default App;
