import React, { memo, useMemo, useState, useEffect, useCallback } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Edit, Save, X, Plus, Trash2 } from "lucide-react";

// Fallback data in case API fails
const FALLBACK_SLIDES = [
  {
    _id: "fallback1",
    title: "Own the Ride",
    subtitle: "You Deserve",
    description: "Experience the ultimate freedom on two wheels",
    image: "Bk1.jpg",
  },
  {
    _id: "fallback2",
    title: "Feel the Freedom",
    subtitle: "on Two Wheels",
    description: "Discover endless possibilities on every journey",
    image: "Bk2.jpg",
  },
  {
    _id: "fallback3",
    title: "Your Next Journey",
    subtitle: "Starts Here",
    description: "Adventure awaits around every corner",
    image: "Bk3.jpg",
  },
];

// Custom hook for localStorage 
const useLocalStorage = (key, defaultValue = null) => {
  const [value, setValue] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const item = localStorage.getItem(key);
        return item ? item : defaultValue;
      }
      return defaultValue;
    } catch (error) {
      console.log("localStorage not available");
      return defaultValue;
    }
  });

  const setStoredValue = (newValue) => {
    try {
      setValue(newValue);
      if (typeof window !== 'undefined' && window.localStorage) {
        if (newValue === null) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, newValue);
        }
      }
    } catch (error) {
      console.log("localStorage not available");
    }
  };

  return [value, setStoredValue];
};

