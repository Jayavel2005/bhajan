import { motion } from 'framer-motion';

export const Button = ({ children, className = '', onClick, type = 'button' }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      type={type}
      className={`relative px-8 py-3 rounded-full font-semibold tracking-wide text-brand-dark 
        bg-gradient-to-r from-brand-saffron to-brand-gold glow-gold glow-gold-hover transition-all 
        ${className}`}
    >
      {children}
    </motion.button>
  );
};
