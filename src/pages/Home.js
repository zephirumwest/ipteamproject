import React from 'react';
import Header from '../components/Header';
import MainMenu from '../components/MainMenu';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <Header />
      <main className="flex-grow">
        <MainMenu />
      </main>
      <Footer />
    </div>
  );
}
