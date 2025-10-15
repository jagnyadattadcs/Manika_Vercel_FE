import React, { useState, useMemo } from 'react';
import { Star } from 'lucide-react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Carousal from '../components/Carousal';
import ShowcaseSection from '../components/ShowCaseSection';
import BikeDisplay from '../components/BikeDisplay';


export default function Bikes() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col gap-4">
      <Header />
      <Carousal />
      <BikeDisplay />
      <ShowcaseSection />
      <Footer />
    </div>
  );
}