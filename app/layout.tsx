import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import '../styles/parserTheme.css';
import { SkinProvider } from '@/context/skinProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Queton',
  description: 'Ask questions to your hearts content',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: 'primary-gradient',
              footerActionLink: 'primary-text-gradient hover: text-primary-500',
            },
          }}
        >
          <SkinProvider>{children}</SkinProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
