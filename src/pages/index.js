import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Meal from './components/Meal';
import Timetable from './components/Timetable';
import Weather from './components/Weather';
import Schedule from './components/Schedule';
import Community from './components/Community';

export default function Home() {
  const router = useRouter();
  const [schoolName, setSchoolName] = useState('학교');
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [schoolList, setSchoolList] = useState([]);
  const [grade, setGrade] = useState('');
  const [classNumber, setClassNumber] = useState('');

  useEffect(() => {
    const cachedSchoolName = localStorage.getItem('SCHUL_NM');
    if (cachedSchoolName) {
      setSchoolName(cachedSchoolName);
    }
  }, []);

  const handleSearch = async () => {
    if (inputValue.trim() === '') {
      return;
    }

    try {
      const response = await fetch(
        `https://open.neis.go.kr/hub/schoolInfo?KEY=?KEY=${
          process.env.NEXT_PUBLIC_API_KEY
        }&Type=json&SCHUL_NM=${encodeURIComponent(inputValue)}`,
      );
      const data = await response.json();

      setSchoolList(data.schoolInfo[1].row);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleSchoolSelect = school => {
    const { ATPT_OFCDC_SC_CODE, SD_SCHUL_CODE, ORG_RDNMA, SCHUL_NM, SCHUL_KND_SC_NM } = school;

    // Cache the values
    localStorage.setItem('ATPT_OFCDC_SC_CODE', ATPT_OFCDC_SC_CODE);
    localStorage.setItem('SD_SCHUL_CODE', SD_SCHUL_CODE);
    localStorage.setItem('ORG_RDNMA', ORG_RDNMA);
    localStorage.setItem('SCHUL_NM', SCHUL_NM);
    localStorage.setItem('SCHUL_KND_SC_NM', SCHUL_KND_SC_NM);
    localStorage.setItem('GRADE', grade);
    localStorage.setItem('CLASS_NUMBER', classNumber);

    setSchoolName(SCHUL_NM);
    setModalOpen(false);
    setInputValue('');
    setGrade('');
    setClassNumber('');
    setSchoolList([]);
    router.reload();
  };

  const handleClose = () => {
    setModalOpen(false);
    setInputValue('');
    setSchoolList([]);
    setGrade('');
    setClassNumber('');
  };

  return (
    <>
      <Head>
        <title>오우학</title>
        <meta name="description" content="니인살" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="w-full text-center mt-14">
        <span className="text-4xl font-bold">
          오늘 우리{' '}
          <button className="bg-gray-700 px-2 rounded-lg" onClick={() => setModalOpen(true)}>
            {schoolName}
          </button>
          는
        </span>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-10">
        <div className="col-span-4">
          <Weather />
        </div>

        <div className="col-span-1">
          <Meal />
        </div>

        <div className="col-span-1">
          <Timetable />
        </div>

        <div className="col-span-1">
          <Schedule />
        </div>

        <div className="col-span-1">
          <Community />
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-60">
          <div className="bg-[#202026] p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">기본 정보 입력</h2>
            <div className="gird grid-cols-2 gap-4 mb-2">
              <input
                type="number"
                value={grade}
                onChange={e => setGrade(e.target.value)}
                className="border border-gray-600 bg-gray-700 rounded-lg px-2 py-2 mr-1"
                placeholder="학년을 입력하세요"
              />

              <input
                type="number"
                value={classNumber}
                onChange={e => setClassNumber(e.target.value)}
                className="border border-gray-600 bg-gray-700 rounded-lg px-2 py-2 ml-1"
                placeholder="반을 입력하세요"
              />
            </div>

            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              className="border border-gray-600 bg-gray-700 rounded-lg w-full px-2 py-2 mb-4"
              placeholder="학교 이름을 입력하세요"
            />
            {schoolList.length > 0 ? (
              <ul className="mb-4">
                {schoolList.map(school => (
                  <li
                    key={school.SD_SCHUL_CODE}
                    className="py-2 px-2 cursor-pointer bg-gray-700 overflow-auto mb-2 hover:bg-[#202026] rounded-lg"
                    onClick={() => handleSchoolSelect(school)}
                  >
                    {school.SCHUL_NM}
                    <br />
                    <span className="text-sm text-gray-400">{school.ORG_RDNMA}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mb-4 text-gray-400 text-center">검색 결과가 없습니다.</p>
            )}

            <div className="flex justify-between">
              <button className="mr-2 bg-red-500 text-white px-4 py-2 rounded-lg" onClick={handleClose}>
                닫기
              </button>
              <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={handleSearch}>
                검색
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
