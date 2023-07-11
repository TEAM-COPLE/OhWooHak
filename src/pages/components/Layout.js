import Image from 'next/image';

export default function Layout() {
  return (
    <>
      <header className="py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center">
            <Image src="/logo_white.png" alt="Logo" width={80} height={30} />
          </div>

          <form className="flex items-center justify-center flex-grow">
            <input
              className="border border-gray-800 rounded-full py-2 px-4 w-1/2 bg-[#202026]"
              type="text"
              placeholder="검색어를 입력하세요!"
            />
          </form>

          <div>
            <button className="text-lg font-bold">로그인</button>
          </div>
        </div>
      </header>
    </>
  );
}
