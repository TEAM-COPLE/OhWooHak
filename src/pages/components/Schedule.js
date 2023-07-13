import React, { useEffect, useState } from 'react';

export default function Schedule() {
  const [scheduleData, setScheduleData] = useState(null);

  useEffect(() => {
    const cachedATPT_OFCDC_SC_CODE = localStorage.getItem('ATPT_OFCDC_SC_CODE');
    const cachedSD_SCHUL_CODE = localStorage.getItem('SD_SCHUL_CODE');

    if (cachedATPT_OFCDC_SC_CODE && cachedSD_SCHUL_CODE) {
      fetchScheduleData(cachedATPT_OFCDC_SC_CODE, cachedSD_SCHUL_CODE);
    }
  }, []);

  const fetchScheduleData = async (atptCode, schulCode) => {
    try {
      const today = new Date();
      const currentYear = today.getFullYear();
      const lastDayOfYear = new Date(currentYear, 11, 31);
      const formattedToday = formatDate(today);
      const formattedLastDayOfYear = formatDate(lastDayOfYear);

      const response = await fetch(
        `https://open.neis.go.kr/hub/SchoolSchedule?KEY=${process.env.NEXT_PUBLIC_API_KEY}&Type=json&ATPT_OFCDC_SC_CODE=${atptCode}&SD_SCHUL_CODE=${schulCode}&AA_FROM_YMD=${formattedToday}&AA_TO_YMD=${formattedLastDayOfYear}`,
      );
      const data = await response.json();
      setScheduleData(data.SchoolSchedule);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const formatDate = date => {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}${month}${day}`;
  };

  const formatLocalizedDate = dateString => {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);

    const date = new Date(year, month - 1, day);
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    return date.toLocaleDateString('ko-KR', options);
  };

  return (
    <>
      <div className="bg-[#202026] overflow-auto h-[450px] rounded-lg text-2xl">
        <div className="px-5 py-6">
          <div className="flex flex-col items-center text-center">
            <span className="text-2xl font-bold">오늘의 일정</span>

            {scheduleData && scheduleData[1]?.row ? (
              scheduleData[1].row.map((item, index) => (
                <div className="mt-5 w-full" key={index}>
                  <div className="flex flex-col items-center text-center bg-gray-700 rounded-lg px-2 pb-2">
                    <span className="text-base text-gray-300 font-bold block mt-2">
                      {formatLocalizedDate(item?.AA_YMD)}
                    </span>
                    <span className="text-xl font-bold block mt-2">{item?.EVENT_NM}</span>
                  </div>
                </div>
              ))
            ) : (
              <span className="text-2xl font-bold block mt-2">정보가 없습니다.</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
