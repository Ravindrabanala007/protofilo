import { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Achievements } from '../components/Achievements';
import { Footer } from '../components/Footer';

export const AchievementsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main className="relative z-10 w-full overflow-x-hidden pt-24">
        <Achievements />
      </main>
      <Footer />
    </>
  );
};
export default AchievementsPage;
