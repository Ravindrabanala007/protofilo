import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const IntroScreen = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [roleText, setRoleText] = useState('');
  const roles = ["Full Stack Developer", "MERN Stack Developer", "React Developer", "AI Enthusiast"];

  useEffect(() => {
    // 0-2s: Logo animation
    // 2-4s: Name reveal
    // 4-5s: Role typing
    // 5-6s: Slide/Zoom Transition Out
    const timers = [
      setTimeout(() => setStep(1), 1800), // Step 1: Name Reveal
      setTimeout(() => setStep(2), 3400), // Step 2: Role Animation
      setTimeout(() => setStep(3), 5000), // Step 3: Trigger exit transition
      setTimeout(() => onComplete(), 5800) // Complete intro
    ];

    return () => timers.forEach(t => clearTimeout(t));
  }, [onComplete]);

  // Typewriting effect for roles in Step 2
  useEffect(() => {
    if (step !== 2) return;
    
    let currentRoleIdx = 0;
    let currentCharIdx = 0;
    let isDeleting = false;
    let typingSpeed = 70;
    let active = true;

    const type = () => {
      if (!active) return;
      const currentRole = roles[currentRoleIdx];

      if (isDeleting) {
        setRoleText(currentRole.substring(0, currentCharIdx - 1));
        currentCharIdx--;
        typingSpeed = 30;
      } else {
        setRoleText(currentRole.substring(0, currentCharIdx + 1));
        currentCharIdx++;
        typingSpeed = 70;
      }

      if (!isDeleting && currentCharIdx === currentRole.length) {
        // Pause at end
        typingSpeed = 1000;
        isDeleting = true;
      } else if (isDeleting && currentCharIdx === 0) {
        isDeleting = false;
        currentRoleIdx = (currentRoleIdx + 1) % roles.length;
        typingSpeed = 400;
      }

      setTimeout(type, typingSpeed);
    };

    type();

    return () => {
      active = false;
    };
  }, [step]);

  return (
    <AnimatePresence>
      {step < 3 && (
        <motion.div
          className="fixed inset-0 w-full h-full bg-[#0b0c10] flex flex-col items-center justify-center z-[9999] overflow-hidden"
          exit={{ 
            opacity: 0, 
            scale: 1.1,
            filter: 'blur(10px)',
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
          }}
        >
          {/* Animated Background Mesh Glows */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,transparent_60%)]" />
          
          <div className="flex flex-col items-center justify-center text-center px-4 relative z-10">
            {/* Step 0: Futuristic Logo (MERN + AI Orbit) */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="w-48 h-48 mb-8 flex items-center justify-center relative"
            >
              {/* Rotating React Electron Orbit Ellipses */}
              <svg className="absolute w-full h-full animate-[spin_12s_linear_infinite]" viewBox="0 0 100 100">
                <ellipse cx="50" cy="50" rx="42" ry="12" fill="none" stroke="url(#reactGrad)" strokeWidth="1.2" transform="rotate(30, 50, 50)" />
                <ellipse cx="50" cy="50" rx="42" ry="12" fill="none" stroke="url(#reactGrad)" strokeWidth="1.2" transform="rotate(90, 50, 50)" />
                <ellipse cx="50" cy="50" rx="42" ry="12" fill="none" stroke="url(#reactGrad)" strokeWidth="1.2" transform="rotate(150, 50, 50)" />
                <defs>
                  <linearGradient id="reactGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#61dafb" />
                    <stop offset="100%" stopColor="#4f46e5" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Pulsing Brain / Neural Node in center */}
              <motion.div
                animate={{ scale: [0.95, 1.05, 0.95] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                className="w-16 h-16 rounded-full bg-gradient-to-tr from-accent-primary to-accent-secondary flex items-center justify-center shadow-lg shadow-indigo-500/30 z-10 border border-white/10"
              >
                {/* Microchip/Brain Vector path */}
                <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </motion.div>

              {/* Mini orbiting nodes: Mongo leaf, Node green, Express E */}
              <div className="absolute w-full h-full">
                {/* Node (Green dot) */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0b0c10] shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                {/* Mongo (Green Leaf Representation) */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-green-600 rounded-full border-2 border-[#0b0c10] shadow-[0_0_8px_rgba(22,163,74,0.8)]" />
                {/* Express (Violet dot) */}
                <div className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-gray-400 rounded-full border-2 border-[#0b0c10] shadow-[0_0_8px_rgba(156,163,175,0.8)]" />
                {/* AI / React (Blue dot) */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-400 rounded-full border-2 border-[#0b0c10] shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              </div>
            </motion.div>

            {/* Step 1: Name Reveal */}
            <div className="h-16 overflow-hidden">
              <AnimatePresence>
                {step >= 1 && (
                  <motion.h1
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="font-heading text-4xl md:text-5xl font-extrabold tracking-[0.2em] text-white uppercase"
                  >
                    Ravindra Banala
                  </motion.h1>
                )}
              </AnimatePresence>
            </div>

            {/* Step 2: Role Typewriter */}
            <div className="h-10 mt-2">
              <AnimatePresence>
                {step >= 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="font-heading text-lg md:text-xl font-medium text-cyan-400/90 tracking-wider flex items-center justify-center gap-1"
                  >
                    <span>{roleText}</span>
                    <span className="w-1.5 h-5 bg-cyan-400 animate-[ping_0.8s_infinite]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Loading bar along the bottom */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 5, ease: 'linear' }}
              className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary shadow-[0_0_12px_var(--accent-glow)]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
