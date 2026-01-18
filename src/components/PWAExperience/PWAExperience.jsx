import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./PWAExperience.css";

export default function PWAExperience({ revealed, onInstall }) {
  const containerRef = useRef(null);

  const [isInstalled] = useState(() => {
    if (typeof window === "undefined") return false;

    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone ||
      document.referrer.includes("android-app://")
    );
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const ySide = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const yCenter = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);

  const galleryData = {
    col1: [
      "/assets/gallery/foto1.webp",
      "/assets/gallery/foto2.webp",
      "/assets/gallery/foto3.webp",
      "/assets/gallery/foto4.webp",
      "/assets/gallery/foto5.webp",
      "/assets/gallery/foto6.webp",
    ],
    col2: [
      "/assets/gallery/foto7.webp",
      "/assets/gallery/foto8.webp",
      "/assets/gallery/foto8.webp",
      isInstalled ? "/assets/gallery/foto14.webp" : "INSTALL_CARD",
      "/assets/gallery/foto9.webp",
      "/assets/gallery/foto10.webp",
    ],
    col3: [
      "/assets/gallery/foto10.webp",
      "/assets/gallery/foto11.webp",
      "/assets/gallery/foto10.webp",
      "/assets/gallery/foto11.webp",
      "/assets/gallery/foto12.webp",
      "/assets/gallery/foto13.webp",
    ],
  };

  return (
    <section
      className="pwa-scroll-wrapper"
      ref={containerRef}>
      <div className="sticky-container">
        {revealed && (
          <div className="columns">
            <motion.div
              className="column"
              style={{ y: ySide }}>
              {galleryData.col1.map((src, i) => (
                <div
                  key={i}
                  className="column__item"
                  style={{ backgroundImage: `url(${src})` }}
                />
              ))}
            </motion.div>

            <motion.div
              className="column"
              style={{ y: yCenter }}>
              {galleryData.col2.map((item, i) =>
                item === "INSTALL_CARD" ? (
                  <div
                    key={i}
                    className="column__item install-card-item">
                    <div className="install-card-content">
                      <span className="install-label">Salvar Convite</span>
                      <h3>Josué & Gaby</h3>
                      <button
                        className="hero-cta compact-btn"
                        onClick={onInstall}>
                        Instalar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    key={i}
                    className="column__item"
                    style={{ backgroundImage: `url(${item})` }}
                  />
                )
              )}
            </motion.div>

            <motion.div
              className="column"
              style={{ y: ySide }}>
              {galleryData.col3.map((src, i) => (
                <div
                  key={i}
                  className="column__item"
                  style={{ backgroundImage: `url(${src})` }}
                />
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
