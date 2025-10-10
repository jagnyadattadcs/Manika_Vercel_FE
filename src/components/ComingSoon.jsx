import React, { useState, useEffect } from "react";
import { Bike } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import EmailForm from "./EmailForm.jsx";
import Loader from "./Loader.jsx";

const ComingSoon = () => {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Simulate initial loading for a brief, polished entrance
    const t = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen relative bg-black overflow-hidden">
      {/* Loader overlay */}
      {loading && <Loader />}

      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="https://cdn.pixabay.com/video/2022/11/23/140151-865442951_large.mp4"
          title="Background Video"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/70 via-black/60 to-black/70"></div>

      {/* Sports-styled Background Animation (on top of video, subtle) */}
      <div className="absolute inset-0 z-20 opacity-25">
        {/* soft gradient wash */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#29fe1d]/20 via-transparent to-[#5fff50]/20 animate-pulse"></div>
        {/* floating orbs */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#29fe1d]/10 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#5fff50]/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        {/* dotted grid layer */}
        <div className="absolute inset-0 bg-dots animate-pan"></div>
        {/* diagonal motion stripes */}
        <div className="absolute inset-0 bg-animated-stripes"></div>
        {/* floating sports-like icons (circles like balls) */}
        <div className="absolute top-16 left-10 w-10 h-10 rounded-full border border-[#29fe1d]/40 animate-drift"></div>
        <div
          className="absolute top-32 right-14 w-8 h-8 rounded-full border border-[#5fff50]/40 animate-drift"
          style={{ animationDelay: "400ms" }}
        ></div>
        <div
          className="absolute bottom-28 left-1/4 w-12 h-12 rounded-full border border-[#29fe1d]/30 animate-drift"
          style={{ animationDelay: "800ms" }}
        ></div>
      </div>

      {/* Waves Animation */}
      <div className="absolute bottom-0 left-0 z-20 w-full h-32 opacity-30">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
            fill="url(#waveGradient)"
            className="animate-pulse"
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#29fe1d" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#5fff50" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#29fe1d" stopOpacity="0.6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-30 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <div
          className={`text-center space-y-8 transition-all duration-1000 ${
            mounted && !loading
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {/* Logo/Brand */}
          <div className="flex flex-col items-center justify-center mb-1 space-y-2">
            {/* Top logo image */}
            <img
              src="/Manika.png"
              alt="KTH Sports Logo"
              className="h-16 w-16 md:h-40 md:w-40 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>

          {/* Title row with trophy and text */}
          <div className="flex items-center justify-center space-x-2 group">
            <div className="relative">
              <Bike className="w-9 h-9 md:w-10 md:h-10 text-[#29fe1d] transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 rounded-full blur-xl bg-[#29fe1d]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <h1 className="text-1xl md:text-2xl lg:text-3xl font-extrabold tracking-wider bg-gradient-to-r from-white via-[#5fff50] to-[#29fe1d] bg-clip-text text-transparent">
              Manika Automobiles
            </h1>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h2 className="text-0xl md:text-1xl lg:text-2xl font-light text-white">
              We're Coming Soon
            </h2>
            <p className="text-lg md:text-xl text-[#5fff50]/80 font-light tracking-wide">
              Stay tuned for something Amazing
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="my-12">
            <CountdownTimer />
          </div>

          {/* Email Subscription */}
          {/* <div className="max-w-md mx-auto">
            <EmailForm />
          </div> */}
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 z-20 w-full h-32 bg-gradient-to-t from-black/70 to-transparent"></div>
    </div>
  );
};

export default ComingSoon;
