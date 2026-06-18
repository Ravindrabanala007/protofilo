import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaDownload, FaInstagram } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';
import { resolveAssetUrl } from '../data/defaultPortfolio';

const HeroVisual = ({ profileImage }) => (
  <div className="relative w-full max-w-[300px] sm:max-w-[360px] mx-auto aspect-square flex items-center justify-center">
    {/* Spinning Neural Orbit Circles */}
    <svg className="absolute w-full h-full animate-[spin_15s_linear_infinite]" viewBox="0 0 100 100" aria-hidden="true">
      <ellipse cx="50" cy="50" rx="46" ry="16" fill="none" stroke="url(#heroGrad)" strokeWidth="0.75" transform="rotate(35, 50, 50)" strokeDasharray="5 4" />
      <ellipse cx="50" cy="50" rx="46" ry="16" fill="none" stroke="url(#heroGrad)" strokeWidth="0.75" transform="rotate(125, 50, 50)" strokeDasharray="6 5" />
      <ellipse cx="50" cy="50" rx="46" ry="16" fill="none" stroke="var(--accent-secondary)" strokeWidth="0.5" transform="rotate(80, 50, 50)" strokeDasharray="2 2" />
      <defs>
        <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent-primary)" />
          <stop offset="100%" stopColor="var(--accent-secondary)" />
        </linearGradient>
      </defs>
    </svg>

    {/* Dynamic Rounded Photo Frame */}
    <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden border-2 border-accent-primary/30 shadow-[0_0_25px_rgba(99,102,241,0.2)] bg-bg-primary">
      {profileImage ? (
        <img
          src={profileImage}
          alt="Ravindra Banala"
          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20">
          <span className="font-heading text-5xl font-extrabold gradient-text select-none">RB</span>
        </div>
      )}
    </div>

    {/* High-tech overlays */}
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
      className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-bg-glass border border-borderColor-base flex items-center justify-center text-accent-primary font-bold shadow-md text-xs select-none"
    >
      {"{ }"}
    </motion.div>
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ repeat: Infinity, duration: 3, delay: 0.4, ease: 'easeInOut' }}
      className="absolute bottom-4 left-4 w-8 h-8 rounded-full bg-bg-glass border border-borderColor-base flex items-center justify-center text-accent-secondary text-xs shadow-sm select-none"
    >
      &lt;/&gt;
    </motion.div>
  </div>
);

export const Hero = () => {
  const { data } = usePortfolio();
  const settings = data.settings ?? {};
  const resumeUrl = settings.resumeUrl || '/assista/resume.pdf';
  const resumeLabel = settings.resumeLinkLabel || 'Download Resume';

  const [roleIndex, setRoleIndex] = useState(0);
  const [roleText, setRoleText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const roles = ['Full Stack Developer', 'React Developer', 'Django Developer', 'MERN Developer', 'AI Enthusiast'];

  const btnRef1 = useRef(null);
  const btnRef2 = useRef(null);
  const btnRef3 = useRef(null);

  useEffect(() => {
    let timer;
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 30 : 80;

    if (!isDeleting && roleText === currentRole) {
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && roleText === '') {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setRoleText((prev) =>
          isDeleting ? prev.slice(0, -1) : currentRole.slice(0, prev.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [roleText, isDeleting, roleIndex]);

  const handleMagneticMove = (e, targetRef) => {
    const btn = targetRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
  };

  const handleMagneticLeave = (targetRef) => {
    const btn = targetRef.current;
    if (btn) btn.style.transform = 'translate(0px, 0px)';
  };

  const about = data.about ?? {};
  const profileImage = resolveAssetUrl(
    about.imageData,
    about.imageUrl,
    settings.photoAssistaPath
  );

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4 flex justify-center lg:justify-start"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent-primary/20 bg-accent-primary/5 text-sm font-semibold tracking-wide text-accent-primary font-heading">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
              Welcome to my space
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-textColor-secondary text-base sm:text-lg md:text-xl font-bold tracking-wider font-heading uppercase mb-1"
          >
            Hello, I&apos;m
          </motion.h2>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-heading text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-textColor-primary mb-4 leading-tight"
          >
            Ravindra <span className="gradient-text">Banala</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="font-heading text-lg sm:text-xl md:text-3xl font-semibold text-accent-secondary mb-6 h-8 flex items-center justify-center lg:justify-start gap-1.5"
          >
            <span>I&apos;m a </span>
            <span className="text-textColor-primary border-r-2 border-accent-secondary/60 pr-1">{roleText}</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-textColor-secondary text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 mb-8 sm:mb-10 leading-relaxed font-body"
          >
            Highly analytical MERN Stack Developer, Python Programmer, and certified Cisco Network Engineer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-10 justify-center lg:justify-start"
          >
            <a href="#projects" className="w-full sm:w-auto">
              <button
                ref={btnRef1}
                onMouseMove={(e) => handleMagneticMove(e, btnRef1)}
                onMouseLeave={() => handleMagneticLeave(btnRef1)}
                className="btn btn-primary w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl cursor-pointer hover:shadow-neon transition-transform duration-300"
              >
                View Projects
              </button>
            </a>
            <a href="#contact" className="w-full sm:w-auto">
              <button
                ref={btnRef2}
                onMouseMove={(e) => handleMagneticMove(e, btnRef2)}
                onMouseLeave={() => handleMagneticLeave(btnRef2)}
                className="btn btn-secondary w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl cursor-pointer transition-transform duration-300"
              >
                Contact Me
              </button>
            </a>
            <a href={resumeUrl} download target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <button
                ref={btnRef3}
                onMouseMove={(e) => handleMagneticMove(e, btnRef3)}
                onMouseLeave={() => handleMagneticLeave(btnRef3)}
                className="btn btn-secondary w-full sm:w-auto border-dashed border-accent-primary/50 text-accent-primary hover:bg-accent-primary/10 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl cursor-pointer transition-transform duration-300 inline-flex items-center justify-center gap-2"
              >
                <FaDownload className="text-sm" />
                {resumeLabel}
              </button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex items-center gap-4 text-textColor-secondary justify-center lg:justify-start"
          >
            <span className="text-xs uppercase tracking-wider font-semibold opacity-60">Connect:</span>
            <div className="flex gap-3">
              {[
                { icon: <FaGithub />, link: 'https://github.com' },
                { icon: <FaLinkedin />, link: 'https://www.linkedin.com/in/ravindra-banala-b0a956277/' },
                { icon: <FaInstagram />, link: 'https://instagram.com' },
                { icon: <FaTwitter />, link: 'https://twitter.com' },
              ].map((s, idx) => (
                <a
                  key={idx}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-bg-glass border border-borderColor-base hover:border-accent-primary hover:text-accent-primary flex items-center justify-center transition-all duration-300 shadow-sm hover:-translate-y-1 hover:shadow-neon"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2 py-4 lg:py-0">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
          >
            <HeroVisual profileImage={profileImage} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
