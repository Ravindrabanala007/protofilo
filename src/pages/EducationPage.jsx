import { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Education } from '../components/Education';
import { Footer } from '../components/Footer';

export const EducationPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main className="relative z-10 w-full overflow-x-hidden pt-24">
        <Education />
      </main>
      <Footer />
    </>
  );
};
export default EducationPage;
