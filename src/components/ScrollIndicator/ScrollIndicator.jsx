import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { smoothScrollTo } from "../scrollUtils/scrollUtils";
import "./ScrollIndicator.css";

export const ScrollIndicator = ({ revealed, targetSelector }) => {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    if (!revealed) return;

    const timer = setTimeout(() => {
      if (window.scrollY < 100) setShowArrow(true);
    }, 2500);

    const handleScroll = () => setShowArrow(window.scrollY < 100);
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [revealed]);

  const handleClick = () => {
    const target = document.querySelector(targetSelector);
    smoothScrollTo(target);
  };

  return (
    <AnimatePresence>
      {revealed && showArrow && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="scroll-indicator"
          onClick={handleClick}>
          <div className="arrow-wrapper">
            <svg
              viewBox="0 0 32 32"
              className="custom-arrow-svg">
              <path d="M16,21a1,1,0,0,1-.71-.29l-8-8a1,1,0,1,1,1.42-1.42L16,18.59l7.29-7.3a1,1,0,0,1,1.42,1.42l-8,8A1,1,0,0,1,16,21Z" />
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
