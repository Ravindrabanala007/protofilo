import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCertificate, FaExternalLinkAlt, FaTimes, FaSearchPlus, FaDownload, FaArrowRight } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';

export const Certifications = ({ limit }) => {
  const { data } = usePortfolio();
  const certifications = data.certifications ?? [];
  const [activeCert, setActiveCert] = useState(null);

  const displayCertifications = limit ? certifications.slice(0, limit) : certifications;

  const getCertUrl = (cert) => {
    return cert.certificateLinkUrl || cert.fileData || '';
  };

  const isPdf = (url) => {
    if (!url) return false;
    if (url.startsWith('data:application/pdf')) return true;
    return url.split('?')[0].split('#')[0].toLowerCase().endsWith('.pdf');
  };

  return (
    <section id="certifications" className="section py-24 relative overflow-hidden font-body bg-bg-secondary/10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-secondary block mb-2 font-heading">
            Credentials & Achievements
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight text-textColor-primary mb-4">
            Certifications
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary mx-auto rounded-full" />
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCertifications.map((cert, idx) => {
            const url = getCertUrl(cert);
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={cert.id ?? idx}
                className="glass-panel p-6 rounded-2xl border border-borderColor-base flex flex-col justify-between hover:translate-y-[-4px] hover:border-borderColor-hover hover:shadow-lg transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ backgroundColor: `${cert.themeColor || '#6366f1'}20`, color: cert.themeColor || '#6366f1' }}
                    >
                      {cert.badgeEmoji || <FaCertificate />}
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 bg-bg-primary border border-borderColor-base rounded-md text-textColor-muted">
                      {cert.date}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-heading text-base font-bold text-textColor-primary leading-snug">
                      {cert.name}
                    </h3>
                    <p className="text-xs font-semibold text-accent-primary uppercase tracking-wider">
                      {cert.issuerOrg}
                    </p>
                  </div>

                  {cert.skills?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[9px] px-2 py-0.5 rounded-md bg-bg-primary border border-borderColor-base text-textColor-secondary font-semibold"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {url && (
                  <div className="pt-6 mt-4 border-t border-borderColor-base/30 flex gap-3">
                    <button
                      onClick={() => setActiveCert(cert)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-accent-primary/10 border border-accent-primary/20 text-accent-primary hover:bg-accent-primary hover:text-white transition-all duration-300 cursor-pointer"
                    >
                      <FaSearchPlus /> View Document
                    </button>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-xs rounded-lg border border-borderColor-base text-textColor-secondary hover:text-accent-secondary hover:border-accent-secondary transition-all flex items-center justify-center"
                      title="Open in new window"
                    >
                      <FaExternalLinkAlt />
                    </a>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {limit && certifications.length > limit && (
          <div className="text-center mt-12">
            <Link
              to="/certifications"
              className="btn btn-secondary px-8 py-3.5 rounded-xl inline-flex items-center gap-2 cursor-pointer shadow-md text-sm font-semibold tracking-wide border border-borderColor-base hover:border-accent-primary transition-all duration-300"
            >
              View All Certifications <FaArrowRight className="text-xs" />
            </Link>
          </div>
        )}

        {/* Overlay Modal Lightbox */}
        <AnimatePresence>
          {activeCert && (() => {
            const certUrl = getCertUrl(activeCert);
            const isDocPdf = isPdf(certUrl);
            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md"
              >
                <motion.div
                  initial={{ scale: 0.95, y: 15 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 15 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                  className="relative w-full max-w-4xl max-h-[90vh] glass-panel rounded-2xl border border-white/10 flex flex-col shadow-2xl overflow-hidden"
                >
                  {/* Modal Header */}
                  <div className="flex items-center justify-between p-4 border-b border-borderColor-base bg-bg-secondary">
                    <div className="flex items-center gap-3">
                      <span className="text-xl" style={{ color: activeCert.themeColor || 'var(--accent-primary)' }}>
                        {activeCert.badgeEmoji || <FaCertificate />}
                      </span>
                      <div>
                        <h3 className="font-heading text-sm sm:text-base font-bold text-textColor-primary leading-tight">
                          {activeCert.name}
                        </h3>
                        <p className="text-xs text-textColor-muted">{activeCert.issuerOrg} &bull; {activeCert.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={certUrl}
                        download={`${activeCert.name.replace(/\s+/g, '_')}_Certificate`}
                        className="p-2 text-textColor-secondary hover:text-accent-secondary transition-colors"
                        title="Download Certificate"
                      >
                        <FaDownload />
                      </a>
                      <button
                        onClick={() => setActiveCert(null)}
                        className="p-2 text-textColor-muted hover:text-red-500 transition-colors cursor-pointer"
                        aria-label="Close modal"
                      >
                        <FaTimes className="text-lg" />
                      </button>
                    </div>
                  </div>

                  {/* Modal Content */}
                  <div className="flex-1 bg-bg-primary/50 p-4 sm:p-6 overflow-y-auto flex items-center justify-center min-h-[300px]">
                    {isDocPdf ? (
                      <iframe
                        src={certUrl}
                        className="w-full h-[65vh] rounded-lg border border-borderColor-base shadow-sm"
                        title={activeCert.name}
                      />
                    ) : (
                      <div className="max-w-full max-h-[65vh] overflow-hidden flex items-center justify-center">
                        <img
                          src={certUrl}
                          className="max-w-full max-h-[65vh] object-contain rounded-lg border border-borderColor-base shadow-lg"
                          alt={activeCert.name}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            );
          })()}
        </AnimatePresence>

      </div>
    </section>
  );
};
export default Certifications;
