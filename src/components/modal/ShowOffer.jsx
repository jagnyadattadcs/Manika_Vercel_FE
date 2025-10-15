import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Phone, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom"; 

const ShowOffer = ({ isOpen, onClose, bikeData }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
    }
  }, [isOpen, bikeData]);

  // Helper function to get color value for display
  const getColorValue = (colorName) => {
    const color = colorName.toLowerCase();
    if (color.includes("black") || color.includes("dark")) return "#000000";
    if (color.includes("white") || color.includes("pearl")) return "#ffffff";
    if (color.includes("red") || color.includes("racing red")) return "#dc2626";
    if (color.includes("blue")) return "#2563eb";
    if (color.includes("green")) return "#16a34a";
    if (color.includes("yellow")) return "#eab308";
    if (color.includes("orange")) return "#ea580c";
    if (
      color.includes("silver") ||
      color.includes("grey") ||
      color.includes("gray")
    )
      return "#6b7280";
    if (color.includes("gold")) return "#f59e0b";
    if (color.includes("purple")) return "#9333ea";
    return "#6b7280"; // default gray
  };

  // fall back data
  const defaultBikeData = {
    name: "NA",
    images: [
      "/api/placeholder/400/300",
      "/api/placeholder/400/300",
      "/api/placeholder/400/300",
    ],
    finalPrice: "₹1,20,000",
    priceRange: "₹1,35,000",
    discount: "₹15,000 OFF",
    emiStartingFrom: "₹3,200/month",
    specs: {
      mileage: "45-50 km/l",
      engine: "149cc",
      maxPower: "12.4 BHP",
      maxTorque: "13.6 Nm",
      fuelTank: "13L",
    },
    availableColors: ["Matte Black", "Pearl White", "Racing Red"],
    emiOptions: [
      { duration: "12 months", amount: "₹10,500/month" },
      { duration: "24 months", amount: "₹5,800/month" },
      { duration: "36 months", amount: "₹3,200/month" },
    ],
    specialOffers: [
      "Zero down payment available",
      "Exchange bonus up to ₹10,000",
      "Extended warranty for 2 years",
      "Free service for 6 months",
    ],
  };

  const bike = bikeData || defaultBikeData;

  const nextImage = () => {
    if (bike.images && bike.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % bike.images.length);
    }
  };

  const prevImage = () => {
    if (bike.images && bike.images.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + bike.images.length) % bike.images.length
      );
    }
  };

  // Handle interested button click
  const handleInterestedClick = () => {
    // Create a detailed message with bike information
    const bikeDetails = `Hi, I'm interested in the following bike:

Bike: ${bike.name}
Price: ${bike.finalPrice || bike.price}
${
  (bike.priceRange || bike.originalPrice) &&
  bike.priceRange !== bike.finalPrice &&
  bike.originalPrice !== bike.price
    ? `Original Price: ${bike.priceRange || bike.originalPrice}`
    : ""
}
${bike.discount ? `Discount: ${bike.discount}` : ""}
EMI: ${bike.emiStartingFrom || bike.emi}

Specifications:
- Engine: ${bike.specs?.engine || bike.engine}
- Mileage: ${bike.specs?.mileage || bike.range}
- Max Power: ${bike.specs?.maxPower || bike.maxPower}
- Max Torque: ${bike.specs?.maxTorque || bike.maxTorque}
- Fuel Capacity: ${bike.specs?.fuelTank || bike.fuelCapacity}

${
  bike.availableColors && bike.availableColors.length > 0
    ? `Available Colors: ${bike.availableColors.join(", ")}`
    : ""
}

${
  (bike.specialOffers || bike.offers) &&
  (bike.specialOffers || bike.offers).length > 0
    ? `Special Offers:
${(bike.specialOffers || bike.offers).map((offer) => `- ${offer}`).join("\n")}`
    : ""
}

Please provide more information about availability, test drive options, and any additional offers.`;

    // Close the modal first
    onClose();

    // Navigate to contact page with pre-filled message
    navigate("/contact", {
      state: {
        prefilledMessage: bikeDetails,
        bikeName: bike.name,
      },
    });
  };

  // Handle contact us button click
  const handleContactClick = () => {
    // Close the modal first
    onClose();

    // Navigate to contact page with bike name for reference
    navigate("/contact", {
      state: {
        bikeName: bike.name,
      },
    });
  };

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-6xl w-full h-[95vh] sm:h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 truncate pr-4">
            {bike.name}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Main Content - Mobile: column (image top, info bottom), Desktop: row */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
          {/* Image Section - Shows first on mobile, right side on desktop */}
          <div className="w-full lg:w-1/2 bg-gray-100 relative h-[250px] lg:h-auto lg:order-2 flex flex-col">
            {/* Main Image Display */}
            <div className="flex-1 flex items-center justify-center relative p-4">
              {bike.images && bike.images.length > 0 ? (
                <img
                  src={bike.images[currentImageIndex]}
                  alt={`${bike.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full max-w-full max-h-full object-contain rounded-lg"
                  style={{ maxHeight: "400px", maxWidth: "100%" }}
                  onError={(e) => {
                    e.target.src = "/api/placeholder/400/300";
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">No images available</p>
                </div>
              )}

              {/* Image Navigation */}
              {bike.images && bike.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight size={18} className="sm:w-5 sm:h-5" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {bike.images && bike.images.length > 1 && (
                <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded-full text-xs">
                  {currentImageIndex + 1} / {bike.images.length}
                </div>
              )}
            </div>

            {/* Dot Indicators (hidden when thumbnails are shown) */}
            {bike.images &&
              bike.images.length > 1 &&
              bike.images.length <= 5 && (
                <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 lg:hidden">
                  {bike.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                        index === currentImageIndex
                          ? "bg-orange-500"
                          : "bg-white bg-opacity-50"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
          </div>

          {/* Details & Offers Section - Shows second on mobile, left side on desktop */}
          <div className="w-full lg:w-1/2 p-4 sm:p-6 overflow-y-auto flex-1 lg:order-1">
            {/* Pricing Section */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="text-2xl sm:text-3xl font-bold text-green-600">
                  {bike.finalPrice || bike.price}
                </span>
                {(bike.priceRange || bike.originalPrice) &&
                  bike.priceRange !== bike.finalPrice &&
                  bike.originalPrice !== bike.price && (
                    <span className="text-base sm:text-lg text-gray-500 line-through">
                      {bike.priceRange || bike.originalPrice}
                    </span>
                  )}
              </div>

              {/* Available Colors Display */}
              {bike.availableColors && bike.availableColors.length > 0 && (
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className="text-sm font-medium text-gray-700">
                    Colors:
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    {bike.availableColors.map((color, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1"
                        title={color}
                      >
                        <div
                          className="w-5 h-5 rounded-full border-2 border-gray-300 shadow-sm"
                          style={{
                            backgroundColor: getColorValue(color),
                          }}
                        />
                        <span className="text-xs text-gray-600 hidden sm:inline">
                          {color}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {bike.discount && (
                <div className="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                  {bike.discount}
                </div>
              )}
              <p className="text-gray-600 text-sm sm:text-base">
                EMI starting from{" "}
                <span className="font-semibold text-orange-600">
                  {bike.emiStartingFrom || bike.emi}
                </span>
              </p>
            </div>

            {/* Key Specs */}
            <div className="mb-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3 text-gray-800">
                Key Specifications
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs sm:text-sm text-gray-600">Engine</p>
                  <p className="font-semibold text-sm sm:text-base">
                    {bike.specs?.engine || bike.engine}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs sm:text-sm text-gray-600">Mileage</p>
                  <p className="font-semibold text-sm sm:text-base">
                    {bike.specs?.mileage || bike.range}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs sm:text-sm text-gray-600">Max Power</p>
                  <p className="font-semibold text-sm sm:text-base">
                    {bike.specs?.maxPower || bike.maxPower}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs sm:text-sm text-gray-600">Fuel Tank</p>
                  <p className="font-semibold text-sm sm:text-base">
                    {bike.specs?.fuelTank || bike.fuelCapacity}
                  </p>
                </div>
              </div>
            </div>

            {/* Special Offers */}
            <div className="mb-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3 text-gray-800">
                Special Offers
              </h3>
              <div className="space-y-2">
                {(bike.specialOffers || bike.offers) &&
                (bike.specialOffers || bike.offers).length > 0 ? (
                  (bike.specialOffers || bike.offers).map((offer, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 bg-orange-50 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></div>
                      <p className="text-xs sm:text-sm text-gray-700">
                        {offer}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs sm:text-sm text-gray-500">
                    No special offers available
                  </p>
                )}
              </div>
            </div>

            {/* EMI Options */}
            <div className="mb-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3 text-gray-800">
                EMI Options
              </h3>
              <div className="space-y-2">
                {bike.emiOptions && bike.emiOptions.length > 0 ? (
                  bike.emiOptions.map((option, index) => (
                    <div
                      key={index}
                      className={`flex justify-between p-3 rounded-lg ${
                        option.duration?.toLowerCase().includes("popular") ||
                        option.duration?.includes("36")
                          ? "bg-orange-50 border border-orange-200"
                          : "bg-gray-50"
                      }`}
                    >
                      <span
                        className={`text-xs sm:text-sm ${
                          option.duration?.toLowerCase().includes("popular") ||
                          option.duration?.includes("36")
                            ? "text-orange-700"
                            : ""
                        }`}
                      >
                        {option.duration}
                      </span>
                      <span
                        className={`font-semibold text-sm sm:text-base ${
                          option.duration?.toLowerCase().includes("popular") ||
                          option.duration?.includes("36")
                            ? "text-orange-700"
                            : ""
                        }`}
                      >
                        {option.amount}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs sm:text-sm text-gray-500">
                    No EMI options available
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Buttons - Fixed positioning */}
        <div className="flex gap-4 p-4 sm:p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
          <button
            onClick={handleContactClick}
            className="flex-1 bg-white border-2 border-orange-500 text-orange-500 py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold hover:bg-orange-50 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Phone size={16} className="sm:w-[18px] sm:h-[18px]" />
            Contact Us
          </button>
          <button
            onClick={handleInterestedClick}
            className="flex-1 bg-orange-500 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Heart size={16} className="sm:w-[18px] sm:h-[18px]" />
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowOffer;
