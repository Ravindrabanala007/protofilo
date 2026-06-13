import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { FaAward, FaTrophy, FaTerminal, FaGraduationCap, FaArrowRight } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';
import { resolveAssetUrl } from '../data/defaultPortfolio';
import project1 from '../assets/project1.png';
import project2 from '../assets/project2.png';
import project3 from '../assets/project3.png';

const CountUp = ({ value, duration = 1.5, suffix = '', isFloat = false }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = parseFloat(value);
    const intervalTime = 30;
    const steps = (duration * 1000) / intervalTime;
    const increment = (end - start) / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-heading font-extrabold text-3xl md:text-5xl gradient-text">
      {isFloat ? count.toFixed(2) : Math.floor(count)}
      {suffix}
    </span>
  );
};

const defaultIcons = [<FaGraduationCap />, <FaTerminal />, <FaTrophy />, <FaAward />];

export const Achievements = ({ limit }) => {
  const { data } = usePortfolio();
  const achievements = data.achievements ?? { stats: [], highlights: [] };
  const stats = achievements.stats ?? [];
  const highlights = achievements.highlights ?? [];

  const displayHighlights = limit ? highlights.slice(0, limit) : highlights;

  const fallbackMap = {
    'hl-1': project2,
    'hl-2': project3,
    'hl-3': project1,
  };

  return (
    <section id="achievements" className="section bg-bg-secondary/25 py-24 relative overflow-hidden font-body">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-primary block mb-2 font-heading">
            Key Metrics
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight text-textColor-primary mb-4">
            My Achievements
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              key={stat.id ?? idx}
              className="glass-panel p-6 rounded-2xl border border-borderColor-base text-center flex flex-col items-center hover:border-borderColor-hover hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-accent-glow flex items-center justify-center text-accent-primary text-2xl mb-4">
                {defaultIcons[idx % defaultIcons.length]}
              </div>
              <CountUp value={stat.value} suffix={stat.suffix} isFloat={stat.isFloat} />
              <span className="text-xs font-semibold text-textColor-muted uppercase tracking-wider mt-2 block">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayHighlights.map((hl, idx) => {
            const imageSrc = resolveAssetUrl(
              hl.imageData,
              hl.imageUrl,
              hl.assistaPath,
              fallbackMap[hl.id]
            );
            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                key={hl.id ?? idx}
                className="glass-panel rounded-2xl border border-borderColor-base overflow-hidden hover:translate-y-[-4px] hover:border-borderColor-hover transition-all duration-300"
              >
                {imageSrc && (
                  <div className="aspect-video overflow-hidden">
                    <img src={imageSrc} alt={hl.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-6 space-y-4">
                  {!imageSrc && (
                    <div className="w-10 h-10 rounded-full bg-accent-glow flex items-center justify-center text-accent-secondary text-lg">
                      <FaTrophy />
                    </div>
                  )}
                  <div className="space-y-1">
                    <h4 className="font-heading text-lg font-bold text-textColor-primary leading-tight">{hl.title}</h4>
                    <span className="text-xs font-semibold text-accent-primary block">{hl.subtitle}</span>
                  </div>
                  <p className="text-textColor-secondary text-sm leading-relaxed font-body">{hl.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {limit && highlights.length > limit && (
          <div className="text-center mt-12">
            <Link
              to="/achievements"
              className="btn btn-secondary px-8 py-3.5 rounded-xl inline-flex items-center gap-2 cursor-pointer shadow-md text-sm font-semibold tracking-wide border border-borderColor-base hover:border-accent-primary transition-all duration-300"
            >
              View All Achievements <FaArrowRight className="text-xs" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
