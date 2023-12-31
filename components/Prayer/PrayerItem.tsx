import { GripVertical, Pencil, PlusCircle } from 'lucide-react';

interface PrayerItemProps {
  title: String;
  content: String;
  count: String;
}

export default function PrayerItem({ title, content, count }: PrayerItemProps) {
  return (
    <div className='flex items-center justify-between gap-3 rounded-md bg-edut-secondary py-2 hover:shadow-sm'>
      <div className='flex flex-col py-2'>
        <p className='px-3 text-edut-text'>{title}</p>
      </div>
      <div className='flex items-center justify-around gap-3 px-3 text-edut-text'>
        <PlusCircle
          size={18}
          className='cursor-pointer hover:text-edut-accent'
        />
        <Pencil size={18} className='cursor-pointer hover:text-edut-accent' />
        <GripVertical
          size={18}
          className='cursor-pointer hover:text-edut-accent'
        />
      </div>
    </div>
  );
}
