import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiMapPin } from "react-icons/fi";
import "./MapModal.css";

export default function MapModal({ isOpen, onClose }) {
  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25479.58972734653!2d-8.063009977340712!3d37.03486911508196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1ab336170f5761%3A0x89d794cccfe54b9c!2sQuinta%20do%20Lago%20Country%20Club!5e0!3m2!1spt-PT!2spt!4v1768242273862!5m2!1spt-PT!2spt";

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="modal-overlay"
          onClick={onClose}>
          <motion.div
            className="modal-content map-modal-content"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={onClose}
              aria-label="Fechar">
              <FiX />
            </button>

            <div className="modal-icon-header">
              <FiMapPin />
            </div>

            <h2 className="modal-title">Como Chegar</h2>
            <p className="modal-intro">Quinta do Lago, Algarve</p>

            <div className="map-container">
              <iframe
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa Quinta do Lago"></iframe>
            </div>

            <p className="modal-footer map-footer">
              Toque no mapa para abrir a navegação
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
