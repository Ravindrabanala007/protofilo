import { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Education } from '../components/Education';
import { Skills } from '../components/Skills';
import { Projects } from '../components/Projects';
import { Experience } from '../components/Experience';
import { Certifications } from '../components/Certifications';
import { Achievements } from '../components/Achievements';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { usePortfolio } from '../context/PortfolioContext';

export const Home = () => {
  const { recordVisit } = usePortfolio();

  useEffect(() => {
    recordVisit();
  }, [recordVisit]);

  return (
    <>
      <Navbar />
      <main className="relative z-10 w-full overflow-x-hidden">
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects limit={3} />
        <Experience limit={3} />
        <Certifications limit={3} />
        <Achievements limit={3} />
        <Contact />
      </main>
      <Footer />
    </>
  );
};
