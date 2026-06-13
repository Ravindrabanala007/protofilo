import { motion } from 'framer-motion';
import { FaAward, FaCode } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';
import { resolveAssetUrl } from '../data/defaultPortfolio';

export const About = () => {
  const { data } = usePortfolio();
  const about = data.about ?? {};
  const settings = data.settings ?? {};
  const profileImage = resolveAssetUrl(
    about.imageData,
    about.imageUrl,
    settings.photoAssistaPath
  );
  const summary = about.summary ?? [];
  const objective = about.objective ?? '';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="about" className="section bg-bg-secondary/25 py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-primary block mb-2 font-heading">
            Profile Summary
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight text-textColor-primary mb-4">
            About Me
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary mx-auto rounded-full" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Profile Image */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-4 flex justify-center lg:justify-start"
          >
            <div className="relative group">
              <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden border-2 border-accent-primary/30 shadow-neon bg-bg-primary relative">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Ravindra Banala"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20">
                    <span className="font-heading text-6xl font-extrabold gradient-text select-none">RB</span>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-3 -right-3 w-20 h-20 rounded-xl bg-bg-glass border border-borderColor-base flex items-center justify-center shadow-lg group-hover:border-accent-primary transition-all duration-300">
                <FaCode className="text-accent-primary text-2xl group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </motion.div>

          {/* Bio Content */}
          <div className="lg:col-span-8 space-y-6">
            <motion.div
              variants={itemVariants}
              className="glass-panel p-8 rounded-2xl border border-borderColor-base space-y-4"
            >
              <h3 className="font-heading text-xl font-bold text-textColor-primary flex items-center gap-2">
                <FaCode className="text-accent-secondary" />
                Who Am I?
              </h3>
              {summary.map((paragraph, idx) => (
                <p key={idx} className="text-textColor-secondary leading-relaxed font-body text-base">
                  {paragraph}
                </p>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="glass-panel p-8 rounded-2xl border border-borderColor-base space-y-4"
            >
              <h3 className="font-heading text-xl font-bold text-textColor-primary flex items-center gap-2">
                <FaAward className="text-accent-primary" />
                Career Objective
              </h3>
              <p className="text-textColor-secondary leading-relaxed font-body text-base">{objective}</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
