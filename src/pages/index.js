import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Meal from './components/Meal';
import Timetable from './components/Timetable';
import Weather from './components/Weather';
import Schedule from './components/Schedule';
import axios from 'axios';

export default function Home() {
  const [schoolName, setSchoolName] = useState('학교');
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [schoolList, setSchoolList] = useState([]);
  const [grade, setGrade] = useState('');
  const [classNumber, setClassNumber] = useState('');
  const [jsonData, setJsonData] = useState(null);

  var RE = 6371.00877; // 지구 반경(km)
  var GRID = 5.0; // 격자 간격(km)
  var SLAT1 = 30.0; // 투영 위도1(degree)
  var SLAT2 = 60.0; // 투영 위도2(degree)
  var OLON = 126.0; // 기준점 경도(degree)
  var OLAT = 38.0; // 기준점 위도(degree)
  var XO = 43; // 기준점 X좌표(GRID)
  var YO = 136; // 기1준점 Y좌표(GRID)

  useEffect(() => {
    const cachedSchoolName = localStorage.getItem('SCHUL_NM');
    if (cachedSchoolName) {
      setSchoolName(cachedSchoolName);
    }
  }, []);

  useEffect(() => {
    axios.get('data/school.json').then(response => {
      setJsonData(response.data);
    });
  }, []);

  function dfs_xy_conv(code, v1, v2) {
    var DEGRAD = Math.PI / 180.0;
    var RADDEG = 180.0 / Math.PI;

    var re = RE / GRID;
    var slat1 = SLAT1 * DEGRAD;
    var slat2 = SLAT2 * DEGRAD;
    var olon = OLON * DEGRAD;
    var olat = OLAT * DEGRAD;

    var sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
    var sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
    var ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
    ro = (re * sf) / Math.pow(ro, sn);
    var rs = {};
    if (code == 'toXY') {
      rs['lat'] = v1;
      rs['lng'] = v2;
      var ra = Math.tan(Math.PI * 0.25 + v1 * DEGRAD * 0.5);
      ra = (re * sf) / Math.pow(ra, sn);
      var theta = v2 * DEGRAD - olon;
      if (theta > Math.PI) theta -= 2.0 * Math.PI;
      if (theta < -Math.PI) theta += 2.0 * Math.PI;
      theta *= sn;
      rs['x'] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
      rs['y'] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
    } else {
      rs['x'] = v1;
      rs['y'] = v2;
      var xn = v1 - XO;
      var yn = ro - v2 + YO;
      ra = Math.sqrt(xn * xn + yn * yn);
      if (sn < 0.0) -ra;
      var alat = Math.pow((re * sf) / ra, 1.0 / sn);
      alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;

      if (Math.abs(xn) <= 0.0) {
        theta = 0.0;
      } else {
        if (Math.abs(yn) <= 0.0) {
          theta = Math.PI * 0.5;
          if (xn < 0.0) -theta;
        } else theta = Math.atan2(xn, yn);
      }
      var alon = theta / sn + olon;
      rs['lat'] = alat * RADDEG;
      rs['lng'] = alon * RADDEG;
    }
    return rs;
  }

  const handleSearch = async () => {
    if (grade.trim() === '' || classNumber.trim() === '') {
      window.alert('학년과 반을 입력하세요!');
      return;
    }

    if (inputValue.trim() === '') {
      return;
    }

    try {
      const response = await axios.get(
        `https://open.neis.go.kr/hub/schoolInfo?KEY=${
          process.env.NEXT_PUBLIC_NEIS_API_KEY
        }&Type=json&SCHUL_NM=${encodeURIComponent(inputValue)}`,
      );
      const data = response.data;

      setSchoolList(data.schoolInfo[1].row);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleSchoolSelect = school => {
    const { ATPT_OFCDC_SC_CODE, SD_SCHUL_CODE, SCHUL_NM, SCHUL_KND_SC_NM, ATPT_OFCDC_SC_NM } = school;

    const titudeArray = jsonData.records;
    const Otherschool = titudeArray.find(
      school => school.학교명 === SCHUL_NM && school.시도교육청명 === ATPT_OFCDC_SC_NM,
    );

    if (Otherschool) {
      const gridResult = dfs_xy_conv('toXY', Otherschool.위도, Otherschool.경도);
      const { x, y } = gridResult;

      localStorage.setItem('X', x);
      localStorage.setItem('Y', y);
      localStorage.setItem('LNA', Otherschool.소재지지번주소);
    }

    localStorage.setItem('ATPT_OFCDC_SC_CODE', ATPT_OFCDC_SC_CODE);
    localStorage.setItem('SD_SCHUL_CODE', SD_SCHUL_CODE);
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
    window.location.reload();
  };

  const handleClose = () => {
    setModalOpen(false);
    setInputValue('');
    setSchoolList([]);
    setGrade('');
    setClassNumber('');
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        setModalOpen(false);
        setInputValue('');
        setSchoolList([]);
        setGrade('');
        setClassNumber('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <Head>
        <title>오우학</title>
        <meta name="description" content="오늘 우리 학교는" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Head>

      <div className="w-full text-center mt-14">
        <span className="text-4xl font-bold">
          오늘 우리{' '}
          <button className="bg-gray-700 px-2 rounded-lg pb-0.5" onClick={() => setModalOpen(true)}>
            {schoolName}
          </button>
          는
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-10">
        <div className="col-span-3">
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
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-60">
          <div className="bg-[#202026] p-6 rounded-lg overflow-auto h-[280px]">
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
              onKeyPress={handleKeyPress}
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
