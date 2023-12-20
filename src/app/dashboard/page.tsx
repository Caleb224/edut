import DesktopNavigation from "../../../components/Navigation/DesktopNav";

export default function Home() {
  return (
    <div className='z-10 flex h-screen w-screen font-mono text-sm bg-edut-background overflow-y-hidden'>
      <DesktopNavigation/>
      <h1>Dashboard Page</h1>
    </div>
  );
}
