import React from 'react';
import Header from '../components/Header';
import MainMenu from '../components/MainMenu';
import Footer from '../components/Footer';
import './Home.css'; // CSS 파일 import

export default function Home() {
  return (
    <div className="home-container">
      <Header />
      <main className="home-main-content">
        <MainMenu />
      </main>
      <Footer />
    </div>
  );
}