import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import DesktopNavigation from '../../../components/Navigation/DesktopNav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EDUT - Dashboard',
  description: 'Testimonies and Prayer',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='z-10 flex h-screen w-screen overflow-y-hidden font-mono text-sm'>
          <DesktopNavigation />
          {children}
        </div>
      </body>
    </html>
  );
}
