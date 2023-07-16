import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { WiCloud, WiDaySunny, WiCloudy, WiShowers, WiSnow, WiRaindrops, WiRainMix } from 'react-icons/wi';

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [LNA, setLNA] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const cachedX = localStorage.getItem('X');
        const cachedY = localStorage.getItem('Y');
        const cachedLNA = localStorage.getItem('LNA');

        if (cachedLNA) {
          setLNA(cachedLNA);
        }

        const currentDate = new Date();

        const baseTime = currentDate.getHours() < 11 ? '0200' : '1100';
        const baseDate = currentDate.toISOString().slice(0, 10).replace(/-/g, '');

        const apiDate = new Date(currentDate.setDate(currentDate.getDate() - 1))
          .toISOString()
          .slice(0, 10)
          .replace(/-/g, '');

        const response = await axios.get(
          `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?ServiceKey=${process.env.NEXT_PUBLIC_DATA_API_KEY}&numOfRows=1000&pageNo=1&dataType=JSON&base_date=${apiDate}&base_time=1100&nx=${cachedX}&ny=${cachedY}`,
        );

        const data = response.data;

        const filteredData = data.response.body.items.item.filter(
          item => item.fcstDate === baseDate && item.fcstTime === baseTime,
        );

        setWeatherData(filteredData);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    getWeather();
  }, []);

  const getWeatherIcon = (skyCode, ptyCode) => {
    if (ptyCode === '0') {
      switch (skyCode) {
        case '1':
          return <WiDaySunny className="text-9xl" />;
        case '3':
          return <WiCloudy className="text-9xl" />;
        case '4':
          return <WiCloud className="text-9xl" />;
        default:
          return <WiCloud className="text-9xl" />;
      }
    } else {
      switch (ptyCode) {
        case '1':
          return <WiShowers className="text-9xl" />;
        case '2':
          return <WiRainMix className="text-9xl" />;
        case '3':
          return <WiSnow className="text-9xl" />;
        case '5':
          return <WiRaindrops className="text-9xl" />;
        case '6':
          return <WiRainMix className="text-9xl" />;
        default:
          return <WiCloud className="text-9xl" />;
      }
    }
  };

  const getWeatherDescription = (skyCode, ptyCode) => {
    if (ptyCode === '0') {
      switch (skyCode) {
        case '1':
          return '맑음';
        case '3':
          return '구름 많음';
        case '4':
          return '흐림';
        default:
          return '구름 많음';
      }
    } else {
      switch (ptyCode) {
        case '1':
          return '비';
        case '2':
          return '비와 눈';
        case '3':
          return '눈';
        case '5':
          return '빗방울';
        case '6':
          return '빗방울눈날림';
        default:
          return '구름 많음';
      }
    }
  };

  const getShortenedLNA = () => {
    if (LNA) {
      const words = LNA.split(' ');
      if (words.length >= 3) {
        return words.slice(0, 3).join(' ');
      }
    }
    return LNA;
  };

  return (
    <>
      <div className="bg-[#202026] h-full rounded-lg text-2xl">
        <div className="flex justify-center items-center px-5 py-6">
          <div className="flex flex-col items-center">
            {weatherData && (
              <>
                {getWeatherIcon(
                  weatherData.find(item => item.category === 'SKY')?.fcstValue,
                  weatherData.find(item => item.category === 'PTY')?.fcstValue,
                )}
              </>
            )}
          </div>

          <div className="ml-10">
            {weatherData && (
              <>
                <span className="text-2xl font-bold mt-2">
                  {weatherData.find(item => item.category === 'TMP')?.fcstValue}도
                </span>
                <span className="text-xl font-bold block mt-2">{getShortenedLNA()}</span>

                <span className="text-xl text-gray-400 font-bold block mt-2">
                  {getWeatherDescription(
                    weatherData.find(item => item.category === 'SKY')?.fcstValue,
                    weatherData.find(item => item.category === 'PTY')?.fcstValue,
                  )}
                </span>
              </>
            )}
          </div>

          <div className="ml-10">
            {weatherData && (
              <>
                <span className="text-xl font-bold block mt-2">습도</span>
                <span className="text-lg text-gray-400 font-bold block mt-2">
                  {weatherData.find(item => item.category === 'REH')?.fcstValue}%
                </span>
              </>
            )}
          </div>
          <div className="ml-10">
            {weatherData && (
              <>
                <span className="text-xl font-bold block mt-2">바람</span>
                <span className="text-lg text-gray-400 font-bold block mt-2">
                  {weatherData.find(item => item.category === 'WSD')?.fcstValue}m/s
                </span>
              </>
            )}
          </div>
          <div className="ml-10">
            {weatherData && (
              <>
                <span className="text-xl font-bold block mt-2">강수확률</span>
                <span className="text-lg text-gray-400 font-bold block mt-2">
                  {weatherData.find(item => item.category === 'POP')?.fcstValue}%
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
