import React, { useState } from "react";
import Header from "../components/Header";
import bg1 from "../assets/Yamaha2.jpg";
import Footer from "../components/Footer";
import ChooseUs from "../components/ChooseUs";

const AboutUs = () => {
  const [openAccordion, setOpenAccordion] = useState("browse");
  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? "" : section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <Header />
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="relative z-10 text-center">
          {/* <h1 className="text-5xl font-extrabold text-red-600 mb-4 drop-shadow-lg">Welcome to Manika Bike Automobile</h1>
          <p className="text-xl text-gray-700 mb-6">Premium bikes, expert advice, and a passion for riding. Experience the thrill of two wheels!</p> */}
          <div className="flex justify-center">
            <img
              src={bg1}
              alt="Showroom Bikes"
              className="rounded-2xl shadow-2xl w-full max-w-8xl h-[500px] object-cover"
            />
          </div>
        </div>

        {/* Showroom Experience Section */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 py-16 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="inline-block">
                  <div className="bg-red-200 text-red-700 px-6 py-2 rounded-full text-sm font-semibold tracking-wide">
                    Automobile EXPERIENCE
                  </div>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Discover, Select, Ride
                  <br />
                  Your Dream Bike Awaits
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Step into our vibrant bike showroom and explore the latest
                  models, classic favorites, and expert recommendations. Our
                  team is here to guide you every step of the way.
                </p>
                {/* Accordion Items */}
                <div className="space-y-4">
                  {/* Explore Bikes */}
                  <div className="border-b border-gray-300 pb-4">
                    <div
                      className="flex justify-between items-center cursor-pointer py-2"
                      onClick={() => toggleAccordion("browse")}
                    >
                      <h3 className="text-xl font-semibold text-gray-900">
                        Explore Bikes
                      </h3>
                      <svg
                        className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${
                          openAccordion === "browse" ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    {openAccordion === "browse" && (
                      <div className="mt-3 animate-fadeIn">
                        <p className="text-gray-700 leading-relaxed">
                          Browse our collection of sports, cruisers, and
                          commuter bikes. Find the perfect match for your style
                          and needs.
                        </p>
                      </div>
                    )}
                  </div>
                  {/* Get Expert Advice */}
                  <div className="border-b border-gray-300 pb-4">
                    <div
                      className="flex justify-between items-center cursor-pointer py-2"
                      onClick={() => toggleAccordion("confirm")}
                    >
                      <h3 className="text-xl font-semibold text-gray-900">
                        Get Expert Advice
                      </h3>
                      <svg
                        className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${
                          openAccordion === "confirm" ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    {openAccordion === "confirm" && (
                      <div className="mt-3 animate-fadeIn">
                        <p className="text-gray-700 leading-relaxed">
                          Our bike experts help you choose the right bike,
                          explain features, and answer all your questions.
                          Personalized guidance for every rider!
                        </p>
                      </div>
                    )}
                  </div>
                  {/* Ride & Enjoy */}
                  <div className="border-b border-gray-300 pb-4">
                    <div
                      className="flex justify-between items-center cursor-pointer py-2"
                      onClick={() => toggleAccordion("enjoy")}
                    >
                      <h3 className="text-xl font-semibold text-gray-900">
                        Ride & Enjoy
                      </h3>
                      <svg
                        className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${
                          openAccordion === "enjoy" ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    {openAccordion === "enjoy" && (
                      <div className="mt-3 animate-fadeIn">
                        <p className="text-gray-700 leading-relaxed">
                          Take your new bike for a spin! Enjoy the thrill,
                          comfort, and style that only Manika bikes can offer.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Right Image */}
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://www.yamaha-motor-india.com/theme/v4/images/Dealers/blue-square-img.webp?v=5"
                    alt="Premium Bike Display"
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Manika Bikes Section */}
        <div className="bg-gradient-to-b from-gray-50 to-white py-20 px-8 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-30"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Section Header */}
            <div className="text-center mb-20">
              <div className="inline-block mb-6">
                <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-semibold tracking-wide shadow-lg">
                  WHY CHOOSE US
                </div>
              </div>
              <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
                Experience the Best in Bikes
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Your journey to the perfect ride starts here
              </p>
            </div>

            {/* Three Cards */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Select Your Bike */}
              <div className="group">
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="mb-6">
                    <div className="w-full h-56 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center relative overflow-hidden">
                      {/* Motorcycle Illustration */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 300 150"
                        className="w-72 h-36 fill-none stroke-white stroke-[3] transform group-hover:scale-110 transition-transform duration-300"
                      >
                        {/* Wheels */}
                        <circle cx="80" cy="100" r="25" strokeWidth="4" />
                        <circle cx="220" cy="100" r="25" strokeWidth="4" />

                        {/* Body frame */}
                        <path
                          d="M80 100 L130 70 L200 70 L220 100"
                          strokeLinecap="round"
                        />
                        <path
                          d="M130 70 L160 50 L190 50"
                          strokeLinecap="round"
                        />

                        {/* Seat */}
                        <line
                          x1="140"
                          y1="60"
                          x2="180"
                          y2="60"
                          strokeLinecap="round"
                        />

                        {/* Handlebar */}
                        <path
                          d="M190 50 L210 40 L220 45"
                          strokeLinecap="round"
                        />

                        {/* Engine section */}
                        <rect
                          x="130"
                          y="70"
                          width="60"
                          height="25"
                          rx="4"
                          className="fill-white/20 stroke-white"
                        />

                        {/* Headlight */}
                        <circle
                          cx="235"
                          cy="55"
                          r="7"
                          className="fill-white/70"
                        />

                        {/* Exhaust */}
                        <line
                          x1="130"
                          y1="90"
                          x2="110"
                          y2="95"
                          strokeLinecap="round"
                        />
                        <line
                          x1="110"
                          y1="95"
                          x2="95"
                          y2="95"
                          strokeLinecap="round"
                        />
                      </svg>

                      {/* Decorative lights */}
                      <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-full opacity-20"></div>
                      <div className="absolute bottom-4 left-4 w-12 h-12 bg-white rounded-full opacity-20"></div>
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-red-600 font-bold text-xl">1</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Select Your Bike
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Explore a wide range of bikes, from sporty to classic. Find
                    the perfect ride for your journey.
                  </p>
                </div>
              </div>

              {/* Meet Our Experts */}
              <div className="group">
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="mb-6">
                    <div className="w-full h-56 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center relative overflow-hidden">
                      {/* Expert illustration */}
                      <div className="relative transform group-hover:scale-110 transition-transform duration-300">
                        <div className="w-24 h-24 bg-white rounded-full mx-auto relative overflow-hidden">
                          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gray-300 rounded-full"></div>
                        </div>
                        <div className="w-16 h-16 bg-white rounded-full absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                          <div className="w-12 h-12 bg-red-500 rounded-full"></div>
                        </div>
                      </div>
                      {/* Decorative circles */}
                      <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-full opacity-20"></div>
                      <div className="absolute bottom-4 left-4 w-12 h-12 bg-white rounded-full opacity-20"></div>
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-bold text-xl">2</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Meet Our Experts
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Get personalized advice from our passionate bike experts. We
                    help you make the right choice.
                  </p>
                </div>
              </div>

              {/* Enjoy the Ride */}
              <div className="group">
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="mb-6">
                    <div className="w-full h-56 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center relative overflow-hidden">
                      {/* Ride illustration */}
                      <div className="relative transform group-hover:scale-110 transition-transform duration-300">
                        <div className="w-40 h-20 bg-white rounded-lg mx-auto opacity-90 relative">
                          <div className="absolute top-2 right-4 w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="absolute bottom-2 left-6 w-8 h-8 bg-gray-900 rounded-full border-4 border-white"></div>
                        <div className="absolute bottom-2 right-6 w-8 h-8 bg-gray-900 rounded-full border-4 border-white"></div>
                        {/* Motion lines */}
                        <div className="absolute right-16 top-6 w-8 h-1 bg-white opacity-50 rounded"></div>
                        <div className="absolute right-20 top-10 w-6 h-1 bg-white opacity-50 rounded"></div>
                      </div>
                      {/* Decorative circles */}
                      <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-full opacity-20"></div>
                      <div className="absolute bottom-4 left-4 w-12 h-12 bg-white rounded-full opacity-20"></div>
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-green-600 font-bold text-xl">
                        3
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Enjoy the Ride
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Take your bike home and start your adventure. Every ride is
                    a new story with Manika.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-12">
          <ChooseUs />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
