import React, { useEffect, useState } from 'react';
import './WeatherInfo.css'; // CSS 파일 import

const WEATHER_API_KEY = '1fbcaab925650378bf46cf43aedf6fc8'; // <-- OpenWeatherMap API 키를 입력하세요

export default function WeatherInfo() {
  // ... (useState, useEffect 로직은 동일)
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
    if (!location || WEATHER_API_KEY === 'YOUR_API_KEY_HERE') {
        if(WEATHER_API_KEY === 'YOUR_API_KEY_HERE' && location) {
            setError('OpenWeatherMap API 키를 입력해주세요.');
        }
        return;
    }


    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${WEATHER_API_KEY}&units=metric&lang=kr`
        );
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || '날씨 정보를 가져오는데 실패했습니다.');
        }
        const data = await response.json();
        setWeather(data);
        setError(null); // 성공 시 에러 메시지 초기화
      } catch (e) {
        setError(e.message || '날씨 정보를 가져오는 중 오류 발생');
        setWeather(null); // 오류 발생 시 날씨 정보 초기화
      }
    };

    fetchWeather();
  }, [location]);

  const renderMessage = (temp) => {
    if (temp === undefined || temp === null) return '날씨 정보를 분석 중입니다...';
    if (temp >= 30) return '🔥 매우 더우니 실내에서 휴식을 취하세요!';
    if (temp >= 20) return '🌤️ 적당한 날씨입니다. 외출 가능해요!';
    if (temp >= 10) return '🧥 쌀쌀하니 겉옷 챙기세요!';
    return '❄️ 매우 추우니 외출을 자제하세요!';
  };


  return (
    <div className="weather-page-container">
      <div className="weather-card">
        <h2 className="weather-card-title">현재 날씨 정보</h2>

        {error && <p className="weather-error-message">{error}</p>}

        {!location && !error && <p className="weather-loading-message">위치 정보를 불러오는 중...</p>}
        {location && !weather && !error && <p className="weather-loading-message">날씨 정보를 불러오는 중...</p>}


        {weather && weather.main && weather.weather && (
          <>
            <p className="weather-location-name">🌍 {weather.name}</p>
            <p className="weather-temperature">🌡️ 기온: {weather.main.temp}°C</p>
            <p className="weather-condition">☁️ 상태: {weather.weather[0].description}</p>
            <p className="weather-advice">{renderMessage(weather.main.temp)}</p>
          </>
        )}
      </div>
    </div>
  );
}