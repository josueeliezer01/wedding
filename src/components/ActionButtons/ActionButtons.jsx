import { motion } from "framer-motion";
import { FiCalendar, FiGift, FiClock } from "react-icons/fi";
import "./ActionButtons.css";

export default function ActionButtons({
  onOpenGiftList,
  onOpenCountdown,
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

  return (
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
          style={{ animationDelay: "0.2s" }}
          onClick={onOpenCountdown}
          whileTap={{ scale: 0.9 }}
          aria-label="Ver Contagem Regressiva">
          <FiClock />
        </motion.button>

        <motion.button
          className="hero-icon-btn"
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
