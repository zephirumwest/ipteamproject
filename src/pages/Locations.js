import React from 'react';
import './Locations.css'; // CSS 파일 import

export default function Locations() {
  return (
    <div className="locations-container">
      <h2 className="locations-title">주변 위치 찾기</h2>
      <p className="locations-description">현재 위치를 기반으로 무더위 쉼터, 병원, 약국 정보를 함께 제공합니다.</p>
      <p className="locations-construction-notice">🚧 이 페이지는 지도 API와 데이터 연동 중입니다.</p>
      {/* 추후 여기 VWorld 지도, 무더위쉼터, 약국, 병원 표시 */}
    </div>
  );
}