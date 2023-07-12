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
      const response = await fetch(
        `https://open.neis.go.kr/hub/SchoolSchedule?${
          process.env.API_KEY
        }&Type=json&ATPT_OFCDC_SC_CODE=${atptCode}&SD_SCHUL_CODE=${schulCode}&AA_YMD=${new Date()
          .toISOString()
          .slice(0, 10)
          .replace(/-/g, '')}`,
      );
      const data = await response.json();
      setScheduleData(data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <>
      <div className="bg-[#202026] overflow-auto h-[450px] rounded-lg text-2xl">
        <div className="px-5 py-6">
          <div className="flex flex-col items-center text-center">
            <span className="text-2xl font-bold">오늘의 일정</span>

            {scheduleData && scheduleData.SchoolSchedule && scheduleData.SchoolSchedule.row ? (
              scheduleData.SchoolSchedule.row.map((item, index) => (
                <div className="mt-5" key={index}>
                  <div className="flex flex-col items-center text-center bg-gray-700 rounded-lg px-2 pb-2">
                    <span className="text-base text-gray-300 font-bold block mt-2">{item?.AA_YMD}</span>
                    {item?.EVENT_NM?.split('<br/>').map((event, i) => (
                      <span className="text-lg font-bold block mt-2" key={i}>
                        {event.replace(/[^a-z0-9.]/gi, '')}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <span className="text-2xl font-bold block mt-2">일정 정보가 없습니다.</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
