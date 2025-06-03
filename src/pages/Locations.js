import React, { useEffect, useState, useRef } from 'react';
import './Locations.css'; // CSS 파일 import

export default function Locations() {
  /*
  const mapRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  // 현재 위치 요청
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (err) => {
        setError('위치 정보를 가져올 수 없습니다.');
      }
    );
  }, []);

  // VWorld 지도 띄우기
  useEffect(() => {
    if (location && window.vworld) {
      const map = new window.vworld.Map("vworldMap", {
        basemapType: "GRAPHIC",
        controlDensity: "FULL",
        interactionDensity: "FULL",
        zoom: 12,
        center: [location.lon, location.lat],
      });

      new window.vworld.Marker(map, {
        lonlat: [location.lon, location.lat],
        title: "현재 위치",
        label: "📍 내 위치",
      });
    }
  }, [location])

  현재 vworld api까지 연동을 한 상태이고, 필요한 정보를 받아서 화면에 출력을 해야 하는 상황입니다. 
  일단 여기까지 작업 하고 커밋 해둔 다음 밤에 다시 작업할게요. 
  아니면 다른 분이 받아서 이어 하셔도 됩니다. 
  */

  return (
    <div className="locations-container">
      <h2 className="locations-title">주변 위치 찾기</h2>
      <p className="locations-description">현재 위치를 기반으로 무더위 쉼터, 병원, 약국 정보를 함께 제공합니다.</p>
      
      
    </div>
  );
  /*
      error && <p className="locations-error">{error}</p>}
      <div
        id="vworldMap"
        ref={mapRef}
        style={{ width: '100%', height: '500px', border: '1px solid #ccc' }}
      />
  */
}