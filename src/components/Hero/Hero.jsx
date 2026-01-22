import {
  motion,
  useReducedMotion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Confetti from "../Confetti/Confetti";
import ActionButtons from "../ActionButtons/ActionButtons";
import GiftModal from "../GiftModal/GiftModal";
import CountdownModal from "../CountdownModal/CountdownModal";
import MapModal from "../MapModal/MapModal";
import RSVPModal from "../RSVPModal/RSVPModal";
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
  const [showCountdownModal, setShowCountdownModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showRSVPModal, setShowRSVPModal] = useState(false);
  const reduceMotion = useReducedMotion();
  const shouldAnimate = revealed && !reduceMotion;

  const [confettiStart, setConfettiStart] = useState(false);
  const confettiDuration = 4500;

  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  const baseX = useMotionValue(0);
  const baseY = useMotionValue(0);
  const smoothX = useSpring(baseX, { stiffness: 80, damping: 25, mass: 1.2 });
  const smoothY = useSpring(baseY, { stiffness: 80, damping: 25, mass: 1.2 });
  const rotateX = useTransform(smoothY, [-100, 100], [20, -20]);
  const rotateY = useTransform(smoothX, [-100, 100], [-20, 20]);
  const translateX = useTransform(smoothX, [-100, 100], [-15, 15]);
  const translateY = useTransform(smoothY, [-100, 100], [-15, 15]);

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
      <div className="hero-bg__spot hero-bg__spot--left" />
      <div className="hero-bg__spot hero-bg__spot--right" />

      <motion.div
        className="hero-inner"
        variants={containerVariants}
        initial="hidden"
        animate={shouldAnimate ? "visible" : false}
        onAnimationComplete={() => {
          if (shouldAnimate) {
            setTimeout(() => {
              setConfettiStart(true);
              setTimeout(() => setConfettiStart(false), confettiDuration + 800);
            }, 150);
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
                  transformPerspective: 800,
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
              <span className="detail-label">Domingo</span>
              <span className="detail-value">20 Setembro 2026</span>
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
          onOpenRSVP={() => setShowRSVPModal(true)}
          onOpenGiftList={() => setShowGiftModal(true)}
          onOpenCountdown={() => setShowCountdownModal(true)}
          onOpenMap={() => setShowMapModal(true)}
        />
      </motion.div>

      <RSVPModal
        isOpen={showRSVPModal}
        onClose={() => setShowRSVPModal(false)}
      />

      <GiftModal
        isOpen={showGiftModal}
        onClose={() => setShowGiftModal(false)}
      />

      <CountdownModal
        isOpen={showCountdownModal}
        onClose={() => setShowCountdownModal(false)}
      />

      <MapModal
        isOpen={showMapModal}
        onClose={() => setShowMapModal(false)}
      />

      <Confetti
        start={confettiStart}
        duration={confettiDuration}
        particleCount={72}
      />
    </section>
  );
}
