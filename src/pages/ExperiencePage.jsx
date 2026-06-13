import { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Experience } from '../components/Experience';
import { Footer } from '../components/Footer';

export const ExperiencePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main className="relative z-10 w-full overflow-x-hidden pt-24">
        <Experience />
      </main>
      <Footer />
    </>
  );
};
export default ExperiencePage;
