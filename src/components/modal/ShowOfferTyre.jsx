import React, { useState, useEffect, useCallback, useMemo } from "react";
import { X, ChevronLeft, ChevronRight, Phone, Heart, Star, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ShowOfferTyre = ({ isOpen, onClose, tyreData }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoadErrors, setImageLoadErrors] = useState(new Set());
  const [isImageLoading, setIsImageLoading] = useState(false);
  const navigate = useNavigate();

  // Memoized computations
  const processedTyreData = useMemo(() => {
    if (!tyreData) return null;

    const {
      brand = '',
      model = '',
      images = [],
      price = null,
      originalPrice = null,
      discount = null,
      size = '',
      type = '',
      pattern = '',
      compound = '',
      maxLoad = '',
      maxSpeed = '',
      offers = [],
      features = []
    } = tyreData;

    return {
      brand,
      model,
      images: Array.isArray(images) ? images : [],
      price,
      originalPrice,
      discount,
      size,
      type,
      pattern,
      compound,
      maxLoad,
      maxSpeed,
      offers: Array.isArray(offers) ? offers : [],
      features: Array.isArray(features) ? features : []
    };
  }, [tyreData]);

  const formatPrice = useCallback((price) => {
    if (!price) return "Price not available";
    return typeof price === 'number' ? `₹${price.toLocaleString()}` : price;
  }, []);

  // Optimized image URL processing
  const optimizeImageUrl = useCallback((url, width = 800) => {
    if (!url) return "/api/placeholder/400/300";
    
    let cleanUrl = url;
    
    // Handle relative URLs
    if (url.includes('/images/tyres/')) {
      cleanUrl = url.replace(/.*\/images\/tyres\//, '');
    }
    
    // Ensure HTTPS
    if (!cleanUrl.startsWith('http')) {
      if (cleanUrl.startsWith('//')) {
        cleanUrl = 'https:' + cleanUrl;
      } else if (!cleanUrl.startsWith('/')) {
        cleanUrl = 'https://' + cleanUrl;
      }
    }
    
    // Cloudinary optimization
    if (cleanUrl.includes('cloudinary.com')) {
      const optimizationParams = `f_auto,q_auto,w_${width},c_fit`;
      cleanUrl = cleanUrl.replace('/upload/', `/upload/${optimizationParams}/`);
    }
    
    return cleanUrl;
  }, []);

  // Enhanced image error handling with retry logic
  const handleImageError = useCallback((e, imageUrl, imageIndex) => {
    console.error(`Failed to load tyre image ${imageIndex + 1}:`, imageUrl);
    
    if (imageLoadErrors.has(imageIndex)) {
      e.target.src = "/api/placeholder/400/300";
      return;
    }

    setImageLoadErrors(prev => new Set([...prev, imageIndex]));

    // Try original URL without optimization
    const originalUrl = imageUrl.replace(/\/upload\/[^\/]+\//, '/upload/');
    if (originalUrl !== imageUrl) {
      e.target.src = originalUrl;
      return;
    }

    e.target.src = "/api/placeholder/400/300";
  }, [imageLoadErrors]);

  // Reset state when modal opens/closes or data changes
  useEffect(() => {
    if (isOpen && processedTyreData) {
      setCurrentImageIndex(0);
      setImageLoadErrors(new Set());
    }
  }, [isOpen, processedTyreData]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyPress = (event) => {
      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
          if (processedTyreData?.images.length > 1) {
            setCurrentImageIndex(prev => (prev + 1) % processedTyreData.images.length);
          }
          break;
        case 'ArrowLeft':
          if (processedTyreData?.images.length > 1) {
            setCurrentImageIndex(prev => 
              (prev - 1 + processedTyreData.images.length) % processedTyreData.images.length
            );
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, onClose, processedTyreData?.images.length]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Navigation handlers
  const nextImage = useCallback(() => {
    if (processedTyreData?.images.length > 1) {
      setCurrentImageIndex(prev => (prev + 1) % processedTyreData.images.length);
    }
  }, [processedTyreData?.images.length]);

  const prevImage = useCallback(() => {
    if (processedTyreData?.images.length > 1) {
      setCurrentImageIndex(prev => 
        (prev - 1 + processedTyreData.images.length) % processedTyreData.images.length
      );
    }
  }, [processedTyreData?.images.length]);

  // Action handlers
  const handleInterestedClick = useCallback(() => {
    if (!processedTyreData) return;

    const { brand, model, price, originalPrice, discount, size, type, pattern, 
            maxSpeed, compound, maxLoad, features, offers } = processedTyreData;

    const tyreDetails = `Hi, I'm interested in the following tyre:

Tyre: ${brand} ${model}
${price ? `Price: ${formatPrice(price)}` : ''}
${originalPrice && originalPrice !== price ? `Original Price: ${formatPrice(originalPrice)}` : ''}
${discount ? `Discount: ${discount}` : ''}

Specifications:
${size ? `- Size: ${size}` : ''}
${type ? `- Type: ${type}` : ''}
${pattern ? `- Pattern: ${pattern}` : ''}
${maxSpeed ? `- Max Speed: ${maxSpeed}` : ''}
${compound ? `- Compound: ${compound}` : ''}
${maxLoad ? `- Max Load: ${maxLoad}` : ''}

${features.length > 0 ? `Key Features:
${features.map(feature => `- ${feature}`).join('\n')}` : ''}

${offers.length > 0 ? `Special Offers:
${offers.map(offer => `- ${offer}`).join('\n')}` : ''}

Please provide more information about availability, installation services, and any additional offers.`;

    onClose();
    navigate('/contact', { 
      state: { 
        prefilledMessage: tyreDetails,
        tyreName: `${brand} ${model}`,
        productType: 'tyre'
      } 
    });
  }, [processedTyreData, formatPrice, onClose, navigate]);

  const handleContactClick = useCallback(() => {
    if (!processedTyreData) return;

    onClose();
    navigate('/contact', { 
      state: { 
        tyreName: `${processedTyreData.brand} ${processedTyreData.model}`,
        productType: 'tyre'
      } 
    });
  }, [processedTyreData, onClose, navigate]);

  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  // Feature icons mapping
  const getFeatureIcon = useCallback((index) => {
    const icons = [Shield, Zap, Star];
    const IconComponent = icons[index % icons.length];
    return <IconComponent className="w-3.5 h-3.5 text-orange-600" />;
  }, []);

  if (!isOpen || !processedTyreData) return null;

  const { brand, model, images, price, originalPrice, discount, size, type, 
          pattern, compound, maxLoad, maxSpeed, offers, features } = processedTyreData;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          <h1 
            id="modal-title"
            className="text-lg sm:text-xl font-bold text-gray-800 truncate pr-4"
          >
            {brand} {model}
          </h1>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-orange-500"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </header>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
          {/* Image Section */}
          <section className="w-full lg:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 relative h-[280px] sm:h-[320px] lg:h-auto lg:order-2 flex flex-col">
            <div className="flex-1 flex items-center justify-center relative p-4">
              {images.length > 0 ? (
                <>
                  <div className="relative w-full h-full max-w-lg">
                    <img
                      src={optimizeImageUrl(images[currentImageIndex])}
                      alt={`${brand} ${model} - Image ${currentImageIndex + 1} of ${images.length}`}
                      className="w-full h-full object-contain rounded-lg transition-opacity duration-200"
                      style={{ maxHeight: '400px' }}
                      onError={(e) => handleImageError(e, images[currentImageIndex], currentImageIndex)}
                      onLoadStart={() => setIsImageLoading(true)}
                      onLoad={() => setIsImageLoading(false)}
                      loading="lazy"
                    />
                    
                    {isImageLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                      </div>
                    )}
                  </div>

                  {/* Navigation Controls */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-orange-500"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-orange-500"
                        aria-label="Next image"
                      >
                        <ChevronRight size={18} className="sm:w-5 sm:h-5" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  {images.length > 1 && (
                    <div className="absolute top-2 right-2 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  )}

                  {/* Dot Indicators for mobile */}
                  {images.length > 1 && images.length <= 5 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 lg:hidden">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full transition-all focus:outline-none focus:ring-1 focus:ring-orange-500 ${
                            index === currentImageIndex
                              ? "bg-orange-500 scale-110"
                              : "bg-white/60 hover:bg-white/80"
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-500 text-2xl">🛞</span>
                    </div>
                    <p className="text-gray-500 text-sm">No images available</p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Details Section */}
          <section className="w-full lg:w-1/2 p-4 sm:p-6 overflow-y-auto flex-1 lg:order-1 scrollbar-thin scrollbar-thumb-gray-300">
            {/* Pricing */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                <span className="text-2xl sm:text-3xl font-bold text-green-600">
                  {formatPrice(price)}
                </span>
                {originalPrice && originalPrice !== price && (
                  <span className="text-base sm:text-lg text-gray-500 line-through">
                    {formatPrice(originalPrice)}
                  </span>
                )}
              </div>
              
              {discount && (
                <div className="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-3 shadow-sm">
                  {discount}
                </div>
              )}
              
              <p className="text-gray-600 text-sm sm:text-base">
                Size: <span className="font-semibold text-orange-600">{size}</span>
              </p>
            </div>

            {/* Specifications Grid */}
            <div className="mb-6">
              <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                <div className="w-1 h-5 bg-orange-500 rounded-full"></div>
                Specifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: 'Size', value: size },
                  { label: 'Type', value: type },
                  { label: 'Pattern', value: pattern },
                  { label: 'Max Speed', value: maxSpeed },
                  { label: 'Compound', value: compound },
                  { label: 'Max Load', value: maxLoad }
                ].filter(spec => spec.value).map((spec, index) => (
                  <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-lg border border-gray-200 hover:border-orange-200 transition-colors">
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">{spec.label}</p>
                    <p className="font-semibold text-sm sm:text-base text-gray-800 mt-1">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features */}
            {features.length > 0 && (
              <div className="mb-6">
                <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                  <Star className="w-5 h-5 text-orange-600" />
                  Key Features
                </h2>
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-gradient-to-r from-orange-50 to-orange-50/50 rounded-lg border border-orange-100 hover:border-orange-200 transition-all hover:shadow-sm"
                    >
                      <div className="flex-shrink-0 w-7 h-7 bg-orange-100 rounded-full flex items-center justify-center mt-0.5">
                        {getFeatureIcon(index)}
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-gray-800 leading-relaxed">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Special Offers */}
            <div className="mb-6">
              <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                <div className="w-1 h-5 bg-green-500 rounded-full"></div>
                Special Offers
              </h2>
              <div className="space-y-3">
                {offers.length > 0 ? (
                  offers.map((offer, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-gradient-to-r from-green-50 to-green-50/50 rounded-lg border border-green-100 hover:border-green-200 transition-colors"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{offer}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500 text-sm">
                    <p>No special offers available at the moment</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Action Buttons */}
        <footer className="flex gap-3 sm:gap-4 p-4 sm:p-6 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 flex-shrink-0">
          <button 
            onClick={handleContactClick}
            className="flex-1 bg-white border-2 border-orange-500 text-orange-600 py-3 px-4 rounded-lg font-semibold hover:bg-orange-50 active:bg-orange-100 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <Phone size={16} className="sm:w-[18px] sm:h-[18px]" />
            Contact Us
          </button>
          <button 
            onClick={handleInterestedClick}
            className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 active:from-orange-700 active:to-orange-800 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <Heart size={16} className="sm:w-[18px] sm:h-[18px]" />
            Interested
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ShowOfferTyre;