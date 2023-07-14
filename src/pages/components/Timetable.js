import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';

export default function Timetable() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timetableData, setTimetableData] = useState([]);
  const [ATPT_OFCDC_SC_CODE, setATPT_OFCDC_SC_CODE] = useState('');
  const [SD_SCHUL_CODE, setSD_SCHUL_CODE] = useState('');
  const [grade, setGrade] = useState('');
  const [classNumber, setClassNumber] = useState('');
  const [SCHUL_KND_SC_NM, setSCHUL_KND_SC_NM] = useState('');

  useEffect(() => {
    const cachedATPT_OFCDC_SC_CODE = localStorage.getItem('ATPT_OFCDC_SC_CODE');
    const cachedSD_SCHUL_CODE = localStorage.getItem('SD_SCHUL_CODE');
    const cachedGrade = localStorage.getItem('GRADE');
    const cachedClassNumber = localStorage.getItem('CLASS_NUMBER');
    const cachedSCHUL_KND_SC_NM = localStorage.getItem('SCHUL_KND_SC_NM');

    if (cachedATPT_OFCDC_SC_CODE && cachedSD_SCHUL_CODE) {
      setATPT_OFCDC_SC_CODE(cachedATPT_OFCDC_SC_CODE);
      setSD_SCHUL_CODE(cachedSD_SCHUL_CODE);
      setGrade(cachedGrade);
      setClassNumber(cachedClassNumber);
      setSCHUL_KND_SC_NM(cachedSCHUL_KND_SC_NM);
    }
  }, []);

  useEffect(() => {
    if (ATPT_OFCDC_SC_CODE && SD_SCHUL_CODE) {
      fetchTimetableData(ATPT_OFCDC_SC_CODE, SD_SCHUL_CODE, selectedDate, SCHUL_KND_SC_NM);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ATPT_OFCDC_SC_CODE, SD_SCHUL_CODE, selectedDate, SCHUL_KND_SC_NM]);

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const fetchTimetableData = async (atptCode, schulCode, date, schulKnd) => {
    try {
      const formattedDate = formatDate(date);
      let apiUrl;

      switch (schulKnd) {
        case '초등학교':
          apiUrl = `https://open.neis.go.kr/hub/elsTimetable`;
          break;
        case '중학교':
          apiUrl = `https://open.neis.go.kr/hub/misTimetable`;
          break;
        case '고등학교':
          apiUrl = `https://open.neis.go.kr/hub/hisTimetable`;
          break;
        default:
          console.log('Invalid school type');
          return;
      }

      const response = await fetch(
        `${apiUrl}?KEY=${process.env.NEXT_PUBLIC_API_KEY}&Type=json&ATPT_OFCDC_SC_CODE=${atptCode}&SD_SCHUL_CODE=${schulCode}&ALL_TI_YMD=${formattedDate}&GRADE=${grade}&CLASS_NM=${classNumber}`,
      );
      const data = await response.json();

      let parsedData = [];

      switch (schulKnd) {
        case '초등학교':
          parsedData = parseElementarySchoolData(data);
          break;
        case '중학교':
          parsedData = parseMiddleSchoolData(data);
          break;
        case '고등학교':
          parsedData = parseHighSchoolData(data);
          break;
        default:
          console.log('Invalid school type');
          break;
      }

      setTimetableData(parsedData);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const formatDate = date => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}${month}${day}`;
  };

  const parseElementarySchoolData = data => {
    return data?.elsTimetable[1]?.row || [];
  };

  const parseMiddleSchoolData = data => {
    return data?.misTimetable[1]?.row || [];
  };

  const parseHighSchoolData = data => {
    return data?.hisTimetable[1]?.row || [];
  };

  const removeDuplicatePerio = data => {
    const perioSet = new Set();
    const filteredData = [];

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (!perioSet.has(item.PERIO)) {
        perioSet.add(item.PERIO);
        filteredData.push(item);
      }
    }

    return filteredData;
  };

  return (
    <>
      <div className="bg-[#202026] overflow-auto h-[450px] rounded-lg text-2xl">
        <div className="px-5 py-6">
          <div className="flex flex-col text-center">
            <span className="text-2xl font-bold">오늘의 시간표</span>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              className="bg-gray-700 rounded-lg font-bold text-lg mt-2 px-2 pb-0.5 w-full text-center cursor-pointer"
              popperPlacement="bottom"
              popperModifiers={{
                offset: {
                  enabled: true,
                  offset: '0px, 10px',
                },
                preventOverflow: {
                  enabled: true,
                  escapeWithReference: false,
                  boundariesElement: 'viewport',
                },
              }}
              dateFormat="yyyy년 MM월 dd일"
              locale={ko}
            />

            <div className="mt-8">
              {removeDuplicatePerio(timetableData).length > 0 ? (
                removeDuplicatePerio(timetableData).map((item, index) => (
                  <div
                    key={index}
                    className="flex w-full items-center justify-center border-gray-600 py-2 bg-gray-700 mb-2 px-2 py-2 rounded-lg"
                  >
                    <span className="text-base font-bold">{item.ITRT_CNTNT.replace(/[^a-zA-Z0-9가-힣]/g, '')}</span>
                  </div>
                ))
              ) : (
                <span className="text-2xl font-bold block mt-2">정보가 없습니다.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
