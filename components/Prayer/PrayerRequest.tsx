import { CheckCircle2, XCircle } from 'lucide-react';

export default function PrayerRequest() {
  return (
    <div className='flex items-center justify-between gap-3 rounded-md bg-edut-primary hover:shadow-md'>
      <div className='flex flex-col py-2'>
        <p className='px-3 text-edut-text'>Prayer Title</p>
        <p className='px-3 text-edut-text'>Requester Name</p>
      </div>
      <div className='flex items-center justify-around gap-4 px-6'>
        <button>
          <CheckCircle2 size={18} className='hover:text-edut-secondary' />
        </button>
        <button>
          <XCircle size={18} className='hover:text-edut-secondary' />
        </button>
      </div>
    </div>
  );
}
