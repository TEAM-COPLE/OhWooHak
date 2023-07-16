import Image from 'next/image';

export default function Layout() {
  return (
    <>
      <header className="py-4">
        <div className="container mx-auto flex justify-center items-center">
          <div className="flex items-center">
            <Image src="/logo_white.png" alt="Logo" width={80} height={30} />
          </div>
        </div>
      </header>
    </>
  );
}
