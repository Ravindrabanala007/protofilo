import { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Certifications } from '../components/Certifications';
import { Footer } from '../components/Footer';

export const CertificationsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main className="relative z-10 w-full overflow-x-hidden pt-24">
        <Certifications />
      </main>
      <Footer />
    </>
  );
};
export default CertificationsPage;
