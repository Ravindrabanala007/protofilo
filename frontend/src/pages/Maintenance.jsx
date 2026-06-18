import { motion } from 'framer-motion';
import { FaTools, FaCog, FaRocket } from 'react-icons/fa';

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  width: 4 + Math.random() * 8,
  height: 4 + Math.random() * 8,
  left: Math.random() * 100,
  top: Math.random() * 100,
  opacity: 0.1 + Math.random() * 0.2,
  duration: 3 + Math.random() * 4,
  delay: Math.random() * 3,
}));

export const Maintenance = () => {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {PARTICLES.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.width,
              height: particle.height,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              background: `rgba(99, 102, 241, ${particle.opacity})`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-lg w-full text-center"
      >
        {/* Animated Gear Icon */}
        <div className="relative w-28 h-28 mx-auto mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <FaCog className="text-6xl text-accent-primary/30" />
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 right-0 w-12 h-12 flex items-center justify-center"
          >
            <FaCog className="text-2xl text-accent-secondary/40" />
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <FaTools className="text-white text-xl" />
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-500 text-xs font-bold uppercase tracking-widest mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
          Under Maintenance
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-heading text-4xl md:text-5xl font-extrabold text-textColor-primary mb-4 leading-tight tracking-tight"
        >
          We&apos;ll Be{' '}
          <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
            Back Soon
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="text-textColor-secondary text-base md:text-lg leading-relaxed mb-8 max-w-md mx-auto font-body"
        >
          We&apos;re currently performing scheduled maintenance to improve your experience.
          We&apos;ll be back online shortly.
        </motion.p>

        {/* Progress Bar Animation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="max-w-xs mx-auto mb-8"
        >
          <div className="h-1.5 rounded-full bg-bg-secondary overflow-hidden border border-borderColor-base">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary"
              style={{ backgroundSize: '200% 100%' }}
              animate={{
                backgroundPosition: ['0% 0%', '200% 0%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
              initial={{ width: '100%' }}
            />
          </div>
          <p className="text-[10px] text-textColor-muted mt-2 uppercase tracking-widest font-semibold">
            System Update in Progress
          </p>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-8"
        >
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-bg-secondary/50 border border-borderColor-base">
            <FaRocket className="text-accent-primary text-sm" />
            <span className="text-xs text-textColor-secondary font-semibold">
              Performance Upgrades
            </span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-bg-secondary/50 border border-borderColor-base">
            <FaTools className="text-accent-secondary text-sm" />
            <span className="text-xs text-textColor-secondary font-semibold">
              New Features Coming
            </span>
          </div>
        </motion.div>

        {/* Footer text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-xs text-textColor-muted"
        >
          Thank you for your patience • Ravindra Banala
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Maintenance;
