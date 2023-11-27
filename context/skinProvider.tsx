'use client';

import {
  useContext,
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
} from 'react';

interface SkinContextType {
  skin: string;
  setSkin: (skin: string) => void;
}

const SkinContext = createContext<SkinContextType | undefined>(undefined);

export const SkinProvider = ({ children }: PropsWithChildren) => {
  // const localSkinStore = localStorage.getItem('skin');
  const [skin, setSkin] = useState('light');

  const skinChange = () => {
    if (skin === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('skin', 'dark');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('skin', 'light');
    }
  };

  useEffect(() => {
    skinChange();
  }, [skin]);

  return (
    <SkinContext.Provider value={{ skin, setSkin }}>
      {children}
    </SkinContext.Provider>
  );
};

export const useSkin = () => {
  const context = useContext(SkinContext);
  if (context === undefined) {
    throw new Error('useSkin must be user within a SkinProvider');
  }
  return context;
};
