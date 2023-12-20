'use client';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

import firebase_app from '../../firebase/firebaseConfig';
import { Key, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

const auth = getAuth(firebase_app);
const time = new Date();

const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'This field is required' })
    .email('This email is not valid'),
  password: z
    .string()
    .min(8, { message: 'Password must be longer than 7 characters' }),
});

const signUpSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'This field is required' })
    .email('This email is not valid'),
  password: z
    .string()
    .min(8, { message: 'Password must be longer than 7 characters' }),
  accept: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the Terms & Conditions' }),
  }),
});

const SignInForm = (key: Key, showSignUp: Boolean, toggleScreen: Function) => {
  const router = useRouter();

  const inForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;

        router.push('/dashboard');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage);
      });

    console.log(values);
  }

  return (
    <motion.div
      key={key}
      layout
      className='w-9/12'
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.3 }}
    >
      <Form {...inForm}>
        <form onSubmit={inForm.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={inForm.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className='hover:shadow-sm'>
                    <Input placeholder='youremail@provider.com' {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={inForm.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className='hover:shadow-sm'>
                    <Input type='password' placeholder='password' {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='w-full'>
            <Button type='submit' variant='login'>
              Log In
            </Button>
          </div>
        </form>
      </Form>

      <div className='flex w-full items-center justify-center gap-3 py-3'>
        <div className='h-[0.05rem] w-8/12 grow bg-black' />
      </div>

      <div
        className={`flex w-full items-center ${
          showSignUp ? 'justify-end' : 'justify-between'
        }`}
      >
        {!showSignUp && (
          <h2 className='text-center'>Don&apos;t have an account?</h2>
        )}
        <Button variant='link' onClick={() => toggleScreen(!showSignUp)}>
          {showSignUp ? 'Back to Sign In' : 'Sign Up'}
        </Button>
      </div>
    </motion.div>
  );
};

const SignUpForm = (key: Key, showSignUp: Boolean, toggleScreen: Function) => {
  const router = useRouter();

  const upForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      accept: true,
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;

        router.push('/dashboard');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage);
      });

    console.log(values);
  }

  return (
    <motion.div
      key={key}
      layout
      className='w-9/12'
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.3 }}
    >
      <Form {...upForm}>
        <form onSubmit={upForm.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={upForm.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className='hover:shadow-sm'>
                    <Input placeholder='youremail@provider.com' {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={upForm.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className='hover:shadow-sm'>
                    <Input type='password' placeholder='password' {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={upForm.control}
            name='accept'
            render={({ field }) => (
              <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className='flex items-center space-y-1 leading-none'>
                  <FormLabel>
                    Accept <Link href='/'>terms &amp; conditions.</Link>
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <div className='w-full'>
            <Button type='submit' variant='signup'>
              Sign Up
            </Button>
          </div>
        </form>
      </Form>

      <div className='flex w-full items-center justify-center gap-3 py-3'>
        <div className='h-[0.05rem] w-8/12 grow bg-black' />
      </div>

      <div
        className={`flex w-full items-center ${
          showSignUp ? 'justify-end' : 'justify-between'
        }`}
      >
        {!showSignUp && (
          <h2 className='text-center'>Don&apos;t have an account?</h2>
        )}
        <Button variant='link' onClick={() => toggleScreen(!showSignUp)}>
          {showSignUp ? 'Back to Sign In' : 'Sign Up'}
        </Button>
      </div>
    </motion.div>
  );
};

export default function SignIn() {
  const [showSignUp, setShowSignUp] = useState(false);

  const router = useRouter();

  const handleContinueWithGoogle = async () => {
    signInWithRedirect(auth, new GoogleAuthProvider());
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          router.push('/dashboard');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='container grid grid-cols-1 overflow-hidden rounded-md px-0 shadow-md lg:grid-cols-2'>
      <div className='relative min-h-[400px] w-full'>
        <Image
          className='rounded-bl-md rounded-tl-md'
          src='https://images.squarespace-cdn.com/content/v1/621ff22a64b3431ad8990285/0932fed2-797f-429e-94b5-4d29e916a2e0/Pic1.jpg'
          alt='Splash image of a white LED cross lit up in the night sky'
          layout='fill'
          objectFit='cover'
        />
      </div>
      <motion.div
        layout
        className='relative flex flex-col items-center justify-center gap-2 rounded-r-md bg-white p-10 py-24'
        exit={{ opacity: 0, translateX: 40 }}
      >
        <h1 className='font-sans text-7xl font-semibold'>EDUT</h1>

        <Button asChild variant='outline' onClick={handleContinueWithGoogle} className='cursor-pointer'>
          <div className='flex items-center gap-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='24'
              viewBox='0 0 24 24'
              width='24'
            >
              <path
                d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                fill='#4285F4'
              />
              <path
                d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                fill='#34A853'
              />
              <path
                d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                fill='#FBBC05'
              />
              <path
                d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                fill='#EA4335'
              />
              <path d='M1 1h22v22H1z' fill='none' />
            </svg>
            <h1>Continue with Google</h1>
          </div>
        </Button>

        <div className='flex w-9/12 items-center justify-center gap-3 py-3'>
          <div className='h-[0.05rem] w-8/12 grow bg-black' />
          <h2 className='flex-none'>OR</h2>
          <div className='h-[0.05rem] w-8/12 grow bg-black' />
        </div>

        <AnimatePresence presenceAffectsLayout mode='wait' initial={false}>
          {showSignUp
            ? SignUpForm('signup', showSignUp, setShowSignUp)
            : SignInForm('signin', showSignUp, setShowSignUp)}
        </AnimatePresence>

        <div className='absolute bottom-0 flex w-full items-center justify-around rounded-br-md py-3'>
          <h2>EDUT &copy; {time.getFullYear()}</h2>
          <Button variant='link'>Privacy Policy</Button>
          <Button variant='link'>Terms</Button>
        </div>
      </motion.div>
    </div>
  );
}
