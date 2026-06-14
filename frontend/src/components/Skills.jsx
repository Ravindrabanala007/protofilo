import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { resolveAssetUrl } from '../data/defaultPortfolio';

export const Skills = () => {
  const { data } = usePortfolio();
  const skills = data.skills ?? [];

  return (
    <section id="skills" className="section py-20 relative overflow-hidden font-body bg-bg-secondary/5">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-secondary block mb-2 font-heading">
            Expertise & Training
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight text-textColor-primary mb-4">
            Skills & Courses
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary mx-auto rounded-full" />
        </div>

        {/* Single Global Infinite Marquee Scrolling All Skills */}
        {skills.length > 0 ? (
          <div className="relative w-full overflow-hidden py-4 bg-bg-secondary/20 rounded-2xl border border-borderColor-base/30 select-none">
            {/* Fade overlay edges */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" />
            
            <div className="animate-marquee flex gap-6 px-4">
              {/* Duplicate the array multiple times to ensure seamless infinite looping */}
              {[...skills, ...skills, ...skills, ...skills].map((skill, sIdx) => {
                const imgSrc = resolveAssetUrl(skill.imageData, skill.imageUrl, skill.assistaPath);
                return (
                  <div
                    key={sIdx}
                    className="flex-shrink-0 flex items-center gap-3 bg-bg-glass border border-borderColor-base px-4 py-2.5 rounded-2xl shadow-sm hover:border-accent-primary hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-bg-secondary border border-borderColor-base/60 overflow-hidden flex items-center justify-center flex-shrink-0">
                      {imgSrc ? (
                        <img src={imgSrc} alt={skill.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-[10px] font-bold text-accent-primary uppercase tracking-wider">
                          {skill.name.slice(0, 2)}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-bold text-textColor-primary tracking-wide">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <p className="text-center text-textColor-muted">No skills configured.</p>
        )}

      </div>
    </section>
  );
};
export default Skills;
