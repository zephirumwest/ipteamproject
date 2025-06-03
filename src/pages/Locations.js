import React, { useEffect, useState, useRef } from 'react';
import './Locations.css';

export default function Locations() {
  const mapRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  // Kakao 지도 스크립트 동적 로드
  const loadKakaoMapScript = () => {
    return new Promise((resolve, reject) => {
      if (window.kakao && window.kakao.maps) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=f6a81998a7fea968e64246945af4ffe3&autoload=false`;
      script.async = true;
      script.onload = () => {
        window.kakao.maps.load(() => {
          resolve();
        });
      };
      script.onerror = () => reject(new Error("카카오 스크립트 로드 실패"));
      document.head.appendChild(script);
    });
  };

  // 위치 가져오기
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log("✅ 위치 정보 수신:", pos);
        setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (err) => {
        setError("위치 정보를 불러올 수 없습니다.");
        console.error(err.message);
      }
    );
  }, []);

  // 지도 띄우기
  useEffect(() => {
    if (!location) return;

    loadKakaoMapScript()
      .then(() => {
        const container = mapRef.current;
        const options = {
          center: new window.kakao.maps.LatLng(location.lat, location.lon),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);

        const markerPosition = new window.kakao.maps.LatLng(location.lat, location.lon);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
      })
      .catch((err) => {
        console.error(err.message);
        setError("지도를 불러오는 데 실패했습니다.");
      });
  }, [location]);

  /*
  이제 지도 활성화까진 했으니, 공공 데이터에서 무더위 쉼터, 병원, 약국 정보를 받아와서 지도에 표시하면 됩니다. 
  */

  return (
    <div className="locations-container">
      <h2 className="locations-title">주변 위치 찾기</h2>
      <p className="locations-description">
        현재 위치를 기반으로 무더위 쉼터, 병원, 약국 정보를 함께 제공합니다.
      </p>
      {error && <p className="locations-error">{error}</p>}
      <div
        id="kakaoMap"
        ref={mapRef}
        style={{ width: '100%', height: '500px', border: '1px solid #ccc' }}
      ></div>
    </div>
  );
}
