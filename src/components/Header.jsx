import React, { useState, useEffect } from "react";
import {
  Clock,
  Menu,
  X,
  Phone,
  ChevronRight,
  LogOut,
  UserCog,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/Manika_1.png"; // <-- your logo

// Custom hook to safely get localStorage values
const useLocalStorage = (key, defaultValue = null) => {
  const [value, setValue] = useState(defaultValue);
  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      setValue(item ?? defaultValue);
    } catch {
      console.log("localStorage not available");
    }
  }, [key]);
  return value;
};

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const adminToken = useLocalStorage("adminToken");
  const isAdminLoggedIn = !!adminToken;

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUsername");
    setIsMobileMenuOpen(false);
    navigate("/login");
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const googleMapsUrl = "https://maps.app.goo.gl/fjN8hYhpgJdbjXJA7";

  // ✅ Social Links
  const socialLinks = {
    facebook: "https://www.facebook.com/profile.php?id=61581547257161",
    instagram: "https://www.instagram.com/manikaautomobiles/?hl=en",
    youtube: "https://www.youtube.com/",
  };

  const navItems = [
    { name: "Home", href: "/", key: "/" },
    { name: "About Us", href: "/about", key: "/about" },
    { name: "Contact Us", href: "/contactUs", key: "/contactUs" },
  ];

  return (
    <div className="w-full">
      <header className="w-full">
        {/* Top bar */}
        <div className="hidden sm:block bg-neutral-800 text-white px-4 py-2">
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Open Hours: Mon - Fri 8.00 am - 6.00 pm</span>
            </div>
            <div className="italic text-sm tracking-wide font-mono">
              A key to happiness.
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="bg-black text-white px-4 py-4 sm:py-8 shadow-xl">
          <div className="max-w-7xl mx-auto">
            {/* MOBILE HEADER */}
            <div className="sm:hidden flex items-center justify-between gap-3">
              {/* Left logo */}
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={logo}
                    alt="Manika Automobile Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-lg font-bold leading-5">
                    Manika Automobile
                  </p>
                  <p className="text-xs text-gray-300">
                    Ride beyond the ordinary
                  </p>
                </div>
              </div>

              {/* Right icons (Book, Location, Socials, Menu) */}
              <div className="flex items-center gap-3">
                {/* ✅ Book Ride (mobile) */}
                <a
                  href="tel:+919439705550"
                  className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-xl shadow-md flex items-center justify-center hover:scale-105 transition-transform"
                  aria-label="Book a ride"
                >
                  <Phone className="w-5 h-5 text-white" />
                </a>

                {/* Location */}
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-orange-400 transition-colors"
                  aria-label="Our location"
                >
                  <MapPin className="w-5 h-5" />
                </a>

                {/* ✅ Social icons (mobile) */}
                <div className="flex items-center gap-2">
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-500"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-pink-500"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href={socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-red-600"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>

                {/* Menu */}
                <button
                  onClick={toggleMobileMenu}
                  className="text-white hover:text-orange-500 transition-colors"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>

            {/* DESKTOP HEADER */}
            <div className="hidden sm:flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(255,90,0,0.4)]">
                  <img
                    src={logo}
                    alt="Manika Auto Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-2xl font-extrabold tracking-tight">
                  Manika Automobile
                </p>
              </Link>

              {/* Center: Nav links */}
              <nav className="flex items-center gap-6">
                {navItems.map((item) => {
                  if (item.key === "/contactUs") {
                    return (
                      <button
                        key={item.key}
                        onClick={() => {
                          if (location.pathname !== "/") {
                            navigate("/");
                            setTimeout(() => {
                              document
                                .getElementById("contact-section")
                                ?.scrollIntoView({ behavior: "smooth" });
                            }, 150);
                          } else {
                            document
                              .getElementById("contact-section")
                              ?.scrollIntoView({ behavior: "smooth" });
                          }
                          setIsMobileMenuOpen(false);
                        }}
                        className={`relative text-sm font-medium uppercase tracking-wide transition duration-200 cursor-pointer ${
                          location.pathname === item.key
                            ? "text-white"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        {item.name}
                      </button>
                    );
                  }

                  return (
                    <Link
                      key={item.key}
                      to={item.href}
                      className={`relative text-sm font-medium uppercase tracking-wide transition duration-200 
                      after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 
                      after:bg-gradient-to-r after:from-orange-500 after:to-red-500 after:w-0 hover:after:w-full ${
                        location.pathname === item.key
                          ? "text-white after:w-full"
                          : "text-gray-400 hover:text-white"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              {/* Right section */}
              <div className="flex items-center gap-4">
                {isAdminLoggedIn ? (
                  <>
                    <button
                      onClick={() => navigate("/admin")}
                      className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 px-4 py-3 rounded-2xl shadow-lg hover:scale-105 transition-transform"
                    >
                      <UserCog className="w-4 h-4" />
                      <span className="text-sm font-semibold">Admin Panel</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 bg-gray-700 px-4 py-3 rounded-2xl hover:bg-red-600 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm font-semibold">Logout</span>
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-4">
                    {/* Book a Ride (Desktop) */}
                    <a
                      href="tel:+919439705550"
                      className="bg-gradient-to-r from-orange-500 to-red-500 px-4 py-3 rounded-2xl flex items-center gap-3 shadow-[0_10px_30px_rgba(255,90,0,0.4)] hover:scale-[1.02] transition-transform"
                    >
                      <div className="bg-black/20 rounded-xl p-2">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs uppercase tracking-widest text-white/70">
                          Book a ride
                        </p>
                        <p className="text-lg font-bold">+91 94397 05550</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-white" />
                    </a>

                    {/* Location + Socials */}
                    <div className="flex items-center gap-3">
                      {/* <a
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Our location"
                        className="flex flex-col items-center justify-center text-white px-2 py-1 rounded-md hover:text-orange-400 transition-colors"
                      >
                        <MapPin className="w-6 h-6" />
                        <span className="text-xs mt-1">
                          Manika Automobile
                        </span>
                      </a> */}

                      <a
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Our location"
                        className="flex flex-col items-center justify-center text-white px-2 py-1 rounded-md hover:text-orange-400 transition-colors"
                      >
                        <img
                          src="/Maps.png" // 🔹 Yahan apne image ka path dena hai
                          alt="Map location"
                          className="w-6 h-6" // 🔹 Size same rakha gaya hai jaise icon tha
                        />
                        <span className="text-xs mt-1">Manika Automobile</span>
                      </a>

                      {/* ✅ Socials (desktop) */}
                      <div className="flex items-center gap-2">
                        <a
                          href={socialLinks.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-blue-500"
                        >
                          <Facebook className="w-5 h-5" />
                        </a>
                        <a
                          href={socialLinks.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-pink-500"
                        >
                          <Instagram className="w-5 h-5" />
                        </a>
                        {/* <a
                          href={socialLinks.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-red-600"
                        >
                          <Youtube className="w-5 h-5" />
                        </a> */}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div className="sm:hidden bg-neutral-900 border-t border-neutral-700">
            <nav className="flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 border-b border-neutral-800 hover:bg-neutral-800 ${
                    location.pathname === item.key
                      ? "text-red-500 bg-neutral-800"
                      : "text-gray-300"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Admin */}
              <div className="px-4 py-3 border-t border-neutral-700 text-gray-300">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-left py-2 hover:text-orange-500 flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" /> Location
                </a>

                {/* ✅ Mobile social icons in menu */}
                <div className="flex items-center gap-4 px-2 py-3">
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-500"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-pink-500"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href={socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-red-600"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>

                {isAdminLoggedIn ? (
                  <>
                    <button
                      onClick={() => {
                        navigate("/admin");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left py-2 hover:text-orange-500 flex items-center gap-2"
                    >
                      <UserCog className="w-4 h-4" /> Admin Panel
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left py-2 hover:text-red-500 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-left py-2 hover:text-orange-500 flex items-center gap-2"
                  >
                    <UserCog className="w-4 h-4" /> Admin Login
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}
