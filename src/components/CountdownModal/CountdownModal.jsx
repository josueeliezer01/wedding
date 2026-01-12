import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiClock } from "react-icons/fi";
import Countdown from "../Countdown/Countdown";
import "./CountdownModal.css";

export default function CountdownModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="modal-overlay"
          onClick={onClose}>
          <motion.div
            className="modal-content countdown-modal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={onClose}>
              <FiX />
            </button>

            <div className="modal-icon-header">
              <FiClock />
            </div>

            <h2 className="modal-title">Faltam apenas...</h2>

            <Countdown targetDate="2026-09-20T16:30:00" />

            <p className="modal-footer">Para o grande dia!</p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
