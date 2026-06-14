import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { AIAssistant } from './components/AIAssistant';
import { LandingAnimation } from './components/LandingAnimation';
import { CustomCursor } from './components/CustomCursor';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Admin } from './pages/Admin';
import { NotFound } from './pages/NotFound';
import { AboutPage } from './pages/AboutPage';
import { EducationPage } from './pages/EducationPage';
import { SkillsPage } from './pages/SkillsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { CertificationsPage } from './pages/CertificationsPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { ContactPage } from './pages/ContactPage';

const SiteLayout = ({ children, showLanding = false }) => {
  const [landingDone, setLandingDone] = useState(!showLanding);

  return (
    <>
      {showLanding && !landingDone && (
        <LandingAnimation onComplete={() => setLandingDone(true)} />
      )}
      {landingDone && (
        <div className="relative min-h-screen text-textColor-primary selection:bg-accent-primary/30 selection:text-textColor-primary">
          <CustomCursor />
          <BackgroundCanvas />
          <AIAssistant />
          {children}
        </div>
      )}
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/"
          element={
            <SiteLayout showLanding>
              <Home />
            </SiteLayout>
          }
        />
        <Route path="/about" element={<SiteLayout><AboutPage /></SiteLayout>} />
        <Route path="/education" element={<SiteLayout><EducationPage /></SiteLayout>} />
        <Route path="/skills" element={<SiteLayout><SkillsPage /></SiteLayout>} />
        <Route path="/projects" element={<SiteLayout><ProjectsPage /></SiteLayout>} />
        <Route path="/experience" element={<SiteLayout><ExperiencePage /></SiteLayout>} />
        <Route path="/certifications" element={<SiteLayout><CertificationsPage /></SiteLayout>} />
        <Route path="/achievements" element={<SiteLayout><AchievementsPage /></SiteLayout>} />
        <Route path="/contact" element={<SiteLayout><ContactPage /></SiteLayout>} />
        <Route
          path="*"
          element={
            <SiteLayout>
              <NotFound />
            </SiteLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
