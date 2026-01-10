import { useState } from "react";
import Hero from "./components/Hero/Hero.jsx";
import Cursor from "./components/Cursor/Cursor.jsx";
import Curtain from "./components/Curtain/Curtain.jsx";

const App = () => {
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
export default App;
