import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./Curtain.css";

const Curtain = ({ onComplete }) => {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.body.classList.add("curtain--no-scroll");
    return () => document.body.classList.remove("curtain--no-scroll");
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      document.body.classList.remove("curtain--no-scroll");
      onComplete?.();
    }
  }, [reduceMotion, onComplete]);

  if (reduceMotion) return null;

  const easingSlowEnd = [0.16, 1, 0.3, 1];

  return (
    <>
      <motion.div
        className="curtain curtain--back"
        initial={{ y: "0%", scale: 1, opacity: 1 }}
        animate={{
          y: "-100%",
          scale: 0.96,
          opacity: 0,
        }}
        transition={{
          duration: 1.8,
          ease: easingSlowEnd,
        }}
        aria-hidden="true"
      />

      <motion.div
        className="curtain curtain--front"
        initial={{ y: "0%" }}
        animate={{ y: "-100%" }}
        transition={{
          duration: 1.2,
          delay: 0.6,
          ease: easingSlowEnd,
        }}
        onAnimationComplete={() => {
          document.body.classList.remove("curtain--no-scroll");
          onComplete?.();
        }}
        aria-hidden="true"
      />
    </>
  );
};

export default Curtain;
