'use client';

import { sidebarLinks } from '@/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignedOut, useAuth } from '@clerk/nextjs';

const Sidebar = () => {
  const pathname = usePathname();
  const { userId } = useAuth();

  return (
    <section className="hidden min-h-full md:min-w-[5rem] lg:min-w-[15rem] pt-24 md:flex flex-col justify-between py-4 px-2 border-r border-black/10 dark:border-white/20">
      <div className="flex flex-col gap-4 pt-6">
        {sidebarLinks.map((item, index) => {
          let { label, route, icon } = item;
          const isActive =
            (pathname.includes(route) && route.length > 1) ||
            pathname === route;

          if (route === '/profile') {
            if (userId) {
              route = `${route}/${userId}`;
            } else {
              return null;
            }
          }
          return (
            <Link
              key={route}
              href={route}
              className={`${
                isActive
                  ? 'text-black/90 dark:text-white/90 font-semibold'
                  : 'text-black/30 dark:text-white/30 '
              }
              p-3
              ${
                index !== sidebarLinks.length - 1
                  ? 'border-b border-black/10  dark:border-white/20'
                  : ''
              }
              hover:text-black
              dark:hover:text-white
              last:border-b-0
              group
            `}
            >
              <span className="lg:hidden">{icon}</span>
              <p className="hidden lg:block text-lg w-full group-hover:font-semibold group-hover:translate-x-2 transition">
                {label}
              </p>
            </Link>
          );
        })}
      </div>

      <SignedOut>
        <div>
          <h3 className="p-2 text-black text-sm dark:text-white mb-2 border-b border-black/10  dark:border-white/30">
            Account
          </h3>
          <div className="flex flex-col lg:flex-row justify-evenly items-center bg-black/80 dark:bg-white text-white rounded-md">
            <Link
              href="/sign-up"
              className="p-2  dark:text-black dark:hover:text-black/70 border-b border-white dark:border-black/20  lg:border-none"
            >
              <span className="lg:text-md md:text-sm w-full">Sign Up</span>
            </Link>
            <span className="hidden lg:block dark:text-black text-xl">/</span>
            <Link
              href="/sign-in"
              className="p-2 dark:text-black dark:hover:text-black/70"
            >
              <span className="lg:text-md md:text-sm w-full">Log In</span>
            </Link>
          </div>
        </div>
      </SignedOut>
    </section>
  );
};

export default Sidebar;
