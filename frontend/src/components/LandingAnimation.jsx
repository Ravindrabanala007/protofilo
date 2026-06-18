import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LandingAnimation = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 600);
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-bg-primary overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--accent-glow)_0%,transparent_55%)]" />

          {/* Animated grid lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--accent-primary)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          <div className="relative flex flex-col items-center gap-6 px-4">
            {/* Morphing hexagon + pulse rings */}
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-accent-primary/30"
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute inset-2 rounded-full border border-accent-secondary/40"
                animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.4, ease: 'easeInOut' }}
              />

              <motion.svg
                viewBox="0 0 100 100"
                className="w-full h-full"
                initial={{ rotate: 0, scale: 0.5, opacity: 0 }}
                animate={{ rotate: 360, scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              >
                <polygon
                  points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
                  fill="none"
                  stroke="url(#hexGrad)"
                  strokeWidth="2"
                />
                <defs>
                  <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--accent-primary)" />
                    <stop offset="100%" stopColor="var(--accent-secondary)" />
                  </linearGradient>
                </defs>
                <motion.text
                  x="50"
                  y="58"
                  textAnchor="middle"
                  fill="var(--text-primary)"
                  fontSize="22"
                  fontWeight="800"
                  fontFamily="Outfit, sans-serif"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  RB
                </motion.text>
              </motion.svg>
            </div>

            {/* Name slide up */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-widest text-textColor-primary uppercase">
                Ravindra Banala
              </h1>
            </motion.div>

            {/* "Portfolio Loading..." sliding from left to right in a single line */}
            <div className="w-48 sm:w-64 overflow-hidden">
              <motion.p
                className="text-accent-secondary font-heading text-sm sm:text-base tracking-wider whitespace-nowrap"
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                Portfolio Loading...
              </motion.p>
            </div>

            {/* Progress bar */}
            <div className="w-48 sm:w-64 h-1 rounded-full bg-borderColor-base overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.5, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
