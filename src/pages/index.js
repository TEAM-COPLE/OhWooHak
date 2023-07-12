import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Meal from './components/Meal';
import Timetable from './components/Timetable';
import Weather from './components/Weather';
import Schedule from './components/Schedule';
import Community from './components/Community';

export default function Home() {
  const [schoolName, setSchoolName] = useState('');
  const [schoolData, setSchoolData] = useState(null);

  useEffect(() => {
    setSchoolName('학교');
  }, []);

  const handleSearch = async () => {
    if (schoolName.trim() === '') {
      return;
    }

    try {
      const response = await fetch(
        `https://open.neis.go.kr/hub/schoolInfo?${process.env.API_KEY}&Type=json&SCHUL_NM=${encodeURIComponent(
          schoolName,
        )}`,
      );
      const data = await response.json();
      setSchoolData(data);

      // Cache the values
      const { ATPT_OFCDC_SC_CODE, SD_SCHUL_CODE } = data.schoolInfo[1].row[0];
      localStorage.setItem('ATPT_OFCDC_SC_CODE', ATPT_OFCDC_SC_CODE);
      localStorage.setItem('SD_SCHUL_CODE', SD_SCHUL_CODE);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleInputChange = event => {
    setSchoolName(event.target.value);
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleSearch();
    }
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
          오늘{' '}
          <input
            type="text"
            alt="school"
            className="bg-[#202026] px-4 rounded-lg text-center"
            placeholder="학교이름을 적어주세요!"
            value={schoolName}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />{' '}
          는?
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
    </>
  );
}
