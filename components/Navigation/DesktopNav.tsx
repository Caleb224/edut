'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  Church,
  LogOut,
  Scroll,
  SettingsIcon,
  Shapes,
  Sun,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface LinkWrapperProps {
  children: ReactNode;
}

const LinksWrapper = ({ children }: LinkWrapperProps) => (
  <div className='flex flex-col gap-10 self-center text-left'>{children}</div>
);

export default function DesktopNavigation() {
  const { currentUser, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    logout()
      .then(() => {
        router.push('/');
      })
      .catch((error) => {
        alert(error);
      });
  };

  if (currentUser == null) {
    router.push('/');
  }

  return (
    <div className='left-0 flex h-full w-72 flex-col justify-between bg-white shadow-lg'>
      <div className='flex w-full flex-col'>
        <h1 className='py-20 text-center text-6xl font-semibold'>EDUT</h1>
        <LinksWrapper>
          <Link href='/dashboard'>
            <span className='flex items-center gap-4 hover:text-edut-primary'>
              <Shapes />
              Dashboard
            </span>
          </Link>
          <Link href='/prayer'>
            <span className='flex items-center gap-4 hover:text-edut-primary'>
              <Sun />
              Prayer
            </span>
          </Link>
          <Link href='/testimony'>
            <span className='flex items-center gap-4 hover:text-edut-primary'>
              <Scroll />
              Testimony
            </span>
          </Link>
          <Link href='/community'>
            <span className='flex items-center gap-4 hover:text-edut-primary'>
              <Church />
              Community
            </span>
          </Link>
        </LinksWrapper>
      </div>
      <div className='flex flex-col justify-center gap-6 p-4'>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center gap-4'>
            <Image
              src={currentUser?.photoURL || ''}
              alt=''
              width={200}
              height={200}
              className='h-12 w-12 rounded-full'
            />
            {currentUser?.displayName}
          </div>
          <Button variant='outline' size='icon'>
            <SettingsIcon size={18} />
          </Button>
        </div>
        <Button variant='secondary' onClick={() => handleLogout()}>
          <div className='flex items-center gap-4'>
            <h1>Signout</h1>
            <LogOut size={18} />
          </div>
        </Button>
      </div>
    </div>
  );
}
