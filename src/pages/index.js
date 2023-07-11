import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>오우학</title>
        <meta name="description" content="니인살" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="grid grid-cols-4 gap-4 px-10 mt-24">
        <div className="col-span-1">
          <div className="bg-gray-800 h-32 rounded-lg text-center font-bold text-2xl">1번 그리드</div>
        </div>
        <div className="col-span-1">
          <div className="bg-gray-800 h-32 rounded-lg text-center font-bold text-2xl">2번 그리드</div>
        </div>
        <div className="col-span-1">
          <div className="bg-gray-800 h-32 rounded-lg text-center font-bold text-2xl">3번 그리드</div>
        </div>
        <div className="col-span-1">
          <div className="bg-gray-800 h-32 rounded-lg text-center font-bold text-2xl">4번 그리드</div>
        </div>
      </div>
    </>
  );
}
