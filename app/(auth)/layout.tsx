import { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  return <main className="w-full min-h-screen flex-center">{children}</main>;
};

export default Layout;
