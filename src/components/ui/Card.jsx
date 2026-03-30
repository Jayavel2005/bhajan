import { motion } from 'framer-motion';

export const Card = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className={`card-border bg-white/5 backdrop-blur-md rounded-2xl p-6 transition-colors hover:bg-white/10 ${className}`}
    >
      {children}
    </motion.div>
  );
};
