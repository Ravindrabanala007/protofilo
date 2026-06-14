import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaHeart, FaEye } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { visitorCount } = usePortfolio();

  const socialLinks = [
    { icon: <FaGithub />, href: 'https://github.com', label: 'GitHub' },
    { icon: <FaLinkedin />, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <FaInstagram />, href: 'https://instagram.com', label: 'Instagram' },
    { icon: <FaTwitter />, href: 'https://twitter.com', label: 'Twitter' },
  ];

  return (
    <footer className="border-t border-borderColor-base bg-bg-secondary/20 py-8 font-body">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Copyright */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="text-sm font-semibold text-textColor-primary">
            Ravindra<span className="text-accent-primary">.AI</span>
          </p>
          <p className="text-xs text-textColor-muted">
            &copy; {currentYear} Ravindra Banala. All rights reserved.
          </p>
        </div>

        {/* Center: Visits Counter & Heart */}
        <div className="flex items-center gap-4 text-xs text-textColor-muted">
          <span className="flex items-center gap-1.5 px-3 py-1 bg-bg-primary border border-borderColor-base rounded-full">
            <FaEye className="text-accent-primary text-xs" />
            <span>{visitorCount} visits</span>
          </span>
          <span className="flex items-center gap-1">
            Built with <FaHeart className="text-accent-primary text-[9px] animate-pulse" /> using React
          </span>
        </div>

        {/* Right Side: Social links & Admin */}
        <div className="flex items-center gap-6">
          <div className="flex gap-2.5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-8 h-8 rounded-lg bg-bg-glass border border-borderColor-base hover:border-accent-primary hover:text-accent-primary text-textColor-secondary flex items-center justify-center transition-all duration-300"
              >
                <span className="text-sm">{social.icon}</span>
              </a>
            ))}
          </div>
          <span className="h-4 w-px bg-borderColor-base" />
          <Link 
            to="/login" 
            className="text-xs font-semibold text-textColor-muted hover:text-accent-primary transition-colors duration-300"
          >
            Admin
          </Link>
        </div>

      </div>
    </footer>
  );
};
export default Footer;
