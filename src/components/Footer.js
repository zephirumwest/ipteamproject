import React from 'react';
import './Footer.css'; // CSS 파일 import

export default function Footer() {
  return (
    <footer className="footer-container">
      <p className="footer-copy">© 2024 실버 건강 지원 플랫폼</p>
      <p className="footer-credit">
        아이콘 출처:&nbsp;
        <a
          href="https://www.flaticon.com/kr/free-icon/hospital_4931443"
          title="병원 아이콘"
          target="_blank"
          rel="noopener noreferrer"
        >
          병원 아이콘 제작자: I3oundless - Flaticon
        </a>
      </p>
    </footer>
  );
}