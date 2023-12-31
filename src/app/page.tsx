import SignIn from '../../components/SignIn/SingIn';

export default function Home() {
  return (
    <div
      className='login-background
     z-10 flex h-screen w-screen items-center justify-center font-mono text-sm'
    >
      <SignIn />
    </div>
  );
}
