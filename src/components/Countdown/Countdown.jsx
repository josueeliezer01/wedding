import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Countdown.css";

export default function Countdown({ targetDate = "2025-09-20T16:30:00" }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        min: Math.floor((difference / 1000 / 60) % 60),
        seg: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timerComponents = Object.keys(timeLeft).map((interval) => (
    <div
      className="countdown-item"
      key={interval}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={timeLeft[interval]}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          className="countdown-value">
          {String(timeLeft[interval]).padStart(2, "0")}
        </motion.span>
      </AnimatePresence>
      <span className="countdown-label">{interval}</span>
    </div>
  ));

  return (
    <div className="countdown-container">
      {timerComponents.length ? (
        <div className="countdown-grid">{timerComponents}</div>
      ) : (
        <span className="countdown-finished">É hoje! ❤️</span>
      )}
    </div>
  );
}
