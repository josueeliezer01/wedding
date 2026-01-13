import { motion } from "framer-motion";
import { FiCalendar, FiGift, FiClock, FiMapPin } from "react-icons/fi";
import "./ActionButtons.css";

export default function ActionButtons({
  onOpenGiftList,
  onOpenCountdown,
  onOpenMap,
  onOpenRSVP,
  reduceMotion,
}) {
  const handleAddToCalendar = () => {
    const event = {
      title: "Casamento Josué & Gabrielly",
      description:
        "Celebração do casamento de Josué e Gabrielly na Quinta do Lago.",
      location: "Quinta do Lago, Algarve, Portugal",
      startTime: "20260920T163000Z",
      endTime: "20260921T020000Z",
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

  const handleMouseMove = (e) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    currentTarget.style.setProperty("--mouse-x", `${x}px`);
    currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div className="hero-actions">
      <motion.button
        onClick={onOpenRSVP}
        className="hero-cta primary"
        whileHover={reduceMotion ? undefined : { scale: 1.02 }}
        whileTap={reduceMotion ? undefined : { scale: 0.98 }}>
        Confirmar Presença
      </motion.button>

      <div className="hero-secondary-buttons">
        <motion.button
          className="hero-icon-btn glass-dynamic"
          onMouseMove={handleMouseMove}
          onClick={handleAddToCalendar}
          whileTap={{ scale: 0.9 }}
          aria-label="Salvar no Calendário">
          <FiCalendar />
        </motion.button>

        <motion.button
          className="hero-icon-btn glass-dynamic"
          onMouseMove={handleMouseMove}
          style={{ animationDelay: "0.2s" }}
          onClick={onOpenCountdown}
          whileTap={{ scale: 0.9 }}
          aria-label="Ver Contagem Regressiva">
          <FiClock />
        </motion.button>

        <motion.button
          className="hero-icon-btn glass-dynamic"
          onMouseMove={handleMouseMove}
          style={{ animationDelay: "0.4s" }}
          onClick={onOpenMap}
          whileTap={{ scale: 0.9 }}
          aria-label="Ver Localização">
          <FiMapPin />
        </motion.button>

        <motion.button
          className="hero-icon-btn glass-dynamic"
          onMouseMove={handleMouseMove}
          style={{ animationDelay: "0.5s" }}
          onClick={onOpenGiftList}
          whileTap={{ scale: 0.9 }}
          aria-label="Lista de Presentes">
          <FiGift />
        </motion.button>
      </div>
    </div>
  );
}
