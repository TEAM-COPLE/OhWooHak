import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';

export default function Meal() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mealData, setMealData] = useState(null);
  const ATPT_OFCDC_SC_CODE = typeof localStorage !== 'undefined' ? localStorage.getItem('ATPT_OFCDC_SC_CODE') : null;
  const SD_SCHUL_CODE = typeof localStorage !== 'undefined' ? localStorage.getItem('SD_SCHUL_CODE') : null;

  useEffect(() => {
    fetchMealData();
  }, []);

  const handleDateChange = date => {
    setSelectedDate(date);
    fetchMealData(date);
  };

  const fetchMealData = async (date = selectedDate) => {
    try {
      const formattedDate = date.toISOString().split('T')[0].replace(/-/g, '');
      const response = await fetch(
        `https://open.neis.go.kr/hub/mealServiceDietInfo?${process.env.API_KEY}&ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${SD_SCHUL_CODE}&MLSV_YMD=${formattedDate}&Type=json`,
      );
      const data = await response.json();
      setMealData(data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <>
      <div className="bg-[#202026] h-[450px] rounded-lg text-2xl">
        <div className="px-5 py-6">
          <div className="flex flex-col items-center text-center">
            <span className="text-2xl font-bold">오늘의 급식</span>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              className="bg-gray-700 rounded-lg font-bold text-lg mt-2 px-2 w-full text-center"
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
              {mealData ? (
                mealData?.mealServiceDietInfo?.[1]?.row.map((item, index) => (
                  <span className="text-2xl font-bold block mt-2" key={index}>
                    {item?.DDISH_NM.replace(/\(\d+\)/g, '')
                      .replace(/\([^)]+\)/g, '')
                      .split('<br/>')
                      .map((dish, i) => (
                        <React.Fragment key={i}>
                          {dish}
                          <br />
                        </React.Fragment>
                      ))}
                  </span>
                ))
              ) : (
                <span className="text-2xl font-bold block mt-2">급식 정보가 없습니다.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
