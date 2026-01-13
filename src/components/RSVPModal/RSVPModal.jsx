import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCheckCircle, FiLoader } from "react-icons/fi";
import { useState } from "react";
import "./RSVPModal.css";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

export default function RSVPModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    status: "presente",
    guests: 1,
  });

  const handleStatusChange = (newStatus) => {
    setFormData({
      ...formData,
      status: newStatus,
      guests:
        newStatus === "ausente"
          ? 0
          : formData.guests === 0
          ? 1
          : formData.guests,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Por favor, insira seu nome completo.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/confirmations`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          name: formData.name,
          status: formData.status,
          guests_count: formData.guests,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro Supabase:", errorData);
        throw new Error("Falha na submissão");
      }

      setSuccess(true);
    } catch (err) {
      console.error("Erro completo:", err);
      alert(
        "Houve um problema técnico. Por favor, tente novamente ou confirme via WhatsApp."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="modal-overlay"
          onClick={onClose}>
          <motion.div
            className="modal-content rsvp-modal"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={onClose}>
              <FiX />
            </button>

            {!success ? (
              <>
                <h2 className="modal-title">Confirmar Presença</h2>
                <p className="modal-intro">Será um prazer ter você connosco!</p>

                <form
                  onSubmit={handleSubmit}
                  className="rsvp-form">
                  <div className="input-group">
                    <label>Seu Nome Completo</label>
                    <input
                      required
                      type="text"
                      placeholder="Ex: João Silva"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="input-group">
                    <label>Você estará presente?</label>
                    <div className="radio-group">
                      <button
                        type="button"
                        className={
                          formData.status === "presente" ? "active" : ""
                        }
                        onClick={() => handleStatusChange("presente")}>
                        Sim, estarei!
                      </button>
                      <button
                        type="button"
                        className={
                          formData.status === "ausente" ? "active" : ""
                        }
                        onClick={() => handleStatusChange("ausente")}>
                        Infelizmente não
                      </button>
                    </div>
                  </div>

                  <div
                    className={`input-group ${
                      formData.status === "ausente" ? "disabled-opacity" : ""
                    }`}>
                    <label>Total de Pessoas (Incluindo você)</label>
                    <select
                      disabled={formData.status === "ausente"}
                      value={formData.guests}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          guests: parseInt(e.target.value),
                        })
                      }>
                      {formData.status === "ausente" ? (
                        <option value={0}>0 Pessoas</option>
                      ) : (
                        [1, 2, 3, 4, 5].map((n) => (
                          <option
                            key={n}
                            value={n}>
                            {n} {n === 1 ? "Pessoa" : "Pessoas"}
                          </option>
                        ))
                      )}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="hero-cta"
                    disabled={loading}>
                    {loading ? (
                      <FiLoader className="spin" />
                    ) : (
                      "Confirmar Agora"
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="success-view">
                <FiCheckCircle
                  size={60}
                  color="var(--color-primary)"
                />
                <h2>Obrigado!</h2>
                <p>Sua confirmação foi enviada com sucesso.</p>
                <button
                  onClick={onClose}
                  className="hero-cta">
                  Fechar
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
