'use client';

import { useSkin } from '@/context/skinProvider';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';

const NavSkin = () => {
  const { skin, setSkin } = useSkin();

  return (
    <div>
      {skin === 'light' ? (
        <span
          className="cursor-pointer"
          onClick={() => {
            setSkin('dark');
          }}
        >
          <BsSunFill className="h-5 w-5" />
        </span>
      ) : (
        <span onClick={() => setSkin('light')}>
          <BsMoonFill className="h-5 w-5 dark:fill-white" />
        </span>
      )}
    </div>
  );
};

export default NavSkin;
