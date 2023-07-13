import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';

export default function Timetable() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timetableData, setTimetableData] = useState(null);
  const [ATPT_OFCDC_SC_CODE, setATPT_OFCDC_SC_CODE] = useState('');
  const [SD_SCHUL_CODE, setSD_SCHUL_CODE] = useState('');

  useEffect(() => {
    const cachedATPT_OFCDC_SC_CODE = localStorage.getItem('ATPT_OFCDC_SC_CODE');
    const cachedSD_SCHUL_CODE = localStorage.getItem('SD_SCHUL_CODE');

    if (cachedATPT_OFCDC_SC_CODE && cachedSD_SCHUL_CODE) {
      setATPT_OFCDC_SC_CODE(cachedATPT_OFCDC_SC_CODE);
      setSD_SCHUL_CODE(cachedSD_SCHUL_CODE);
      fetchTimetableData(cachedATPT_OFCDC_SC_CODE, cachedSD_SCHUL_CODE, selectedDate);
    }
  }, [selectedDate]);

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const fetchTimetableData = async (atptCode, schulCode, date) => {
    try {
      const formattedDate = formatDate(date);

      const response = await fetch(
        `https://open.neis.go.kr/hub/hisTimetable?KEY=${process.env.NEXT_PUBLIC_API_KEY}&Type=json&ATPT_OFCDC_SC_CODE=${atptCode}&SD_SCHUL_CODE=${schulCode}&ALL_TI_YMD=${formattedDate}&GRADE=3&CLASS_NM=2`,
      );
      const data = await response.json();
      setTimetableData(data?.hisTimetable[0]?.row || []);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const formatDate = date => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}${month}${day}`;
  };

  return (
    <>
      <div className="bg-[#202026] h-[450px] rounded-lg text-2xl">
        <div className="px-5 py-6">
          <div className="flex flex-col items-center text-center">
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

            <div className="mt-5 overflow-auto h-full">
              {Array.isArray(timetableData) && timetableData.length > 0 ? (
                timetableData.map((item, index) => (
                  <React.Fragment key={index}>
                    <div>
                      <span className="text-2xl font-bold block mt-2 text-gray-400">{item.ITRT_CNTNT}</span>
                      <MdOutlineKeyboardArrowDown className="text-6xl block mt-2 text-gray-600" />
                    </div>
                  </React.Fragment>
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
