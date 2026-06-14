import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import {
  loadPortfolioData,
  savePortfolioData,
  resetPortfolioData as resetDefaults,
  getVisitorCount,
  trackVisit,
} from '../data/defaultPortfolio';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(() => loadPortfolioData());
  const [visitorCount, setVisitorCount] = useState(() => getVisitorCount());

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

  const importPortfolio = useCallback((imported) => {
    const merged = { ...loadPortfolioData(), ...imported };
    if (imported.achievements) merged.achievements = imported.achievements;
    if (imported.settings) merged.settings = { ...loadPortfolioData().settings, ...imported.settings };
    savePortfolioData(merged);
    setData(merged);
    return merged;
  }, []);

  const recordVisit = useCallback(() => {
    const count = trackVisit();
    setVisitorCount(count);
    return count;
  }, []);

  useEffect(() => {
    setVisitorCount(getVisitorCount());
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        data,
        updateData,
        refreshData,
        resetPortfolio,
        importPortfolio,
        visitorCount,
        recordVisit,
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
