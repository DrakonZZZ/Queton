'use client';

import { LuPlus } from 'react-icons/lu';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';
import { SignedOut } from '@clerk/nextjs';
import { sidebarLinks } from '@/constants';
import { usePathname } from 'next/navigation';

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <span className="dark:text-white flex gap-1 font-semibold border-b-[2px] border-white py-1 sm:hidden">
          Menu
          <LuPlus
            className="w-6 h-6 dark:fill-white"
            aria-label="open-menu"
            strokeWidth="3"
          />
        </span>
      </SheetTrigger>
      <SheetContent className="background-light-900_dark-200 border-none dark:bg-primary-400">
        <div className="h-full flex flex-col justify-between">
          <SheetClose asChild>
            <NavContent />
          </SheetClose>
          <SignedOut>
            <div>
              <h3 className="px-2 text-black dark:text-white">Account</h3>
              <div className="flex flex-row items-center gap-3">
                <SheetClose asChild>
                  <Link
                    href="/sign-up"
                    className="py-3 px-2 text-black dark:text-white dark:hover:text-white/70 underline underline-offset-[3px]"
                  >
                    <span className="text-xl w-full">Sign Up</span>
                  </Link>
                </SheetClose>
                <span className="dark:text-white text-2xl">/</span>
                <SheetClose asChild>
                  <Link
                    href="/sign-in"
                    className="py-3 px-2  text-black dark:text-white dark:hover:text-white/70 underline underline-offset-[3px]"
                  >
                    <span className="text-xl w-full">Log In</span>
                  </Link>
                </SheetClose>
              </div>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const NavContent = () => {
  const pathname = usePathname();

  return (
    <section className="flex flex-col gap-4 pt-10">
      {sidebarLinks.map((item) => {
        const { label, route } = item;
        const isActive =
          (pathname.includes(route) && route.length > 1) || pathname === route;
        console.log(isActive);
        return (
          <SheetClose key={route} asChild>
            <Link
              href={route}
              className={`${
                isActive
                  ? 'text-black/90 dark:text-white/90'
                  : 'text-black/50 dark:text-white/60 '
              } py-3 px-2 border-b border-primary-300/50 dark:hover:text-white/70`}
            >
              <p className="text-2xl w-full">{label}</p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};
export default MobileNav;
