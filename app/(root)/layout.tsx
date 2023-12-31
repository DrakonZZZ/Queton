import Navbar from '@/components/navbar/Navbar';
import Rightbar from '@/components/rightbar/Rightbar';
import Sidebar from '@/components/sidebar/Sidebar';
import { Toaster } from '@/components/ui/toaster';
import { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="background-light-850_dark-100 relative">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex min-h-screen flex-1 flex-col px-6 pt-36 pb-6 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </div>
        <Rightbar />
      </div>
      <Toaster />
    </main>
  );
};

export default Layout;
