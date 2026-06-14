import { motion } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';

export const Education = () => {
  const { data } = usePortfolio();
  const education = data.education ?? [];

  return (
    <section id="education" className="section bg-bg-secondary/25 py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-primary block mb-2 font-heading">
            Academic Journey
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight text-textColor-primary mb-4">
            Education
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary mx-auto rounded-full" />
        </div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-8 rounded-2xl border border-borderColor-base"
          >
            <h3 className="font-heading text-xl font-bold text-textColor-primary flex items-center gap-2 mb-8">
              <FaGraduationCap className="text-accent-primary" />
              Education Timeline
            </h3>

            <div className="relative border-l border-borderColor-base pl-6 ml-2 space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.id ?? index}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-bg-primary border-2 border-accent-primary group-hover:bg-accent-primary group-hover:scale-110 transition-all duration-300" />

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-accent-secondary tracking-wider font-heading">
                        {edu.timePeriod}
                      </span>
                      {edu.badge && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-accent-glow text-accent-primary border border-borderColor-base">
                          {edu.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="font-heading text-lg font-bold text-textColor-primary leading-tight">
                      {edu.title}
                    </h4>
                    <span className="text-xs font-semibold text-textColor-muted block">
                      {edu.org}
                      {edu.location ? ` · ${edu.location}` : ''}
                    </span>
                    <p className="text-textColor-secondary text-sm leading-relaxed mt-2 font-body">
                      {edu.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
