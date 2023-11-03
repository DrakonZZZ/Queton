import Link from 'next/link';
import Image from 'next/image';
import { SignedIn, UserButton } from '@clerk/nextjs';
import NavSkin from './NavSkin';

const Navbar = () => {
  return (
    <nav className="fixed w-full flex-between gap-5 background-light-900_dark-200 p-6 sm:px-12 sahdow-light-300 dark:shadow-none z-50">
      <Link href="/" className="flex items-center gap-1">
        {/* <Image
          src={'/assets/images/site-logo.svg'}
          width={24}
          height={24}
          alt="site-log"
        /> */}
        <span className="h2-bold font-spaceGrotesk max-sm:hidden">Queton</span>
      </Link>

      {/* global search */}

      <div className="flex-between gap-5">
        <SignedIn>
          <NavSkin />
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: 'h-10 w-10',
              },
              variables: {
                colorPrimary: '#000',
              },
            }}
          />
        </SignedIn>

        {/* mobile menu */}
      </div>
    </nav>
  );
};

export default Navbar;
