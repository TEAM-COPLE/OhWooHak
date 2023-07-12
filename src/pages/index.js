import Head from 'next/head';
import { RiSunCloudyFill } from 'react-icons/ri';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import React, { useEffect, useState } from 'react';

export default function Home() {
  const [schoolName, setSchoolName] = useState('학교');

  useEffect(() => {
    setSchoolName('부천공업고등학교');
  }, []);

  return (
    <>
      <Head>
        <title>오우학</title>
        <meta name="description" content="니인살" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="w-full text-center mt-14">
        <span className="text-4xl font-bold">오늘 {schoolName}는?</span>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-10">
        <div className="col-span-4">
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
        </div>

        <div className="col-span-1">
          <div className="bg-[#202026] h-[450px] rounded-lg text-2xl">
            <div className="px-5 py-6">
              <div className="flex flex-col items-center text-center">
                <span className="text-2xl font-bold">오늘의 급식</span>
                <span className="text-lg text-gray-400 font-bold block mt-2">2023년 7월 12일</span>

                <div className="mt-8">
                  <span className="text-xl font-bold block mt-2">현미밥</span>
                  <span className="text-xl font-bold block mt-2">버섯만두전골</span>
                  <span className="text-xl font-bold block mt-2">양배추쌈</span>
                  <span className="text-xl font-bold block mt-2">씨앗쌈장</span>
                  <span className="text-xl font-bold block mt-2">제육볶음</span>
                  <span className="text-xl font-bold block mt-2">배추김치</span>
                  <span className="text-xl font-bold block mt-2">브라우니</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <div className="bg-[#202026] h-[450px] rounded-lg text-2xl">
            <div className="px-5 py-6">
              <div className="flex flex-col items-center text-center">
                <span className="text-2xl font-bold">오늘의 시간표</span>
                <span className="text-lg text-gray-400 font-bold block mt-2">2023년 7월 12일</span>

                <div className="mt-5">
                  <span className="text-2xl font-bold block mt-2 text-gray-400">수학</span>
                  <MdOutlineKeyboardArrowDown className="text-6xl block mt-2 text-gray-600" />
                  <span className="text-2xl font-bold block mt-2">국어</span>
                  <MdOutlineKeyboardArrowDown className="text-6xl block mt-2 text-gray-600" />
                  <span className="text-2xl font-bold block mt-2 text-gray-400">영어</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <div className="bg-[#202026] overflow-auto h-[450px] rounded-lg text-2xl">
            <div className="px-5 py-6">
              <div className="flex flex-col items-center text-center">
                <span className="text-2xl font-bold">오늘의 일정</span>

                <div className="mt-5">
                  <div className="flex flex-col items-center text-center bg-gray-700 rounded-lg px-2 pb-2">
                    <span className="text-base text-gray-300 font-bold block mt-2">2023년 7월 11일</span>
                    <span className="text-lg font-bold block mt-2">3학년 직업기초능력평가</span>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex flex-col items-center text-center bg-gray-700 rounded-lg px-2 pb-2">
                    <span className="text-base text-gray-300 font-bold block mt-2">2023년 7월 12일</span>
                    <span className="text-lg font-bold block mt-2">3학년 직업기초능력평가</span>
                    <span className="text-lg font-bold block mt-2">심의회</span>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex flex-col items-center text-center bg-gray-700 rounded-lg px-2 pb-2">
                    <span className="text-base text-gray-300 font-bold block mt-2">2023년 7월 13일</span>
                    <span className="text-lg font-bold block mt-2">3학년 직업기초능력평가</span>
                    <span className="text-lg font-bold block mt-2">동아리 활동</span>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex flex-col items-center text-center bg-gray-700 rounded-lg px-2 pb-2">
                    <span className="text-base text-gray-300 font-bold block mt-2">2023년 7월 14일</span>
                    <span className="text-lg font-bold block mt-2">3학년 직업기초능력평가</span>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex flex-col items-center text-center bg-gray-700 rounded-lg px-2 pb-2">
                    <span className="text-base text-gray-300 font-bold block mt-2">2023년 7월 18일</span>
                    <span className="text-lg font-bold block mt-2">방학식</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <div className="bg-[#202026] overflow-auto h-[450px] rounded-lg text-2xl">
            <div className="px-5 py-6">
              <div className="flex flex-col items-center text-center">
                <span className="text-2xl font-bold">커뮤니티</span>

                <div className="mt-5">
                  <div className="flex flex-col items-center text-center bg-gray-700 rounded-lg px-2 pb-2">
                    <span className="text-base font-bold block mt-2">대충 커뮤니티 글 제목</span>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex flex-col items-center text-center bg-gray-700 rounded-lg px-2 pb-2">
                    <span className="text-base font-bold block mt-2">대충 커뮤니티 글 제목</span>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex flex-col items-center text-center bg-gray-700 rounded-lg px-2 pb-2">
                    <span className="text-base font-bold block mt-2">대충 커뮤니티 글 제목</span>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex flex-col items-center text-center bg-gray-700 rounded-lg px-2 pb-2">
                    <span className="text-base font-bold block mt-2">대충 커뮤니티 글 제목</span>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex flex-col items-center text-center bg-gray-700 rounded-lg px-2 pb-2">
                    <span className="text-base font-bold block mt-2">대충 커뮤니티 글 제목</span>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex flex-col items-center text-center bg-gray-700 rounded-lg px-2 pb-2">
                    <span className="text-base font-bold block mt-2">대충 커뮤니티 글 제목</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
