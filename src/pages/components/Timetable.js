import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';

export default function Timetable() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
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
    </>
  );
}
