import React, { useEffect, useState, useRef } from 'react';
import './Locations.css';

const HOSPITAL_API_KEY = 'dE12OR0cQCenf5ZlnjW6rL5b76z5WxfkoRiHND7B7HCPzPyNhdaCNEM64PRTi%2Fsp41YYEB6dMIStnbDpr73wVQ%3D%3D';

export default function Locations() {
  const mapRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

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
        window.kakao.maps.load(resolve);
      };
      script.onerror = () => reject(new Error("카카오 스크립트 로드 실패"));
      document.head.appendChild(script);
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      () => {
        setError("위치 정보를 불러올 수 없습니다.");
      }
    );
  }, []);

  useEffect(() => {
    if (!location) return;

    loadKakaoMapScript()
      .then(() => {
        const container = mapRef.current;
        const center = new window.kakao.maps.LatLng(location.lat, location.lon);
        const map = new window.kakao.maps.Map(container, {
          center,
          level: 4,
        });

        const myMarker = new window.kakao.maps.Marker({ position: center });
        myMarker.setMap(map);
        const myinfowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:5px;font-size:13px;">현위치</div>`,
        });
        myinfowindow.open(map, myMarker);

        const addMarker = (lat, lon, title, tel, icon) => {
          if (!lat || !lon || isNaN(lat) || isNaN(lon)) return;
          const pos = new window.kakao.maps.LatLng(lat, lon);
          const marker = new window.kakao.maps.Marker({ position: pos, title });
          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:5px;font-size:13px;">${icon} ${title}<br>${tel}</div>`,
          });
          marker.setMap(map);
          window.kakao.maps.event.addListener(marker, 'mouseover', () => infowindow.open(map, marker));
          window.kakao.maps.event.addListener(marker, 'mouseout', () => infowindow.close());
        };

        const fetchAndDisplay = async (url, icon) => {
          try {
            const response = await fetch(url);
            const json = await response.json();
            const items = json.response?.body?.items?.item || [];

            items.forEach((item) => {
                addMarker(item.latitude, item.longitude, item.dutyName, item.dutyTel1, icon);
            });
          } catch (e) {
            console.error(`${icon} 데이터 오류:`, e);
          }
        };

        // 병/의원 API (응급의료기관 정보 조회)
        fetchAndDisplay(
          `http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncLcinfoInqire?serviceKey=${HOSPITAL_API_KEY}&WGS84_LON=${location.lon}&WGS84_LAT=${location.lat}&pageNo=1&numOfRows=500&_type=json`,
          '💊'
        );
      })
      .catch((err) => {
        console.error(err.message);
        setError("지도를 불러오는 데 실패했습니다.");
      });
  }, [location]);

  return (
    <div className="locations-container">
      <h2 className="locations-title">주변 위치 찾기</h2>
      <p className="locations-description">
        현재 위치를 기반으로 병/의원(💊) 정보를 제공합니다.
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
