import { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

export const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main className="relative z-10 w-full overflow-x-hidden pt-24">
        <Contact />
      </main>
      <Footer />
    </>
  );
};
export default ContactPage;
