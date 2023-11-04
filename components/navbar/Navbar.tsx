import Link from 'next/link';
import Image from 'next/image';
import { SignedIn, UserButton } from '@clerk/nextjs';
import NavSkin from './NavSkin';
import MobileNav from './mobileNav/MobileNav';
import Search from './Search';

const Navbar = () => {
  return (
    <nav className="fixed w-full flex-between gap-5 background-light-900_dark-100 p-6 sm:px-12 sahdow-light-300 dark:shadow-none z-50">
      <Link href="/" className="flex items-center gap-1">
        {/* <Image
          src={'/assets/images/site-logo.svg'}
          width={24}
          height={24}
          alt="site-logo"
        /> */}
        <span className="h2-bold font-spaceGrotesk dark:text-light-900 max-sm:hidden">
          Queton
        </span>
      </Link>

      <Search />

      <div className="flex-between gap-5">
        <NavSkin />
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: 'h-8 w-8',
              },
              variables: {
                colorPrimary: '#000',
              },
            }}
          />
        </SignedIn>

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
