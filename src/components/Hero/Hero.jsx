import {
  motion,
  useReducedMotion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useState, useEffect, useRef } from "react";
import HeroBackground from "../HeroBackground/HeroBackground";
import Confetti from "../Confetti/Confetti";
import { FiCalendar, FiGift, FiX } from "react-icons/fi";
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

  const handleAddToCalendar = () => {
    const event = {
      title: "Casamento Josué & Gabrielly",
      description:
        "Celebração do casamento de Josué e Gabrielly na Quinta do Lago.",
      location: "Quinta do Lago, Algarve, Portugal",
      startTime: "20250920T163000Z",
      endTime: "20250921T020000Z",
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:${window.location.href}
DTSTART:${event.startTime}
DTEND:${event.endTime}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "casamento-josue-gabrielly.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

        <div className="hero-actions">
          <motion.a
            href="https://wa.me/351915907925?text=Olá! Gostaria de confirmar minha presença no casamento de Josué e Gabrielly."
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta primary"
            whileHover={reduceMotion ? undefined : { scale: 1.02 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}>
            Confirmar Presença
          </motion.a>

          <div className="hero-secondary-buttons">
            <motion.button
              className="hero-icon-btn"
              onClick={handleAddToCalendar}
              whileTap={{ scale: 0.9 }}
              aria-label="Salvar no Calendário">
              <FiCalendar />
            </motion.button>

            <motion.button
              className="hero-icon-btn"
              style={{ animationDelay: "0.5s" }}
              onClick={() => setShowGiftModal(true)}
              whileTap={{ scale: 0.9 }}
              aria-label="Lista de Presentes">
              <FiGift />
            </motion.button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showGiftModal && (
          <div
            className="modal-overlay"
            onClick={() => setShowGiftModal(false)}>
            <motion.div
              className="modal-content"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}>
              <button
                className="modal-close"
                onClick={() => setShowGiftModal(false)}>
                <FiX />
              </button>
              <h2 className="modal-title">Sugestões de Presentes</h2>
              <p className="modal-intro">
                Sua presença é o maior presente, mas se desejar nos presentear,
                aqui estão algumas sugestões:
              </p>
              <ul className="gift-list">
                <li>Contribuição para Lua de Mel</li>
                <li>Jogo de Jantar em Porcelana</li>
                <li>Conjunto de Cristais</li>
                <li>Eletrodomésticos (Liquidificador, Air Fryer)</li>
                <li>Vale-presente Loja Decoração</li>
              </ul>
              <p className="modal-footer">Muito obrigado pelo carinho!</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Confetti
        start={confettiStart}
        duration={confettiDuration}
        particleCount={72}
      />
    </section>
  );
}
