import { useEffect, useState } from "react";
import "./Cursor.css";

const Cursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="custom-cursor"
      style={{
        left: pos.x,
        top: pos.y,
        transform: "translate(-50%, -50%)",
      }}
      aria-hidden="true"
    />
  );
};

export default Cursor;
