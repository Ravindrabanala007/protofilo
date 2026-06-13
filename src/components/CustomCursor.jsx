import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Position trackers
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for outer ring
  const springConfig = { damping: 30, stiffness: 350, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseDown = () => {
      setIsClicked(true);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    // Global listener for hover interactions
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('clickable') ||
        target.getAttribute('role') === 'button';
      
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);
    
    // Add custom cursor active class to hide standard cursor on desktop
    document.body.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Precise Center Dot */}
      <motion.div
        className="fixed w-2 h-2 bg-accent-primary rounded-full pointer-events-none z-[99999] hidden lg:block -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          scale: isHovered ? 0 : (isClicked ? 0.75 : 1),
        }}
        transition={{ duration: 0.1 }}
      />

      {/* 2. Lagging Spring Ring */}
      <motion.div
        className="fixed rounded-full border border-accent-secondary/60 pointer-events-none z-[99998] hidden lg:block -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_rgba(6,182,212,0.1)]"
        style={{
          x: ringX,
          y: ringY,
          width: isHovered ? (isClicked ? 36 : 48) : (isClicked ? 18 : 26),
          height: isHovered ? (isClicked ? 36 : 48) : (isClicked ? 18 : 26),
          backgroundColor: isHovered ? 'rgba(6, 182, 212, 0.08)' : 'transparent',
          borderColor: isHovered ? 'var(--accent-primary)' : 'var(--accent-secondary)'
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      />
    </>
  );
};
