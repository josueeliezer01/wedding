import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import "./GiftModal.css";

export default function GiftModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="modal-overlay"
          onClick={onClose}>
          <motion.div
            className="modal-content"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={onClose}>
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
  );
}
