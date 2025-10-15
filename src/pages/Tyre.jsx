import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Carousal from '../components/Carousal';
import ShowcaseSection from '../components/ShowCaseSection';
import TyreDisplay from '../components/TyreDisplay';

export default function Tyre() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col gap-4 relative">
      {/* Tire Track Marks Background Pattern */}
      <div 
        className="fixed inset-0 opacity-15 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='100' viewBox='0 0 200 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3C!-- Left tire track --%3E%3Cpath d='M10 20 Q30 25 50 20 Q70 15 90 20 Q110 25 130 20 Q150 15 170 20 Q190 25 210 20' stroke='%23000000' stroke-width='4' fill='none' opacity='0.8'/%3E%3Cpath d='M15 30 Q35 35 55 30 Q75 25 95 30 Q115 35 135 30 Q155 25 175 30 Q195 35 215 30' stroke='%23000000' stroke-width='3' fill='none' opacity='0.6'/%3E%3C!-- Right tire track --%3E%3Cpath d='M10 60 Q30 65 50 60 Q70 55 90 60 Q110 65 130 60 Q150 55 170 60 Q190 65 210 60' stroke='%23000000' stroke-width='4' fill='none' opacity='0.8'/%3E%3Cpath d='M15 70 Q35 75 55 70 Q75 65 95 70 Q115 75 135 70 Q155 65 175 70 Q195 75 215 70' stroke='%23000000' stroke-width='3' fill='none' opacity='0.6'/%3E%3C!-- Tread marks --%3E%3Crect x='20' y='18' width='2' height='6' opacity='0.7'/%3E%3Crect x='25' y='19' width='2' height='4' opacity='0.6'/%3E%3Crect x='30' y='18' width='2' height='6' opacity='0.7'/%3E%3Crect x='35' y='19' width='2' height='4' opacity='0.6'/%3E%3Crect x='40' y='18' width='2' height='6' opacity='0.7'/%3E%3Crect x='45' y='19' width='2' height='4' opacity='0.6'/%3E%3Crect x='50' y='18' width='2' height='6' opacity='0.7'/%3E%3Crect x='55' y='19' width='2' height='4' opacity='0.6'/%3E%3Crect x='60' y='18' width='2' height='6' opacity='0.7'/%3E%3Crect x='65' y='19' width='2' height='4' opacity='0.6'/%3E%3Crect x='70' y='18' width='2' height='6' opacity='0.7'/%3E%3Crect x='75' y='19' width='2' height='4' opacity='0.6'/%3E%3Crect x='80' y='18' width='2' height='6' opacity='0.7'/%3E%3Crect x='85' y='19' width='2' height='4' opacity='0.6'/%3E%3Crect x='20' y='58' width='2' height='6' opacity='0.7'/%3E%3Crect x='25' y='59' width='2' height='4' opacity='0.6'/%3E%3Crect x='30' y='58' width='2' height='6' opacity='0.7'/%3E%3Crect x='35' y='59' width='2' height='4' opacity='0.6'/%3E%3Crect x='40' y='58' width='2' height='6' opacity='0.7'/%3E%3Crect x='45' y='59' width='2' height='4' opacity='0.6'/%3E%3Crect x='50' y='58' width='2' height='6' opacity='0.7'/%3E%3Crect x='55' y='59' width='2' height='4' opacity='0.6'/%3E%3Crect x='60' y='58' width='2' height='6' opacity='0.7'/%3E%3Crect x='65' y='59' width='2' height='4' opacity='0.6'/%3E%3Crect x='70' y='58' width='2' height='6' opacity='0.7'/%3E%3Crect x='75' y='59' width='2' height='4' opacity='0.6'/%3E%3Crect x='80' y='58' width='2' height='6' opacity='0.7'/%3E%3Crect x='85' y='59' width='2' height='4' opacity='0.6'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '400px 200px',
          backgroundRepeat: 'repeat'
        }}
      />
      
      {/* Additional skid marks at different angles */}
      <div 
        className="fixed inset-0 opacity-10 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='300' height='150' viewBox='0 0 300 150' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23000000' stroke-width='5' opacity='0.7'%3E%3C!-- Curved skid mark --%3E%3Cpath d='M50 50 Q100 30 150 50 Q200 70 250 50' stroke-dasharray='8,4'/%3E%3Cpath d='M50 80 Q100 60 150 80 Q200 100 250 80' stroke-dasharray='6,3'/%3E%3C!-- Acceleration marks --%3E%3Cpath d='M80 100 L85 110 M90 102 L95 112 M100 104 L105 114 M110 106 L115 116 M120 108 L125 118' stroke-width='3' opacity='0.8'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '600px 300px',
          backgroundRepeat: 'repeat',
          transform: 'rotate(-15deg)',
          transformOrigin: 'center'
        }}
      />
      
      {/* Content with relative positioning to appear above background */}
      <div className="relative z-8">
        <Header />
        <Carousal />
        <TyreDisplay />
        <ShowcaseSection />
        <Footer />
      </div>
    </div>
  );
}