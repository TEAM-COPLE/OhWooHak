import { RiSunCloudyFill } from 'react-icons/ri';

export default function Weather() {
  return (
    <>
      <div className="bg-[#202026] h-full rounded-lg text-2xl">
        <div className="flex items-center px-5 py-6">
          <div className="flex flex-col items-center">
            <RiSunCloudyFill className="text-7xl" />
            <span className="ml-2.5 font-bold">구름 많음</span>
          </div>

          <div className="ml-10">
            <span className="text-2xl font-bold mt-2">30도</span>
            <span className="text-xl font-bold block mt-2">경기도 부천시 송내동</span>
            <span className="text-lg text-gray-400 font-bold block mt-2">습하고 더운 날씨에요</span>
          </div>

          <div className="ml-10">
            <span className="text-xl font-bold block mt-2">습도</span>
            <span className="text-lg text-gray-400 font-bold block mt-2">85%</span>
          </div>
          <div className="ml-10">
            <span className="text-xl font-bold block mt-2">바람</span>
            <span className="text-lg text-gray-400 font-bold block mt-2">3m/s</span>
          </div>
          <div className="ml-10">
            <span className="text-xl font-bold block mt-2">강수확률</span>
            <span className="text-lg text-gray-400 font-bold block mt-2">30%</span>
          </div>
          <div className="ml-10">
            <span className="text-xl font-bold block mt-2">미세먼지</span>
            <span className="text-lg text-gray-400 font-bold block mt-2">좋음 / 20</span>
          </div>
          <div className="ml-10">
            <span className="text-xl font-bold block mt-2">초미세먼지</span>
            <span className="text-lg text-gray-400 font-bold block mt-2">보통 / 16</span>
          </div>
          <div className="ml-10">
            <span className="text-xl font-bold block mt-2">오존</span>
            <span className="text-lg text-gray-400 font-bold block mt-2">좋음 / 0.04</span>
          </div>
        </div>
      </div>
    </>
  );
}
