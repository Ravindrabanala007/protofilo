import { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Projects } from '../components/Projects';
import { Footer } from '../components/Footer';

export const ProjectsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main className="relative z-10 w-full overflow-x-hidden pt-24">
        <Projects />
      </main>
      <Footer />
    </>
  );
};
export default ProjectsPage;