// API functions
const api = {
  getCarouselData: async (apiBaseUrl) => {
    try {
      const response = await fetch(`${apiBaseUrl}/carousal`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching carousel data:', error);
      throw error;
    }
  },
  
  updateCarouselItem: async (id, itemData, token, apiBaseUrl) => {
    try {
      const response = await fetch(`${apiBaseUrl}/carousal/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(itemData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating carousel item:', error);
      throw error;
    }
  },
  
  createCarouselItem: async (itemData, token, apiBaseUrl) => {
    try {
      const response = await fetch(`${apiBaseUrl}/carousal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(itemData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating carousel item:', error);
      throw error;
    }
  },
  
  deleteCarouselItem: async (id, token, apiBaseUrl) => {
    try {
      const response = await fetch(`${apiBaseUrl}/carousal/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting carousel item:', error);
      throw error;
    }
  }
};

// Edit Modal Component with enhanced UI
const EditModal = ({ slide, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    if (slide) {
      setFormData({
        title: slide.title || '',
        subtitle: slide.subtitle || '',
        description: slide.description || '',
        image: slide.image || ''
      });
    } else {
      setFormData({
        title: '',
        subtitle: '',
        description: '',
        image: ''
      });
    }
  }, [slide]);

  const handleSubmit = () => {
    if (!formData.title || !formData.subtitle || !formData.description || !formData.image) {
      alert('Please fill in all fields');
      return;
    }
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl max-w-lg w-full p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-700 animate-slideUp">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            {slide ? 'Edit Carousel Slide' : 'Add New Slide'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              placeholder="Enter slide title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Subtitle
            </label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              placeholder="Enter slide subtitle"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
              placeholder="Enter slide description"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 px-4 rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-orange-500/50 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-700 text-white py-3 px-4 rounded-xl hover:bg-gray-600 transition-all duration-200 font-semibold border border-gray-600 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AnimatedParticles = memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-orange-400 rounded-full opacity-40 animate-float" 
         style={{ animationDuration: '6s', animationDelay: '0s' }} />
    <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-red-400 rounded-full opacity-50 animate-float"
         style={{ animationDuration: '8s', animationDelay: '1s' }} />
    <div className="absolute top-1/2 left-1/6 w-2 h-2 bg-yellow-300 rounded-full opacity-30 animate-float"
         style={{ animationDuration: '7s', animationDelay: '2s' }} />
    <div className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-pink-400 rounded-full opacity-35 animate-float"
         style={{ animationDuration: '9s', animationDelay: '1.5s' }} />
  </div>
));

AnimatedParticles.displayName = "AnimatedParticles";

// Enhanced decorative elements
const DecorativeElements = memo(() => (
  <>
    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-orange-500/60 to-transparent animate-pulse" />
    <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-red-500/60 to-transparent animate-pulse" 
         style={{ animationDelay: '1s' }} />
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  </>
));

DecorativeElements.displayName = "DecorativeElements";

// Enhanced loading component
const LoadingSlide = memo(() => (
  <div className="relative h-[100vh] max-h-[800px] min-h-[600px] w-full bg-gradient-to-br from-gray-900 via-black to-orange-900/20">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center text-white space-y-6 animate-fadeIn">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto"></div>
          <div className="w-20 h-20 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin-reverse mx-auto absolute top-0 left-1/2 -translate-x-1/2" 
               style={{ animationDelay: '0.3s' }}></div>
        </div>
        <div className="space-y-2">
          <p className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            Loading Experience
          </p>
          <p className="text-sm text-gray-400">Preparing your journey...</p>
        </div>
      </div>
    </div>
    <AnimatedParticles />
  </div>
));

LoadingSlide.displayName = "LoadingSlide";

// Enhanced error component
const ErrorSlide = memo(({ onRetry }) => (
  <div className="relative h-[100vh] max-h-[800px] min-h-[600px] w-full bg-gradient-to-br from-red-900/30 via-black to-gray-900">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center text-white space-y-6 max-w-md mx-auto px-4 animate-fadeIn">
        <div className="text-7xl animate-bounce-slow">⚠️</div>
        <div className="space-y-3">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
            Connection Lost
          </h2>
          <p className="text-gray-300 text-lg">
            Unable to load carousel content
          </p>
        </div>
        <button
          onClick={onRetry}
          className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-orange-500/50 transform hover:scale-105 active:scale-95"
        >
          Retry Connection
        </button>
      </div>
    </div>
    <AnimatedParticles />
  </div>
));

ErrorSlide.displayName = "ErrorSlide";

// Enhanced slide component with modern design
const CarouselSlide = memo(({ slide, index, isAdmin, onEdit, onDelete }) => (
  <div
    key={slide._id}
    className="relative h-[100vh] max-h-[800px] min-h-[600px] w-full overflow-hidden"
  >
    {/* Background Image with parallax effect */}
    <div className="absolute inset-0 overflow-hidden w-full">
      <img
        src={`public/images/bikes/${slide.image}`}
        alt={`${slide.title} - ${slide.subtitle}`}
        className="w-full h-full object-cover transform scale-105 transition-transform duration-[12000ms] ease-out hover:scale-110"
        loading={index === 0 ? "eager" : "lazy"}
      />
    </div>

    {/* Modern Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

    {/* Admin Edit Controls with enhanced styling */}
    {isAdmin && (
      <div className="absolute top-6 left-6 z-20 flex space-x-3">
        <button
          onClick={() => onEdit(slide)}
          className="group bg-blue-600/90 backdrop-blur-md text-white p-3 rounded-xl shadow-xl hover:bg-blue-500 transition-all duration-200 border border-blue-400/30 hover:scale-110 active:scale-95"
          title="Edit Slide"
        >
          <Edit className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        </button>
        <button
          onClick={() => onDelete(slide)}
          className="group bg-red-600/90 backdrop-blur-md text-white p-3 rounded-xl shadow-xl hover:bg-red-500 transition-all duration-200 border border-red-400/30 hover:scale-110 active:scale-95"
          title="Delete Slide"
        >
          <Trash2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        </button>
      </div>
    )}

    {/* Animated Particles */}
    <AnimatedParticles />

    {/* Enhanced Content */}
    <div className="absolute inset-0 flex items-center justify-center px-6 sm:px-8 text-center text-white w-full">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 w-full">
        {/* Main Title with modern styling */}
        <div className="overflow-hidden w-full">
          <div className="opacity-0 animate-slide-up space-y-3">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
              <span className="block bg-gradient-to-r from-white via-orange-100 to-orange-200 bg-clip-text text-transparent drop-shadow-2xl">
                {slide.title}
              </span>
            </h2>
            <div className="flex items-center justify-center space-x-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-orange-500"></div>
              <span className="text-xl sm:text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent font-bold tracking-wide drop-shadow-xl">
                {slide.subtitle}
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-orange-500"></div>
            </div>
          </div>
        </div>

        {/* Description with enhanced styling */}
        {slide.description && (
          <div className="overflow-hidden w-full">
            <div className="max-w-3xl mx-auto opacity-0 animate-slide-left">
              <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl px-8 py-6 shadow-2xl">
                <p className="text-lg sm:text-xl md:text-2xl text-gray-100 font-light leading-relaxed drop-shadow-lg">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Call to action hint */}
        <div className="opacity-0 animate-fade-in-delayed">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-300 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10">
            <span>Swipe to explore more</span>
            <span className="animate-pulse">→</span>
          </div>
        </div>
      </div>
    </div>

    {/* Decorative Elements */}
    <DecorativeElements />
  </div>
));

CarouselSlide.displayName = "CarouselSlide";

// Enhanced CSS styles
const carouselStyles = `
  * {
    box-sizing: border-box;
  }
  
  .carousel-root {
    position: relative;
    overflow: hidden;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  
  .carousel {
    overflow: hidden;
    width: 100%;
  }
  
  .carousel .slide {
    background: transparent;
  }
  
  .carousel .control-dots {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 20;
    margin: 0;
    padding: 16px 24px;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(20px);
    border-radius: 50px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  }
  
  .carousel .control-dots .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    margin: 0 8px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 2px solid transparent;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
  
  .carousel .control-dots .dot:hover {
    background: rgba(255, 255, 255, 0.5);
    transform: scale(1.2);
  }
  
  .carousel .control-dots .dot.selected {
    background: linear-gradient(135deg, #ff6b35, #f7931e);
    transform: scale(1.4);
    box-shadow: 0 0 20px rgba(255, 107, 53, 0.8), 0 0 40px rgba(255, 107, 53, 0.4);
    border-color: rgba(255, 255, 255, 0.5);
  }
  
  .carousel .control-next.control-arrow,
  .carousel .control-prev.control-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 20;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(20px);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    width: 64px;
    height: 64px;
    opacity: 0.7;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    color: white;
    font-size: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  }
  
  .carousel .control-next.control-arrow:hover,
  .carousel .control-prev.control-arrow:hover {
    background: linear-gradient(135deg, #ff6b35, #f7931e);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-50%) scale(1.15);
    box-shadow: 0 8px 30px rgba(255, 107, 53, 0.6);
    opacity: 1;
  }
  
  .carousel .control-next.control-arrow {
    right: 30px;
  }
  
  .carousel .control-prev.control-arrow {
    left: 30px;
  }
  
  .carousel .control-next.control-arrow:before,
  .carousel .control-prev.control-arrow:before {
    border: none;
    content: '';
    display: none;
  }
  
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(80px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-80px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

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

  @keyframes float {
    0%, 100% {
      transform: translateY(0) translateX(0);
    }
    25% {
      transform: translateY(-20px) translateX(10px);
    }
    50% {
      transform: translateY(-10px) translateX(-10px);
    }
    75% {
      transform: translateY(-15px) translateX(5px);
    }
  }

  @keyframes spin-reverse {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }

  @keyframes bounce-slow {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }
  
  .animate-slide-up {
    animation: slideInUp 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  
  .animate-slide-left {
    animation: slideInLeft 1s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards;
  }

  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
  }

  .animate-slideUp {
    animation: slideUp 0.4s ease-out forwards;
  }

  .animate-float {
    animation: float ease-in-out infinite;
  }

  .animate-spin-reverse {
    animation: spin-reverse 1s linear infinite;
  }

  .animate-bounce-slow {
    animation: bounce-slow 2s ease-in-out infinite;
  }

  .animate-fade-in-delayed {
    animation: fadeIn 1s ease-out 0.6s forwards;
  }
  
  @media (max-width: 768px) {
    .carousel .control-next.control-arrow,
    .carousel .control-prev.control-arrow {
      width: 48px;
      height: 48px;
      font-size: 18px;
      opacity: 0.6;
    }
    
    .carousel .control-next.control-arrow {
      right: 15px;
    }
    
    .carousel .control-prev.control-arrow {
      left: 15px;
    }
    
    .carousel .control-dots {
      bottom: 20px;
      padding: 12px 20px;
    }
    
    .carousel .control-dots .dot {
      width: 10px;
      height: 10px;
      margin: 0 6px;
    }
  }
  
  @media (max-width: 480px) {
    .carousel .control-next.control-arrow,
    .carousel .control-prev.control-arrow {
      width: 44px;
      height: 44px;
      font-size: 16px;
    }
    
    .carousel .control-dots {
      bottom: 15px;
      padding: 10px 16px;
    }
    
    .carousel .control-dots .dot {
      width: 8px;
      height: 8px;
      margin: 0 5px;
    }
  }
`;

// Configuration object for carousel settings
const CAROUSEL_CONFIG = {
  showThumbs: false,
  autoPlay: true,
  infiniteLoop: true,
  showStatus: false,
  interval: 6000,
  transitionTime: 600,
  emulateTouch: true,
  swipeable: true,
  preventMovementUntilSwipeScrollTolerance: true,
  swipeScrollTolerance: 50,
  className: "w-full h-[100vh] max-h-[800px] min-h-[500px] sm:min-h-[600px]",
  style: { margin: 0, padding: 0, width: "100%", overflow: "hidden" },
};

const HeroCarousel = memo(({ apiBaseUrl = `${import.meta.env.VITE_API_URL}` }) => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  
  // Admin authentication from localStorage
  const [adminToken] = useLocalStorage("adminToken");
  const isAdminLoggedIn = !!adminToken;

  // Function to fetch carousel data with proper error handling
  const fetchCarouselData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await api.getCarouselData(apiBaseUrl);

      if (Array.isArray(data) && data.length > 0) {
        setSlides(data);
      } else {
        console.warn("No carousel data received from API, using fallback data");
        setSlides(FALLBACK_SLIDES);
      }
    } catch (err) {
      console.error("Error fetching carousel data:", err);
      setError(err.message || "Failed to fetch carousel data");
      setSlides(FALLBACK_SLIDES);
    } finally {
      setLoading(false);
    }
  }, [apiBaseUrl]);

  // Admin functions
  const handleEditSlide = (slide) => {
    setEditingSlide(slide);
    setEditModalOpen(true);
  };

  const handleAddSlide = () => {
    setEditingSlide(null);
    setEditModalOpen(true);
  };

  const handleSaveSlide = async (formData) => {
    if (!adminToken) {
      alert('Admin authentication required');
      return;
    }

    try {
      if (editingSlide) {
        const updatedSlide = await api.updateCarouselItem(editingSlide._id, formData, adminToken, apiBaseUrl);
        setSlides(slides.map(slide => 
          slide._id === editingSlide._id ? updatedSlide : slide
        ));
      } else {
        const newSlide = await api.createCarouselItem(formData, adminToken, apiBaseUrl);
        setSlides([...slides, newSlide]);
      }
      setEditModalOpen(false);
      setEditingSlide(null);
    } catch (error) {
      console.error('Error saving slide:', error);
      if (error.message.includes('401')) {
        alert('Session expired. Please login again.');
      } else {
        alert('Error saving slide. Please try again.');
      }
    }
  };

  const handleDeleteSlide = async (slide) => {
    if (!adminToken) {
      alert('Admin authentication required');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this slide?')) return;
    
    try {
      await api.deleteCarouselItem(slide._id, adminToken, apiBaseUrl);
      const newSlides = slides.filter(s => s._id !== slide._id);
      setSlides(newSlides);
      
      if (newSlides.length === 0) {
        fetchCarouselData();
      }
    } catch (error) {
      console.error('Error deleting slide:', error);
      if (error.message.includes('401')) {
        alert('Session expired. Please login again.');
      } else {
        alert('Error deleting slide. Please try again.');
      }
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchCarouselData();
  }, [apiBaseUrl, fetchCarouselData]);

  // Memoize rendered slides
  const renderedSlides = useMemo(() => {
    if (loading) {
      return [<LoadingSlide key="loading" />];
    }

    if (error && slides.length === 0) {
      return [<ErrorSlide key="error" onRetry={fetchCarouselData} />];
    }

    return slides.map((slide, index) => (
      <CarouselSlide 
        key={slide._id || index} 
        slide={slide} 
        index={index}
        isAdmin={isAdminLoggedIn}
        onEdit={handleEditSlide}
        onDelete={handleDeleteSlide}
      />
    ));
  }, [slides, loading, error, isAdminLoggedIn, fetchCarouselData]);

  return (
    <div className="relative w-full overflow-hidden">
      <style jsx>{carouselStyles}</style>

      {/* Admin Add Button with enhanced styling */}
      {isAdminLoggedIn && (
        <div className="absolute top-6 right-6 z-30">
          <button
            onClick={handleAddSlide}
            className="group bg-gradient-to-r from-green-600 to-emerald-600 backdrop-blur-md text-white p-4 rounded-xl shadow-2xl hover:from-green-500 hover:to-emerald-500 transition-all duration-200 border border-green-400/30 hover:scale-110 active:scale-95"
            title="Add New Slide"
          >
            <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>
      )}

      <Carousel {...CAROUSEL_CONFIG}>{renderedSlides}</Carousel>

      {/* Enhanced bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/50 via-black/20 to-transparent pointer-events-none" />

      {/* Enhanced error notification */}
      {error && slides.length > 0 && (
        <div className="absolute top-6 left-6 bg-red-600/90 backdrop-blur-md text-white px-5 py-3 rounded-xl text-sm z-30 border border-red-400/30 shadow-xl animate-slideUp">
          <div className="flex items-center space-x-2">
            <span className="text-xl">⚠️</span>
            <span>Using cached data - API unavailable</span>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      <EditModal
        slide={editingSlide}
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setEditingSlide(null);
        }}
        onSave={handleSaveSlide}
      />
    </div>
  );
});

HeroCarousel.displayName = "HeroCarousel";

export default HeroCarousel;