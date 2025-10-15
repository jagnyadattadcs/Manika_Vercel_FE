//BikeDisplay.jsx
import React, { useState, useMemo, useEffect, } from 'react';
import ShowOffer from '../components/modal/ShowOffer';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
import { Search, Filter, X, ChevronDown, Loader2, Plus, Eye, EyeOff } from 'lucide-react';
import BikeCard from './BikeCard';
import BikeFormModal from './modal/BikeFormModal';
import DeleteConfirmModal from './modal/DeleteConfirmModal';

const useLocalStorage = (key, defaultValue = null) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      setValue(item ?? defaultValue);
    } catch (error) {
      console.log("localStorage not available");
    }
  }, [key]);

  return value;
};


const BikeDisplay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = useLocalStorage("adminToken");
  const isAdmin = !!token;
 
  // const { isAdmin, token, user } = useAuth();
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBike, setSelectedBike] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: { min: '', max: '' },
    engineRange: { min: '', max: '' },
    brands: [],
    mileageRange: { min: '', max: '' }
  });

  // Show More State
  const [showAllBikes, setShowAllBikes] = useState(false);
  const INITIAL_DISPLAY_COUNT = 8;

  // Admin states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingBike, setEditingBike] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingBike, setDeletingBike] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // API helper function
  const apiCall = async (method, url, data = null) => {
    const config = {
      method,
      url: `${import.meta.env.VITE_API_URL}${url}`,
      headers: {}
    };
    if (token && isAdmin) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (data) {
      config.data = data;
      config.headers['Content-Type'] = 'application/json';
    }
    return axios(config);
  };

  // Fetch bikes from MongoDB
  useEffect(() => {
    const fetchBikes = async () => {
      try {
        setLoading(true);
        const response = await apiCall('GET', '/api/bikes');
        setBikes(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching bikes:', err);
        setError('Failed to load bikes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBikes();
  }, []);

  // Helper functions (same as before)
  const extractBrandFromName = (name) => {
    const brands = ['Yamaha', 'Honda', 'Bajaj', 'TVS', 'Hero', 'Royal Enfield', 'KTM', 'Suzuki', 'Kawasaki'];
    return brands.find(brand => name.toLowerCase().includes(brand.toLowerCase())) || 'Other';
  };

  const extractPriceValue = (priceString) => {
    const match = priceString.match(/[\d,]+/);
    return match ? parseInt(match[0].replace(/,/g, '')) : 0;
  };

  const extractEngineValue = (engineString) => {
    const match = engineString.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  const extractMileageValue = (mileageString) => {
    const match = mileageString.match(/(\d+(?:\.\d+)?)/);
    return match ? parseFloat(match[1]) : 0;
  };

  const availableBrands = [...new Set(bikes.map(bike => extractBrandFromName(bike.name)).filter(Boolean))];

  // Filter and search bikes
  const filteredBikes = useMemo(() => {
    return bikes.filter(bike => {
      const matchesSearch = bike.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const priceValue = extractPriceValue(bike.finalPrice);
      const matchesPrice = (!filters.priceRange.min || priceValue >= parseInt(filters.priceRange.min)) &&
                          (!filters.priceRange.max || priceValue <= parseInt(filters.priceRange.max));
      
      const engineValue = extractEngineValue(bike.specs.engine);
      const matchesEngine = (!filters.engineRange.min || engineValue >= parseInt(filters.engineRange.min)) &&
                           (!filters.engineRange.max || engineValue <= parseInt(filters.engineRange.max));
      
      const bikeBrand = extractBrandFromName(bike.name);
      const matchesBrand = filters.brands.length === 0 || filters.brands.includes(bikeBrand);
      
      const mileageValue = extractMileageValue(bike.specs.mileage);
      const matchesMileage = (!filters.mileageRange.min || mileageValue >= parseInt(filters.mileageRange.min)) &&
                            (!filters.mileageRange.max || mileageValue <= parseInt(filters.mileageRange.max));
      
      return matchesSearch && matchesPrice && matchesEngine && matchesBrand && matchesMileage;
    });
  }, [searchTerm, filters, bikes]);

  // Get bikes to display based on show more state
  const bikesToDisplay = useMemo(() => {
    if (showAllBikes) {
      return filteredBikes;
    }
    return filteredBikes.slice(0, INITIAL_DISPLAY_COUNT);
  }, [filteredBikes, showAllBikes]);

  // Reset show more state when filters change
  useEffect(() => {
    setShowAllBikes(false);
  }, [searchTerm, filters]);

  // Admin Functions
  const handleAddBike = () => {
    setEditingBike(null);
    setIsFormModalOpen(true);
  };

  const handleEditBike = (bike) => {
    setEditingBike(bike);
    setIsFormModalOpen(true);
  };

  const handleDeleteBike = (bike) => {
    setDeletingBike(bike);
    setIsDeleteModalOpen(true);
  };

 const handleFormSubmit = async (formData) => {
  setIsSubmitting(true);

  try {
    // Normalize the image field
    if (formData.image) {
      if (typeof formData.image === 'string') {
        formData.image = [formData.image]; // convert to array
      } else if (!Array.isArray(formData.image)) {
        formData.image = [];
      }
    } else {
      formData.image = [];
    }

    let response;
    if (editingBike) {
      // Update existing bike
      response = await apiCall('PUT', `/api/bikes/${editingBike._id}`, formData);
      setBikes(prev => prev.map(bike =>
        bike._id === editingBike._id ? response.data : bike
      ));
    } else {
      // Add new bike
      response = await apiCall('POST', '/api/bikes', formData);
      setBikes(prev => [...prev, response.data]);
    }

    setIsFormModalOpen(false);
    setEditingBike(null);
  } catch (error) {
    console.error('Error submitting form:', error);
    setError('Failed to save bike. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};

  const handleConfirmDelete = async () => {
    setIsSubmitting(true);
    try {
      await apiCall('DELETE', `/api/bikes/${deletingBike._id}`);
      setBikes(prev => prev.filter(bike => bike._id !== deletingBike._id));
      setIsDeleteModalOpen(false);
      setDeletingBike(null);
    } catch (error) {
      console.error('Error deleting bike:', error);
      setError('Failed to delete bike. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

const handleCheckOffers = (bike) => {
  let imageArray = [];

  // Normalize image data
  if (bike.image) {
    if (Array.isArray(bike.image)) {
      imageArray = bike.image.filter((img) => typeof img === "string" && img.trim() !== "");
    } else if (typeof bike.image === "string" && bike.image.trim() !== "") {
      imageArray = [bike.image];
    }
  }

  // Fallback to placeholder if no valid image
  if (imageArray.length === 0) {
    imageArray = ["https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/placeholder.jpg"];
  }

  const modalBikeData = {
    name: bike.name,
    images: imageArray,
    price: bike.finalPrice,
    originalPrice: bike.priceRange,
    discount: bike.discount,
    emi: bike.emiStartingFrom,
    range: bike.specs?.mileage || "N/A",
    engine: bike.specs?.engine || "N/A",
    maxPower: bike.specs?.maxPower || "N/A",
    maxTorque: bike.specs?.maxTorque || "N/A",
    fuelCapacity: bike.specs?.fuelTank || "N/A",
    availableColors: bike.availableColors,
    offers: bike.specialOffers || [
      "Zero down payment available",
      "Exchange bonus up to ₹10,000",
      "Extended warranty for 2 years",
      "Free service for 6 months",
    ],
    emiOptions: bike.emiOptions || [
      { tenure: "12 months", amount: "₹10,500/month" },
      { tenure: "24 months", amount: "₹5,800/month" },
      { tenure: "36 months", amount: "₹3,200/month", popular: true }
    ]
  };

  setSelectedBike(modalBikeData);
  setIsModalOpen(true);
};

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBike(null);
  };

  const handleBrandFilter = (brand) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand) 
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  const clearFilters = () => {
    setFilters({
      priceRange: { min: '', max: '' },
      engineRange: { min: '', max: '' },
      brands: [],
      mileageRange: { min: '', max: '' }
    });
    setSearchTerm('');
  };

  const hasActiveFilters = searchTerm || 
    filters.priceRange.min || filters.priceRange.max || 
    filters.engineRange.min || filters.engineRange.max || 
    filters.brands.length > 0 || 
    filters.mileageRange.min || filters.mileageRange.max;

  // Show More / Show Less handlers
  const handleToggleShowMore = () => {
    setShowAllBikes(!showAllBikes);
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
              <span className="text-lg text-gray-600">Loading bikes...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="text-red-500 text-lg mb-4">{error}</div>
            <button 
              onClick={() => window.location.reload()}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Title with Admin Controls */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">OUR PREMIUM COLLECTION</h2>
          
          {/* Admin Status and Controls */}
          <div className="flex items-center gap-4">
            {isAdmin && (
              <>
                <span className="text-sm text-green-600 font-medium">Admin Mode</span>
                <button
                  onClick={handleAddBike}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add New Bike
                </button>
              </>
            )}
          </div>
        </div>
        
        {/* Search and Filter Section */}
        <div className="mb-8">
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search bikes by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"/>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-6 py-3 border rounded-lg transition-colors ${
                showFilters ? 'bg-orange-50 border-orange-500 text-orange-600' : 'border-gray-300 hover:bg-gray-50'}`}>
              <Filter className="w-5 h-5" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="bg-gray-50 p-6 rounded-lg border">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (₹)</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.priceRange.min}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        priceRange: { ...prev.priceRange, min: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"/>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.priceRange.max}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        priceRange: { ...prev.priceRange, max: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"/>
                  </div>
                </div>

                {/* Engine Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Engine (cc)</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.engineRange.min}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        engineRange: { ...prev.engineRange, min: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"/>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.engineRange.max}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        engineRange: { ...prev.engineRange, max: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"/>
                  </div>
                </div>

                {/* Brand Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {availableBrands.map(brand => (
                      <label key={brand} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.brands.includes(brand)}
                          onChange={() => handleBrandFilter(brand)}
                          className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"/>
                        <span className="ml-2 text-sm text-gray-700">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Mileage Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mileage (km/l)</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.mileageRange.min}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        mileageRange: { ...prev.mileageRange, min: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.mileageRange.max}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        mileageRange: { ...prev.mileageRange, max: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Clear Filters Button */}
              {hasActiveFilters && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium text-sm"
                  >
                    <X className="w-4 h-4" />
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Results Count and Show More Info */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-4">
              <p className="text-sm text-gray-600">
                Showing {bikesToDisplay.length} of {filteredBikes.length} bikes
              </p>
              {/* Show More/Less indicator */}
              {filteredBikes.length > INITIAL_DISPLAY_COUNT && !showAllBikes && (
                <div className="flex items-center gap-1 text-sm text-orange-600">
                  <EyeOff className="w-4 h-4" />
                  <span>{filteredBikes.length - INITIAL_DISPLAY_COUNT} more available</span>
                </div>
              )}
              
              {showAllBikes && filteredBikes.length > INITIAL_DISPLAY_COUNT && (
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <Eye className="w-4 h-4" />
                  <span>Showing all bikes</span>
                </div>
              )}
            </div>

            {hasActiveFilters && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Active filters:</span>
                <div className="flex gap-2 flex-wrap">
                  {searchTerm && (
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                      Search: "{searchTerm}"
                    </span>
                  )}
                  {filters.brands.map(brand => (
                    <span key={brand} className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                      {brand}
                    </span>
                  ))}
                  {(filters.priceRange.min || filters.priceRange.max) && (
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                      Price: ₹{filters.priceRange.min || '0'} - ₹{filters.priceRange.max || '∞'}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
                 
        {/* Bikes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {bikesToDisplay.length > 0 ? (
            bikesToDisplay.map((bike) => (
              <BikeCard 
                key={bike._id} 
                bike={bike} 
                onCheckOffers={handleCheckOffers}
                onEdit={handleEditBike}
                onDelete={handleDeleteBike}
                isAdmin={isAdmin}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg mb-4">No bikes found matching your criteria</p>
              <button
                onClick={clearFilters}
                className="text-orange-600 hover:text-orange-700 font-medium">
                Clear filters to see all bikes
              </button>
            </div>
          )}
        </div>

        {/* Show More / Show Less Button */}
        {filteredBikes.length > INITIAL_DISPLAY_COUNT && (
          <div className="flex justify-center mb-8">
            <button
              onClick={handleToggleShowMore}
              className="flex items-center gap-2 bg-gradient-to-r from-[#ffce5a] to-[#eeb61d] hover:bg-gradient-to-r hover:from-[#fac445] hover:to-[#e8b62a] text-white font-semibold py-3 px-6 rounded-full text-lg transition-colors duration-200">
              {showAllBikes ? (
                <>
                  <EyeOff className="w-5 h-5" />
                  Show Less
                </>
              ) : (
                <>
                  <Eye className="w-5 h-5" />
                  Show More ({filteredBikes.length - INITIAL_DISPLAY_COUNT} more)
                </>
              )}
            </button>
          </div>
        )}
                 
        {/* Action Buttons */}
        <div 
        className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button onClick={() => navigate("/contact")}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 min-w-48">
            CONTACT US
          </button>
          <button onClick={() => navigate("/contact")}
          className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 min-w-48">
            GET QUOTATION
          </button>
        </div>
      </div>

      {/* Modals */}
      <BikeFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingBike(null);
        }}
        onSubmit={handleFormSubmit}
        bike={editingBike}
        isLoading={isSubmitting}/>

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingBike(null);
        }}
        onConfirm={handleConfirmDelete}
        bikeName={deletingBike?.name}
        isLoading={isSubmitting}/>

      <ShowOffer 
        isOpen={isModalOpen}
        onClose={closeModal}
        bikeData={selectedBike}
      />
    </div>
  );
};

export default BikeDisplay;