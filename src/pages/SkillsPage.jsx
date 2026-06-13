import { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { usePortfolio } from '../context/PortfolioContext';
import { resolveAssetUrl } from '../data/defaultPortfolio';
import { motion } from 'framer-motion';

export const SkillsPage = () => {
  const { data } = usePortfolio();
  const skills = data.skills ?? [];
  const categories = data.skillCategories ?? [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getSkillsByCategory = (catId) => {
    return skills.filter((skill) => skill.category === catId);
  };

  return (
    <>
      <Navbar />
      <main className="relative z-10 w-full overflow-x-hidden pt-24 min-h-screen font-body bg-bg-secondary/5">
        <div className="max-w-7xl mx-auto px-6 py-12">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-accent-secondary block mb-2 font-heading">
              Technical Stack Directory
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight text-textColor-primary mb-4">
              My Skills & Courses
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary mx-auto rounded-full" />
          </div>

          {/* Grouped Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {categories.map((cat, idx) => {
              const catSkills = getSkillsByCategory(cat.id);
              if (catSkills.length === 0) return null;

              const isLastOdd = idx === categories.length - 1 && categories.length % 2 !== 0;

              return (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  key={cat.id}
                  className={`glass-panel p-6 rounded-2xl border border-borderColor-base flex flex-col justify-between hover:border-borderColor-hover transition-colors duration-300 ${
                    isLastOdd ? 'md:col-span-2' : ''
                  }`}
                >
                  <div className="space-y-4">
                    <div className="border-b border-borderColor-base/30 pb-3">
                      <h3 className="font-heading text-lg font-bold text-textColor-primary uppercase tracking-wider">
                        {cat.name}
                      </h3>
                    </div>

                    {/* Static Grid (No scrolling) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      {catSkills.map((skill) => {
                        const imgSrc = resolveAssetUrl(skill.imageData, skill.imageUrl, skill.assistaPath);
                        return (
                          <div
                            key={skill.id}
                            className="flex items-center gap-3 p-3 rounded-xl border border-borderColor-base bg-bg-secondary/40 hover:border-accent-primary transition-all duration-300"
                          >
                            <div className="w-12 h-12 rounded-lg bg-bg-primary border border-borderColor-base/60 overflow-hidden flex items-center justify-center flex-shrink-0">
                              {imgSrc ? (
                                <img src={imgSrc} alt={skill.name} className="w-full h-full object-cover object-center" />
                              ) : (
                                <span className="text-xs font-bold text-accent-primary uppercase tracking-wider">
                                  {skill.name.slice(0, 2)}
                                </span>
                              )}
                            </div>
                            <h4 className="text-sm font-bold text-textColor-primary leading-snug">
                              {skill.name}
                            </h4>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
};
export default SkillsPage;
