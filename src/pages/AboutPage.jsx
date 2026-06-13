import { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { About } from '../components/About';
import { Footer } from '../components/Footer';

export const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main className="relative z-10 w-full overflow-x-hidden pt-24">
        <About />
      </main>
      <Footer />
    </>
  );
};
export default AboutPage;
