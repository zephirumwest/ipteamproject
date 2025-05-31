// src/pages/WeatherInfo.js
import React, { useEffect, useState } from 'react';

const WEATHER_API_KEY = 'YOUR_API_KEY_HERE'; // <-- OpenWeatherMap API 키를 입력하세요

export default function WeatherInfo() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  // 현재 위치 가져오기
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (err) => {
        setError('위치 정보를 가져올 수 없습니다.');
      }
    );
  }, []);

  // 날씨 API 호출
  useEffect(() => {
    if (!location) return;

    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${WEATHER_API_KEY}&units=metric&lang=kr`
        );
        const data = await response.json();
        setWeather(data);
      } catch (e) {
        setError('날씨 정보를 가져오는 중 오류 발생');
      }
    };

    fetchWeather();
  }, [location]);

  const renderMessage = (temp) => {
    if (temp >= 30) return '🔥 매우 더우니 실내에서 휴식을 취하세요!';
    if (temp >= 20) return '🌤️ 적당한 날씨입니다. 외출 가능해요!';
    if (temp >= 10) return '🧥 쌀쌀하니 겉옷 챙기세요!';
    return '❄️ 매우 추우니 외출을 자제하세요!';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-6">
      <div className="bg-white shadow-md p-10 rounded-xl w-full max-w-lg text-center">
        <h2 className="text-2xl font-bold mb-4">현재 날씨 정보</h2>

        {error && <p className="text-red-600">{error}</p>}

        {!location && !error && <p>위치 정보를 불러오는 중...</p>}

        {weather && (
          <>
            <p className="text-lg">🌍 {weather.name}</p>
            <p className="text-xl mt-2">🌡️ 기온: {weather.main.temp}°C</p>
            <p className="text-lg">☁️ 상태: {weather.weather[0].description}</p>
            <p className="text-lg mt-4 font-semibold">{renderMessage(weather.main.temp)}</p>
          </>
        )}
      </div>
    </div>
  );
}
