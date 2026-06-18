import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';

export const Experience = ({ limit }) => {
  const { data } = usePortfolio();
  const experience = data.experience ?? [];
  const displayExperience = limit ? experience.slice(0, limit) : experience;

  return (
    <section id="experience" className="section py-24 relative overflow-hidden font-body">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-secondary block mb-2 font-heading">
            Career Milestones
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight text-textColor-primary mb-4">
            Work Experience
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary mx-auto rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="relative border-l border-borderColor-base pl-6 ml-2 space-y-10">
            {displayExperience.map((job, idx) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                key={job.id ?? idx}
                className="relative group"
              >
                <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-bg-primary border-2 border-accent-secondary group-hover:bg-accent-secondary group-hover:scale-110 transition-all duration-300" />

                <div className="glass-panel p-6 rounded-2xl border border-borderColor-base space-y-4 hover:border-borderColor-hover transition-all duration-300">
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <div>
                      <h4 className="font-heading text-lg font-bold text-textColor-primary">{job.title}</h4>
                      <span className="text-xs font-semibold text-accent-primary">{job.org}</span>
                      {job.location && (
                        <span className="text-xs text-textColor-muted block">{job.location}</span>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs font-bold px-3 py-1 bg-bg-primary border border-borderColor-base rounded-md text-textColor-muted">
                        {job.timePeriod}
                      </span>
                      {job.badge && (
                        <span className="text-[10px] font-semibold text-accent-secondary">{job.badge}</span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-textColor-secondary flex items-start gap-2">
                    <FaArrowRight className="text-[10px] text-accent-secondary mt-1 flex-shrink-0" />
                    <span>{job.description}</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {limit && experience.length > limit && (
          <div className="text-center mt-12">
            <Link
              to="/experience"
              className="btn btn-secondary px-8 py-3.5 rounded-xl inline-flex items-center gap-2 cursor-pointer shadow-md text-sm font-semibold tracking-wide border border-borderColor-base hover:border-accent-primary transition-all duration-300"
            >
              View All Experience <FaArrowRight className="text-xs" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
export default Experience;
