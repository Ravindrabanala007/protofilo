import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon, FaBars, FaTimes, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Education', path: '/education' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Certifications', path: '/certifications' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activePath = location.pathname;

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 font-heading ${
        isSticky 
          ? 'py-4 glass-panel border-b border-borderColor-base shadow-lg shadow-black/10' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo Branding: Animated Signature */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 flex items-center justify-center">
            <svg className="absolute w-full h-full animate-[spin_6s_linear_infinite] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100">
              <ellipse cx="50" cy="50" rx="42" ry="14" fill="none" stroke="currentColor" className="text-accent-primary" strokeWidth="2" transform="rotate(45, 50, 50)" />
              <ellipse cx="50" cy="50" rx="42" ry="14" fill="none" stroke="currentColor" className="text-accent-primary" strokeWidth="2" transform="rotate(135, 50, 50)" />
            </svg>
            <span className="w-2.5 h-2.5 rounded-full bg-accent-secondary shadow-[0_0_10px_var(--accent-glow-secondary)] group-hover:animate-ping" />
          </div>
          <span
            className="text-xl font-bold gradient-text whitespace-nowrap"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Ravindra Banala
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path}
                  className={`text-xs xl:text-sm font-semibold tracking-wide relative py-1.5 transition-all duration-300 ${
                    activePath === link.path
                      ? 'text-textColor-primary'
                      : 'text-textColor-secondary hover:text-textColor-primary'
                  }`}
                >
                  {link.name}
                  {activePath === link.path && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions Menu */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 mr-2">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-bg-secondary border border-borderColor-base flex items-center justify-center text-textColor-secondary hover:text-accent-primary hover:border-accent-primary transition-all duration-300" title="GitHub">
              <FaGithub className="text-sm" />
            </a>
            <a href="https://www.linkedin.com/in/ravindra-banala-b0a956277/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-bg-secondary border border-borderColor-base flex items-center justify-center text-textColor-secondary hover:text-accent-primary hover:border-accent-primary transition-all duration-300" title="LinkedIn">
              <FaLinkedin className="text-sm" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-bg-secondary border border-borderColor-base flex items-center justify-center text-textColor-secondary hover:text-accent-primary hover:border-accent-primary transition-all duration-300" title="Instagram">
              <FaInstagram className="text-sm" />
            </a>
          </div>

          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-xl bg-bg-secondary border border-borderColor-base flex items-center justify-center text-textColor-primary hover:text-accent-primary hover:border-accent-primary transition-all duration-300 shadow-sm cursor-pointer"
            aria-label="Toggle dark/light theme"
          >
            {theme === 'dark' ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />}
          </button>

          <button
            onClick={() => setIsMenuOpen(prev => !prev)}
            className="md:hidden w-9 h-9 rounded-xl bg-bg-secondary border border-borderColor-base flex items-center justify-center text-textColor-primary hover:text-accent-primary transition-all duration-300 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <FaTimes className="text-base" /> : <FaBars className="text-base" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div 
        className={`md:hidden fixed top-[74px] left-0 w-full bg-bg-primary border-b border-borderColor-base transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-[500px] shadow-2xl py-6 overflow-y-auto' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col items-center gap-4">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`text-base font-semibold tracking-wide py-1 block transition-all duration-300 ${
                  activePath === link.path
                    ? 'text-accent-primary font-bold'
                    : 'text-textColor-secondary hover:text-textColor-primary'
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li className="flex gap-4 pt-3 border-t border-borderColor-base/30 w-1/2 justify-center">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-textColor-secondary hover:text-accent-primary"><FaGithub className="text-lg" /></a>
            <a href="https://www.linkedin.com/in/ravindra-banala-b0a956277/" target="_blank" rel="noopener noreferrer" className="text-textColor-secondary hover:text-accent-primary"><FaLinkedin className="text-lg" /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-textColor-secondary hover:text-accent-primary"><FaInstagram className="text-lg" /></a>
          </li>
        </ul>
      </div>
    </header>
  );
};
export default Navbar;
