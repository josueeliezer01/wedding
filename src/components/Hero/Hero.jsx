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
import ActionButtons from "../ActionButtons/ActionButtons";
import GiftModal from "../GiftModal/GiftModal";
import "./Hero.css";

const containerVariants = {
  hidden: { scale: 0, y: 220, rotateX: 14 },
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
  const [showGiftModal, setShowGiftModal] = useState(false);
  const reduceMotion = useReducedMotion();
  const shouldAnimate = revealed && !reduceMotion;

  const [confettiStart, setConfettiStart] = useState(false);
  const confettiDuration = 4500;

  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  // --- Lógica de Movimento (Parallax/Tilt) ---
  const baseX = useMotionValue(0);
  const baseY = useMotionValue(0);
  const smoothX = useSpring(baseX, { stiffness: 80, damping: 25, mass: 1.2 });
  const smoothY = useSpring(baseY, { stiffness: 80, damping: 25, mass: 1.2 });

  const rotateX = useTransform(smoothY, [-100, 100], [20, -20]);
  const rotateY = useTransform(smoothX, [-100, 100], [-20, 20]);
  const translateX = useTransform(smoothX, [-100, 100], [-20, 20]);
  const translateY = useTransform(smoothY, [-100, 100], [-20, 20]);

  const rafRef = useRef(null);

  useEffect(() => {
    if (reduceMotion) return;
    const amplitude = isMobile ? 60 : 80;
    const tick = (time) => {
      baseX.set(Math.sin(time * 0.0005) * amplitude);
      baseY.set(Math.cos(time * 0.0007) * amplitude);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => rafRef.current && cancelAnimationFrame(rafRef.current);
  }, [reduceMotion, isMobile, baseX, baseY]);

  return (
    <section className="hero-section">
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

        <ActionButtons
          reduceMotion={reduceMotion}
          onOpenGiftList={() => setShowGiftModal(true)}
        />
      </motion.div>

      <GiftModal
        isOpen={showGiftModal}
        onClose={() => setShowGiftModal(false)}
      />

      <Confetti
        start={confettiStart}
        duration={confettiDuration}
        particleCount={72}
      />
    </section>
  );
}
