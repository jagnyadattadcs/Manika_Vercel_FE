import React from 'react';
import roadImage from "../assets/curvedroad.png"

const Banner = () => {
  return (
    <div className="w-full max-w-6xl mx-auto my-4 px-4">
      <div className="relative bg-[#0A121E] rounded-xl overflow-hidden">
        {/* Text Content */}
        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row justify-between items-center">
          {/* Left Side - Text */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">Book Your Bike Now</h2>
            <p className="text-gray-300 text-sm max-w-md">
              Enjoy a seamless bike showroom journey — from easy online booking to 
              flexible delivery and pickup at your convenience.
            </p>
          </div>
          
          {/* Right Side - Phone Numbers */}
          <div className="space-y-4">
            {/* Red Phone Button */}
            <div className="flex items-center bg-[#FF3A44] text-white py-2 px-4 rounded-full">
              <div className="bg-[#FF3A44] rounded-full p-2 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <span className="font-bold">+91 9876543210</span>
            </div>
            
            {/* White Bordered Phone Button */}
            <div className="flex items-center bg-transparent border border-white text-white py-2 px-4 rounded-full">
              <span className="font-bold mr-2">+91 9182734567</span>
              <div className="bg-white rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Road Image - Positioned Absolutely */}
        <div className="absolute right-0 top-0 h-full w-1/2 overflow-hidden">
          <img 
            src={roadImage} 
            alt="Curved road" 
            className="h-full w-full object-cover object-left"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
