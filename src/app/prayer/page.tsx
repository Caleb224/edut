'use client';

import { Suspense, useEffect, useState } from 'react';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export default function Prayer() {
  const [value, setValue] = useState('**Hello world!!!**');
  const [prayers, setPrayers] = useState([]);

  useEffect(() => {
    async function fetchPrayers() {
      const response = await fetch('/api/prayer');
      const prayers = await response.json();
      setPrayers(prayers);
    }

    fetchPrayers();
  }, []);

  return (
    <div className='flex h-full w-full flex-col overflow-y-scroll rounded-md bg-white p-4 shadow-md'>
      <h1 className='pl-6 text-2xl font-semibold'>Prayer</h1>
      <hr className='my-4' />
      <h1 className='py-2 pl-6 font-semibold text-lg'>Categories</h1>
      <div className=''>
        <Tabs defaultValue='all' className='w-full px-6'>
          <div className='w-full flex justify-between items-center gap-3'>
            <TabsList className='w-full flex justify-start py-4'>
              <TabsTrigger value='all'>All</TabsTrigger>
              <TabsTrigger value='morning'>Morning</TabsTrigger>
              <TabsTrigger value='noon'>Noon</TabsTrigger>
              <TabsTrigger value='night'>Night</TabsTrigger>
              <TabsTrigger value='friends'>Friends</TabsTrigger>
            </TabsList>
            <Button variant='outline' title='Add Category'>
              <Plus size={18} className='text-muted-foreground p-0 m-0' />
            </Button>
          </div>
          <TabsContent value='all' className='grid grid-cols-3 gap-3 py-3 h-full'>
            <div className='h-full bg-slate-50 rounded-sm'>
              Content 
            </div>
            <div className='h-full bg-slate-100 rounded-sm'>
              Content 
            </div>
            <div className='h-full bg-slate-100 rounded-sm'>
              Content 
            </div>
          </TabsContent>
          <TabsContent value='morning'>Morning Tab</TabsContent>
          <TabsContent value='noon'>Noon Tab</TabsContent>
          <TabsContent value='night'>Night Tab</TabsContent>
          <TabsContent value='friends'>Friends Tab</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
