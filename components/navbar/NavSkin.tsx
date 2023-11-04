'use client';

import { useSkin } from '@/context/skinProvider';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';
import { skins } from '@/constants/skins';

const NavSkin = () => {
  const { skin, setSkin } = useSkin();

  return (
    <div>
      {skin === 'light' ? (
        <span
          className=""
          onClick={() => {
            setSkin('dark');

            if (skin !== 'system') {
            }
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
