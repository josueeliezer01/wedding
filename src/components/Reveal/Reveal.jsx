import { motion } from "framer-motion";
import "./Reveal.css";

const Reveal = ({ children }) => {
  return (
    <motion.div
      className="reveal"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
};

export default Reveal;
