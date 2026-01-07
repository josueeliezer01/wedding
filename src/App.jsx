import { useState } from "react";
import Hero from "./components/Hero/Hero.jsx";
import Cursor from "./components/Cursor/Cursor.jsx";
import Curtain from "./components/Curtain/Curtain.jsx";

const App = () => {
  const [revealed, setRevealed] = useState(false);

  return (
    <>
      <Cursor />
      {!revealed && <Curtain onComplete={() => setRevealed(true)} />}
      <Hero revealed={revealed} />
    </>
  );
};
export default App;
