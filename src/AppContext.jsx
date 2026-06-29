import { createContext, useState, useContext } from 'react';
import { MOCK_USER } from './data';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activeScreen, setActiveScreen] = useState('home');
  const [mediBuddyModalOpen, setMediBuddyModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openMediBuddy = (product = null) => {
    setSelectedProduct(product);
    setMediBuddyModalOpen(true);
  };

  const closeMediBuddy = () => {
    setMediBuddyModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <AppContext.Provider value={{ 
      activeScreen, setActiveScreen, 
      user: MOCK_USER,
      mediBuddyModalOpen,
      openMediBuddy,
      closeMediBuddy,
      selectedProduct
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
