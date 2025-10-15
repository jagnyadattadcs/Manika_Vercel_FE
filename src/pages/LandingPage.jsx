import { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BikeList from "../components/BikeList";
import HeroCarousel from "../components/HeroCarousel";
import ServiceList from "../components/ServiceList";
import ContactUs from "../components/ui/ContactUs";
import BikeHover from "../components/BikeHover";
import { useNavigate } from "react-router-dom";
import FloatingButtons from "../components/FloatingButtons";

// Reusable Section Title Component - Mobile Optimized
const SectionTitle = ({
  title,
  subtitle,
  gradientFrom = "from-blue-600",
  gradientTo = "to-purple-600",
  className = "",
}) => (
  <section className={`text-center py-6 sm:py-8 bg-square-grid ${className}`}>
    <div className="container bg-square-grid mx-auto px-4 sm:px-6">
      <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-3 sm:mb-4 tracking-tight leading-tight">
        {title}
      </h2>
      <p className="text-base sm:text-lg md:text-xl text-gray-600 font-light max-w-xl sm:max-w-2xl mx-auto leading-relaxed px-2">
        {subtitle}
      </p>
      <div
        className={`w-16 sm:w-24 h-1 bg-gradient-to-r ${gradientFrom} ${gradientTo} mx-auto mt-4 sm:mt-6 rounded-full shadow-sm`}
      />
    </div>
  </section>
);

// Mobile-Optimized Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="animate-pulse bg-gray-50 py-8 sm:py-16">
    <div className="container mx-auto px-4 sm:px-6 lg:px-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
            <div className="h-32 sm:h-40 md:h-48 bg-gray-200 rounded-lg mb-3 sm:mb-4" />
            <div className="h-3 sm:h-4 bg-gray-200 rounded mb-2" />
            <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Mobile Error Component
const MobileErrorFallback = ({ onRetry }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div className="text-center max-w-sm">
      <div className="mb-6">
        <svg
          className="w-16 h-16 text-gray-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
        Something went wrong
      </h2>
      <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
        We're having trouble loading the page. Please check your connection and try again.
      </p>
      <button
        onClick={onRetry}
        className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors text-sm sm:text-base font-medium touch-manipulation"
      >
        Try Again
      </button>
    </div>
  </div>
);

function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const loadingTime = isMobile ? 500 : 1000;
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadingTime);

    return () => clearTimeout(timer);
  }, [isMobile]);

  const handleRetry = useCallback(() => {
    setError(null);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (error) {
    return <MobileErrorFallback onRetry={handleRetry} />;
  }

  return (
    <div className="min-h-screen bg-square-grid">
      <Header />

      <main className="overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative">
          <HeroCarousel />
        </section>

        <section className="relative">
          <BikeHover />
        </section>

        {/* Bikes Section */}
        <SectionTitle
          title="Unleash the Rider in You"
          subtitle="Select from Our Exclusive Fleet of Premium Two-Wheelers"
        />

        <section className="bg-square-grid px-4 sm:px-6 lg:px-10">
          <div className="container mx-auto">
            {isLoading ? <LoadingSkeleton /> : <BikeList limit={6} />}
          </div>
        </section>

        {/* ✅ Services Section (Replaced Tyres Section) */}
        <SectionTitle
          title="Our Professional Services"
          subtitle="Experience excellence in every service we offer — from maintenance to customization"
          gradientFrom="from-green-600"
          gradientTo="to-blue-600"
        />

        <section className="bg-square-grid py-1 px-4 sm:px-6 lg:px-10">
          <div onClick={() => navigate("/services")} className="container mx-auto">
            {isLoading ? <LoadingSkeleton /> : <ServiceList />}
          </div>
        </section>

        {/* MotorcycleBoard removed from UI */}
      </main>

      <div id="contact-section">
        <ContactUs />
      </div>
      <br />
      <Footer />

      {/* Local floating call/whatsapp buttons */}
      <FloatingButtons />

      <ScrollToTop isMobile={isMobile} />
    </div>
  );
}

// Mobile Scroll to Top Component
const ScrollToTop = ({ isMobile }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const threshold = isMobile ? 200 : 300;
      setIsVisible(window.pageYOffset > threshold);
    };

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          toggleVisibility();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 bg-blue-600 text-white ${
            isMobile ? "p-3 w-12 h-12" : "p-3 w-14 h-14"
          } rounded-full shadow-lg hover:bg-blue-700 active:bg-blue-800 transition-all duration-300 z-50 hover:scale-110 active:scale-95 flex items-center justify-center`}
          aria-label="Scroll to top"
        >
          <svg
            className={`${isMobile ? "w-5 h-5" : "w-6 h-6"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </>
  );
};

export default LandingPage;
