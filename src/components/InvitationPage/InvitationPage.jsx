import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Hero from "../Hero/Hero";
import Curtain from "../Curtain/Curtain";
import PWAExperience from "../PWAExperience/PWAExperience";
import { ScrollIndicator } from "../ScrollIndicator/ScrollIndicator";
import { usePWA } from "../usePWA/usePWA";

const InvitationPage = () => {
  const [revealed, setRevealed] = useState(false);
  const [showCurtain, setShowCurtain] = useState(true);
  const { install } = usePWA();

  const handleCurtainComplete = () => {
    setRevealed(true);
    setTimeout(() => setShowCurtain(false), 2000);
  };

  return (
    <div className="app-container">
      <AnimatePresence>
        {showCurtain && <Curtain onComplete={handleCurtainComplete} />}
      </AnimatePresence>

      <main className="main-content">
        <Hero revealed={revealed} />
        <PWAExperience
          revealed={revealed}
          onInstall={install}
        />
        <ScrollIndicator
          revealed={revealed}
          targetSelector=".pwa-scroll-wrapper"
        />
      </main>
    </div>
  );
};

export default InvitationPage;
