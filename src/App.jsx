import React, { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import AboutUs from "./pages/AboutUs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Bikes from "./pages/Bikes";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Tyre from "./pages/Tyre";
import LoginPage from "./pages/LoginPage";
import ContactUs from "./pages/ContactUs";
import { AuthProvider } from "./context/AuthContext";
// import ContactModal from "./components/modal/ContactModal";
import MapPage from "./pages/MapPage";
import Loader from "./components/Loader"; // show on initial load

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // keep loader visible briefly on first open (adjust duration as needed)
    const t = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(t);
  }, []);

  if (isLoading) return <Loader />;

  return (
    <Router>
      <AuthProvider>
        {/* Modal lives here, always available */}
        {/* <ContactModal /> */}

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/bikes" element={<Bikes />} />
          <Route path="/tyres" element={<Tyre />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/location" element={<MapPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
