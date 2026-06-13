import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4 relative overflow-hidden font-body">
      {/* Background radial effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.08)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-red-500 rounded-full filter blur-[150px] opacity-[0.05] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full glass-panel border-red-500/20 p-8 rounded-2xl text-center relative z-10"
      >
        {/* Warning Icon */}
        <motion.div
          animate={{ rotate: [0, -5, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="w-16 h-16 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center text-red-500 text-3xl mx-auto mb-6 shadow-[0_0_15px_rgba(239,68,68,0.15)]"
        >
          <FaExclamationTriangle />
        </motion.div>

        {/* Header */}
        <h1 className="font-heading text-5xl font-extrabold tracking-tight text-textColor-primary mb-2">
          404
        </h1>
        <h2 className="font-heading text-xl font-semibold text-red-400 tracking-wider uppercase mb-4">
          Module Not Found
        </h2>
        
        {/* Terminal logs description */}
        <div className="bg-bg-primary/60 border border-borderColor-base rounded-xl p-4 text-left font-mono text-xs text-textColor-secondary mb-6 leading-relaxed">
          <p className="text-red-400/80 mb-1">$ Error: Resolve_URI_Failed</p>
          <p className="mb-1">&gt; Looking for scope endpoint...</p>
          <p className="mb-1">&gt; Error: Reference path is invalid or has been relocated from directory.</p>
          <p className="text-textColor-muted">&gt; Process exited with status code 0x404</p>
        </div>

        {/* Back to Home CTA */}
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full btn py-3.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white rounded-xl font-heading font-semibold shadow-[0_0_15px_rgba(239,68,68,0.2)] flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
          >
            <FaHome />
            <span>Return to Matrix</span>
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};
