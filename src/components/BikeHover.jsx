import React, { useState } from "react";

const BikeHover = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedBike, setSelectedBike] = useState(null);

  const bikes = [
    {
      id: 1,
      name: "R 15 V4",
      price: "",
      category: "Sport",
      color: "from-orange-500 to-red-600"
    },
    {
      id: 2,
      name: "MT-15",
      price: "",
      category: "Cruiser",
      color: "from-blue-500 to-purple-600"
    }
  ];

  const handleToggleHover = () => {
    setIsHovered((prev) => !prev);
  };

  return (
    <div className="px-2 sm:px-4 lg:px-8 pt-4 sm:pt-10 pb-6 sm:pb-16">
      <div className="mx-auto w-full sm:max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent mb-2">
            Premium Collection
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">Hover to explore our exclusive bikes</p>
        </div>

        <div
          className="relative w-full aspect-[16/9] rounded-2xl shadow-2xl overflow-hidden cursor-pointer group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setSelectedBike(null);
          }}
          onClick={handleToggleHover}
        >
          {/* Background Image */}
          <img 
            src="https://i.ytimg.com/vi/-QWgUZrQAIo/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBr5csBS-E5b4KKm8rxxDKkLGHYWA" 
            alt="Showroom" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent transition-opacity duration-300" />

          {/* Animated Corner Accents */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-orange-500 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-orange-500 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />

          {/* Center Content - Show when not hovered */}
          {!isHovered && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white animate-fadeIn">
              <div className="text-center space-y-4 p-4">
                <div className="w-16 h-16 mx-auto bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30 animate-pulse">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold">Discover Our Collection</h3>
                <p className="text-sm sm:text-base text-gray-300">Hover or tap to view models</p>
              </div>
            </div>
          )}

          {/* Premium Bike Cards - Show on hover */}
          {isHovered && (
            <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 animate-slideUp">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-4xl">
                {bikes.map((bike, index) => (
                  <div
                    key={bike.id}
                    className={`relative group/card bg-black/60 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer ${
                      selectedBike === bike.id ? 'ring-4 ring-orange-500/50' : ''
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBike(bike.id);
                    }}
                  >
                    {/* Gradient Accent */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${bike.color} rounded-t-2xl`} />
                    
                    {/* Category Badge */}
                    <div className="absolute -top-3 right-6">
                      <span className={`px-4 py-1 text-xs font-bold text-white bg-gradient-to-r ${bike.color} rounded-full shadow-lg`}>
                        {bike.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      {/* Bike Icon */}
                      <div className="flex items-center justify-center mb-2">
                        <div className={`w-12 h-12 bg-gradient-to-br ${bike.color} rounded-xl flex items-center justify-center shadow-lg group-hover/card:scale-110 transition-transform`}>
                          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                      </div>

                      {/* Bike Name */}
                      <h3 className="text-xl sm:text-2xl font-bold text-white text-center tracking-wide">
                        {bike.name}
                      </h3>

                      {/* Divider */}
                      <div className="flex items-center justify-center">
                        <div className={`h-0.5 w-16 bg-gradient-to-r ${bike.color}`} />
                      </div>

                      {/* Price */}
                      <div className="text-center">
                        <div className="text-3xl sm:text-4xl font-black text-white mb-1">
                          {bike.price}
                        </div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">
                          Starting Price
                        </div>
                      </div>

                      {/* Action Button */}
                      <button className={`w-full py-3 bg-gradient-to-r ${bike.color} text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0`}>
                        View Details
                      </button>

                      {/* Features */}
                      <div className="flex items-center justify-around pt-2 border-t border-white/10">
                        <div className="text-center">
                          <div className="text-white font-bold text-sm">250hp</div>
                          <div className="text-gray-400 text-xs">Power</div>
                        </div>
                        <div className="h-8 w-px bg-white/20" />
                        <div className="text-center">
                          <div className="text-white font-bold text-sm">180mph</div>
                          <div className="text-gray-400 text-xs">Top Speed</div>
                        </div>
                        <div className="h-8 w-px bg-white/20" />
                        <div className="text-center">
                          <div className="text-white font-bold text-sm">3.2s</div>
                          <div className="text-gray-400 text-xs">0-60mph</div>
                        </div>
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${bike.color} opacity-0 group-hover/card:opacity-10 rounded-2xl transition-opacity duration-300 pointer-events-none`} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Info Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6">
            <div className="flex items-center justify-between text-white text-xs sm:text-sm">
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Available Now</span>
              </span>
              <span className="hidden sm:block">Premium Collection 2025</span>
              <span className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>4.9 Rating</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default BikeHover;