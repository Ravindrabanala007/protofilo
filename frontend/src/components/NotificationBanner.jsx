import { useEffect, useState } from 'react';
import { getActiveNotification } from '../services/api';
import { usePortfolio } from '../context/PortfolioContext';
import { FaBell, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const BLAST_COLORS = ['#6366f1', '#a855f7', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#8b5cf6'];
const BLAST_SHAPES = ['●', '■', '▲', '★', '✦', '♦', '🎉', '🎊'];

const BLAST_PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 2,
  duration: 2 + Math.random() * 3,
  size: 8 + Math.random() * 14,
  color: BLAST_COLORS[Math.floor(Math.random() * BLAST_COLORS.length)],
  shape: BLAST_SHAPES[Math.floor(Math.random() * BLAST_SHAPES.length)],
  rotation: Math.random() * 360,
  drift: -30 + Math.random() * 60,
}));

/* ─── Confetti / Blast Celebration ─────────────────────
   Spawns colorful particles that rain down when isBlast is true */
const CelebrationBlast = () => {

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none overflow-hidden" aria-hidden="true">
      {BLAST_PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, rotate: 0, opacity: 1, scale: 1 }}
          animate={{ y: '110vh', x: `${p.x + p.drift}vw`, rotate: p.rotation + 720, opacity: 0, scale: 0.5 }}
          transition={{ delay: p.delay, duration: p.duration, ease: 'easeIn' }}
          style={{
            position: 'absolute',
            fontSize: p.size,
            color: p.color,
            top: 0,
            left: 0,
            willChange: 'transform',
          }}
        >
          {p.shape}
        </motion.span>
      ))}
    </div>
  );
};

export const NotificationBanner = () => {
  const { globalBlast } = usePortfolio();
  const [notification, setNotification] = useState(null);
  const [dismissed, setDismissed] = useState(false);
  const [showBlast, setShowBlast] = useState(false);

  useEffect(() => {
    if (globalBlast) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- trigger celebration animation
      setShowBlast(true);
      const timer = setTimeout(() => setShowBlast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [globalBlast]);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const data = await getActiveNotification();
        if (data && data.isActive) {
          setNotification(data);
          if (data.isBlast) {
            setShowBlast(true);
            setTimeout(() => setShowBlast(false), 5000);
          }
        }
      } catch {
        // Silently fail — no notification to show
      }
    };
    fetchNotification();
  }, []);

  if (!notification && !globalBlast) return null;
  if (!notification && globalBlast) return showBlast ? <CelebrationBlast /> : null;
  if (dismissed) return showBlast ? <CelebrationBlast /> : null;

  return (
    <>
      {showBlast && <CelebrationBlast />}
      <AnimatePresence>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 z-[60] border-b border-accent-primary/20 backdrop-blur-xl bg-bg-secondary/90 shadow-sm"
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <span className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center">
                <FaBell className="text-accent-primary text-[10px] sm:text-xs" />
              </span>
              <div className="flex items-center gap-1 sm:gap-2 flex-1 min-w-0">
                <span className="font-heading font-bold text-xs sm:text-sm text-textColor-primary truncate">
                  {notification.title}
                </span>
                <span className="hidden sm:inline text-textColor-muted">—</span>
                <span className="hidden sm:inline text-xs text-textColor-secondary truncate">
                  {notification.message}
                </span>
              </div>
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-bg-primary border border-borderColor-base hover:border-accent-primary flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Dismiss notification"
            >
              <FaTimes className="text-[9px] sm:text-[10px] text-textColor-muted" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default NotificationBanner;
