'use client';

import { useSkin } from '@/context/skinProvider';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar';
import Image from 'next/image';
import { skins } from '@/constants/skins';

const NavSkin = () => {
  const { skin, setSkin } = useSkin();

  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state-open]:bg-dark-200">
          {skin === 'light' ? (
            <Image
              src="/assets/icons/sun.svg"
              width={20}
              height={20}
              alt="theme-light"
              className="active-theme"
            />
          ) : (
            <Image
              src="/assets/icons/moon.svg"
              width={20}
              height={20}
              alt="theme-light"
              className="active-theme"
            />
          )}
        </MenubarTrigger>
        <MenubarContent className="min-w-[120px] px-2 absolute right-[-2rem] dark:border-dark-400 dark:bg-dark-300">
          {skins.map((item) => {
            const { id, lable, value, icon } = item;

            return (
              <MenubarItem
                key={id}
                className="flex items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400"
                onClick={() => {
                  setSkin(value);

                  if (value !== 'system') {
                    localStorage.skin = value;
                  } else {
                    localStorage.removeItem('skin');
                  }
                }}
              >
                <Image
                  src={icon}
                  width={16}
                  height={16}
                  alt={lable}
                  className={`${skin === item.value && 'active-theme'}`}
                />
                <p
                  className={`font-semibold ${
                    skin === value ? 'text-dark-100' : 'text-light-500/60'
                  }`}
                >
                  {lable}
                </p>
              </MenubarItem>
            );
          })}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default NavSkin;
