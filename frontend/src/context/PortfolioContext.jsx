import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import {
  loadPortfolioData,
  savePortfolioData,
  resetPortfolioData as resetDefaults,
  getVisitorCount,
  trackVisit,
} from '../data/defaultPortfolio';
import { fetchAllSections } from '../services/api';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(() => loadPortfolioData());
  const [visitorCount, setVisitorCount] = useState(() => getVisitorCount());
  const [loading, setLoading] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [globalBlast, setGlobalBlast] = useState(false);

  // Fetch all portfolio data from backend on mount
  useEffect(() => {
    const fetchFromBackend = async () => {
      try {
        const backendData = await fetchAllSections();
        if (backendData && Object.keys(backendData).length > 0) {
          // Track maintenance mode
          if (backendData.maintenanceMode !== undefined) {
            setMaintenanceMode(backendData.maintenanceMode);
          }
          if (backendData.globalBlast !== undefined) {
            setGlobalBlast(backendData.globalBlast);
          }

          // Merge backend data with defaults so no section is empty
          const merged = { ...loadPortfolioData(), ...backendData };
          // Only use backend arrays if they have items
          if (backendData.projects?.length > 0) merged.projects = backendData.projects;
          if (backendData.skills?.length > 0) merged.skills = backendData.skills;
          if (backendData.certifications?.length > 0) merged.certifications = backendData.certifications;
          if (backendData.education?.length > 0) merged.education = backendData.education;
          if (backendData.experience?.length > 0) merged.experience = backendData.experience;
          if (backendData.achievements?.stats?.length > 0 || backendData.achievements?.highlights?.length > 0) {
            merged.achievements = backendData.achievements;
          }
          if (backendData.skillCategories?.length > 0) merged.skillCategories = backendData.skillCategories;
          if (backendData.projectCategories?.length > 0) merged.projectCategories = backendData.projectCategories;
          if (Object.keys(backendData.settings ?? {}).length > 0) merged.settings = { ...merged.settings, ...backendData.settings };
          if (Object.keys(backendData.about ?? {}).length > 0) merged.about = { ...merged.about, ...backendData.about };

          savePortfolioData(merged);
          setData(merged);
        }
      } catch (err) {
        // Backend unavailable — use localStorage fallback
        console.warn('Backend unavailable, using local data:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFromBackend();
  }, []);

  // Re-fetch from backend (called after admin CRUD operations)
  const refreshFromBackend = useCallback(async () => {
    try {
      const backendData = await fetchAllSections();
      if (backendData && Object.keys(backendData).length > 0) {
        if (backendData.maintenanceMode !== undefined) {
          setMaintenanceMode(backendData.maintenanceMode);
        }
        if (backendData.globalBlast !== undefined) {
          setGlobalBlast(backendData.globalBlast);
        }

        const merged = { ...loadPortfolioData(), ...backendData };
        if (backendData.projects?.length > 0) merged.projects = backendData.projects;
        if (backendData.skills?.length > 0) merged.skills = backendData.skills;
        if (backendData.certifications?.length > 0) merged.certifications = backendData.certifications;
        if (backendData.education?.length > 0) merged.education = backendData.education;
        if (backendData.experience?.length > 0) merged.experience = backendData.experience;
        if (backendData.achievements?.stats?.length > 0 || backendData.achievements?.highlights?.length > 0) {
          merged.achievements = backendData.achievements;
        }
        if (backendData.skillCategories?.length > 0) merged.skillCategories = backendData.skillCategories;
        if (backendData.projectCategories?.length > 0) merged.projectCategories = backendData.projectCategories;
        if (Object.keys(backendData.settings ?? {}).length > 0) merged.settings = { ...merged.settings, ...backendData.settings };
        if (Object.keys(backendData.about ?? {}).length > 0) merged.about = { ...merged.about, ...backendData.about };

        savePortfolioData(merged);
        setData(merged);
      }
    } catch (err) {
      console.warn('Backend refresh failed:', err.message);
    }
  }, []);

  const refreshData = useCallback(() => {
    setData(loadPortfolioData());
  }, []);

  const updateData = useCallback((updater) => {
    setData((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      savePortfolioData(next);
      return next;
    });
  }, []);

  const resetPortfolio = useCallback(() => {
    const defaults = resetDefaults();
    setData(defaults);
    return defaults;
  }, []);

  const recordVisit = useCallback(() => {
    const count = trackVisit();
    setVisitorCount(count);
    return count;
  }, []);


  return (
    <PortfolioContext.Provider
      value={{
        data,
        updateData,
        refreshData,
        refreshFromBackend,
        resetPortfolio,
        visitorCount,
        recordVisit,
        loading,
        maintenanceMode,
        setMaintenanceMode,
        globalBlast,
        setGlobalBlast,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio must be used within a PortfolioProvider');
  return context;
};
