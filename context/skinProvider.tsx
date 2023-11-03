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
  const [skin, setSkin] = useState('');

  const skinChange = () => {
    if (
      localStorage.skin === 'dark' ||
      (!('skin' in localStorage) &&
        matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setSkin('dark');
      document.documentElement.classList.add('dark');
    } else {
      setSkin('light');
      document.documentElement.classList.add('light');
    }
  };

  console.log(skin);

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
  return context;
};
