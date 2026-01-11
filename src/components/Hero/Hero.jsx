import {
  motion,
  useReducedMotion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { useState, useEffect, useRef } from "react";
import HeroBackground from "../HeroBackground/HeroBackground";
import Confetti from "../Confetti/Confetti";
import "./Hero.css";

const containerVariants = {
  hidden: {
    scale: 0,
    y: 220,
    rotateX: 14,
  },
  visible: {
    scale: [0.25, 1.25, 0.94, 1],
    y: [220, -32, 12, 0],
    rotateX: [14, -6, 3, 0],
    transition: {
      duration: 1.05,
      times: [0, 0.5, 0.78, 1],
      ease: ["easeOut", "easeInOut", "easeOut"],
    },
  },
};

export default function Hero({ revealed = false }) {
  const reduceMotion = useReducedMotion();
  const shouldAnimate = revealed && !reduceMotion;

  const [confettiStart, setConfettiStart] = useState(false);
  const confettiDuration = 4500;

  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  const baseX = useMotionValue(0);
  const baseY = useMotionValue(0);

  const smoothX = useSpring(baseX, {
    stiffness: 80,
    damping: 25,
    mass: 1.2,
  });

  const smoothY = useSpring(baseY, {
    stiffness: 80,
    damping: 25,
    mass: 1.2,
  });

  const rotateX = useTransform(smoothY, [-100, 100], [20, -20]);
  const rotateY = useTransform(smoothX, [-100, 100], [-20, 20]);

  const translateX = useTransform(
    smoothX,
    [-100, 100],
    isMobile ? [-20, 20] : [-20, 20]
  );

  const translateY = useTransform(
    smoothY,
    [-100, 100],
    isMobile ? [-20, 20] : [-20, 20]
  );

  const rafRef = useRef(null);

  useEffect(() => {
    if (reduceMotion) return;

    const amplitude = isMobile ? 60 : 80;
    const freqA = 0.0005;
    const freqB = 0.0007;

    const tick = (time) => {
      baseX.set(Math.sin(time * freqA) * amplitude);
      baseY.set(Math.cos(time * freqB) * amplitude);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => rafRef.current && cancelAnimationFrame(rafRef.current);
  }, [reduceMotion, isMobile, baseX, baseY]);

  const handlePointerMove = (e) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    baseX.set(e.clientX - rect.left - rect.width / 2);
    baseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handlePointerLeave = () => {
    if (reduceMotion) return;
    baseX.set(0);
    baseY.set(0);
  };

  return (
    <section
      className="hero-section"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}>
      <HeroBackground />

      <motion.div
        className="hero-inner"
        variants={containerVariants}
        initial="hidden"
        animate={shouldAnimate ? "visible" : false}
        onAnimationComplete={() => {
          if (shouldAnimate) {
            setConfettiStart(true);
            setTimeout(() => setConfettiStart(false), confettiDuration + 800);
          }
        }}>
        <motion.div
          className="hero-move"
          style={
            reduceMotion
              ? undefined
              : {
                  rotateX,
                  rotateY,
                  x: translateX,
                  y: translateY,
                  transformPerspective: 1200,
                }
          }>
          <h1 className="hero-title">
            Josué
            <br /> &amp;
            <br /> Gabrielly
          </h1>
        </motion.div>

        <div className="hero-content-block">
          <p className="hero-desc">
            Estão convidados para celebrar connosco este momento especial!
          </p>

          <div className="hero-details">
            <div className="detail-item">
              <span className="detail-label">Sábado</span>
              <span className="detail-value">20 Setembro 2025</span>
            </div>
            <div className="detail-divider" />
            <div className="detail-item">
              <span className="detail-label">Às</span>
              <span className="detail-value">16:30 Horas</span>
            </div>
          </div>

          <p className="hero-location">Quinta do Lago, Algarve</p>
        </div>

        <div className="hero-actions">
          <motion.button
            className="hero-cta primary"
            whileHover={reduceMotion ? undefined : { scale: 1.02 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}>
            Confirmar Presença
          </motion.button>

          <div className="hero-secondary-actions"></div>
        </div>
      </motion.div>

      <Confetti
        start={confettiStart}
        duration={confettiDuration}
        particleCount={72}
      />
    </section>
  );
}
