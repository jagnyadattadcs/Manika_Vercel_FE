import React, { useState, useEffect, useMemo } from "react";
import {
  Star,
  Search,
  Edit,
  Trash2,
  Plus,
  X,
  Eye,
  EyeOff,
  ChevronDown,
  Loader2,
  Save,
  AlertTriangle,
  Filter,
} from "lucide-react";
import ShowOfferTyre from "./modal/ShowOfferTyre";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TyreCard from "./TyreCard";
import TyreFormModal from "./modal/TyreFormModal";




// Delete Confirmation Modal
const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  tyreName,
  isLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-red-500" />
          <h2 className="text-xl font-bold text-gray-900">Delete Tyre</h2>
        </div>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <strong>{tyreName}</strong>? This
          action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Local storage hook (same as BikeDisplay)
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

const TyreDisplay = () => {
  const token = useLocalStorage("adminToken");
  const navigate = useNavigate();
  const isAdmin = !!token;

  // State management
  const [tyres, setTyres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTyre, setSelectedTyre] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: { min: "", max: "" },
    brands: [],
    vehicleType: "Bike",
    tyreType: "All",
  });

  // Admin states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingTyre, setEditingTyre] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingTyre, setDeletingTyre] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Show More State
  const [showAllTyres, setShowAllTyres] = useState(false);
  const INITIAL_DISPLAY_COUNT = 8;

  const API_BASE_URL = `${import.meta.env.VITE_API_URL}/tyres`;

  // API helper function
  const apiCall = async (method, url, data = null) => {
    const config = {
      method,
      url: `${import.meta.env.VITE_API_URL}${url}`,
      headers: {},
    };

    if (token && isAdmin) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (data) {
      config.data = data;
      config.headers["Content-Type"] = "application/json";
    }

    return axios(config);
  };

  // Fetch Tyres from MongoDB
  useEffect(() => {
    const fetchTyres = async () => {
      try {
        setLoading(true);
        const response = await apiCall("GET", "/api/tyres");
        setTyres(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching bikes:", err);
        setError("Failed to load bikes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTyres();
  }, []);

  // Helper functions
  const getVehicleType = (size) => {
    if (!size) return "Other";
    const sizeNum = parseInt(size.split("/")[0]);
    if (sizeNum <= 175) return "Bike";
    if (sizeNum <= 215) return "Car";
    return "Other";
  };

  const extractPriceValue = (priceString) => {
    if (!priceString) return 0;
    const match = priceString.match(/[\d,]+/);
    return match ? parseInt(match[0].replace(/,/g, "")) : 0;
  };

  const availableBrands = [
    ...new Set(tyres.map((tyre) => tyre.brand).filter(Boolean)),
  ];
  const availableTypes = [
    ...new Set(tyres.map((tyre) => tyre.type).filter(Boolean)),
  ];

  // Filter and search tyres
  const filteredTyres = useMemo(() => {
    return tyres.filter((tyre) => {
      const matchesSearch =
        tyre.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tyre.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tyre.size?.toLowerCase().includes(searchTerm.toLowerCase());

      const priceValue = extractPriceValue(tyre.price);
      const matchesPrice =
        (!filters.priceRange.min ||
          priceValue >= parseInt(filters.priceRange.min)) &&
        (!filters.priceRange.max ||
          priceValue <= parseInt(filters.priceRange.max));

      const matchesBrand =
        filters.brands.length === 0 || filters.brands.includes(tyre.brand);

      const vehicleType = getVehicleType(tyre.size);
      const matchesVehicleType =
        filters.vehicleType === "All" || vehicleType === filters.vehicleType;

      const matchesTyreType =
        filters.tyreType === "All" || tyre.type === filters.tyreType;

      return (
        matchesSearch &&
        matchesPrice &&
        matchesBrand &&
        matchesVehicleType &&
        matchesTyreType
      );
    });
  }, [searchTerm, filters, tyres]);

  // Get tyres to display based on show more state
  const tyreToDisplay = useMemo(() => {
    if (showAllTyres) {
      return filteredTyres;
    }
    return filteredTyres.slice(0, INITIAL_DISPLAY_COUNT);
  }, [filteredTyres, showAllTyres]);

  // Reset show more state when filters change
  useEffect(() => {
    setShowAllTyres(false);
  }, [searchTerm, filters]);

  // Admin Functions
  const handleAddTyre = () => {
    setEditingTyre(null);
    setIsFormModalOpen(true);
  };

  const handleEditTyre = (tyre) => {
    setEditingTyre(tyre);
    setIsFormModalOpen(true);
  };

  const handleDeleteTyre = (tyre) => {
    setDeletingTyre(tyre);
    setIsDeleteModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      let response;
      if (editingTyre) {
        // Update existing tyre
        response = await apiCall(
          "PUT",
          `/api/tyres/${editingTyre._id}`,
          formData
        );
        setTyres((prev) =>
          prev.map((tyre) =>
            tyre._id === editingTyre._id ? response.data.tyre : tyre
          )
        );
      } else {
        // Add new tyre
        response = await apiCall("POST", "/api/tyres", formData);
        setTyres((prev) => [...prev, response.data.tyre]);
      }

      setIsFormModalOpen(false);
      setEditingTyre(null);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to save tyre. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    setIsSubmitting(true);
    try {
      await apiCall("DELETE", `/api/tyres/${deletingTyre._id}`);
      setTyres((prev) => prev.filter((tyre) => tyre._id !== deletingTyre._id));
      setIsDeleteModalOpen(false);
      setDeletingTyre(null);
    } catch (error) {
      console.error("Error deleting tyre:", error);
      setError("Failed to delete tyre. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckOffers = (tyre) => {
    const modalTyreData = {
      brand: `${tyre.brand} ${tyre.model}`,
      images:
        tyre.images && tyre.images.length > 0
          ? tyre.images.map((img) => `/images/tyres/${img}`)
          : ["/api/placeholder/400/300"],
      price: tyre.price,
      compound: tyre.compound,
      type: tyre.type || "N/A",
      size: tyre.size || "N/A",
      originalPrice: tyre.originalPrice || tyre.price,
      maxLoad: tyre.maxLoad || "N/A",
      discount: tyre.discount || "Special Offer",
      range: tyre.maxLoad || "Standard Load",
      maxSpeed: tyre.maxSpeed || "N/A",
      maxPower: tyre.type || "All-Season",
      Type: tyre.type || "N/A",
      pattern: tyre.pattern || "N/A",
      features: tyre.features,
      offers: tyre.offers || [
        "Free installation available",
        "Wheel alignment check included",
        "Extended warranty available",
        "Old tyre exchange discount",
      ],
    };

    setSelectedTyre(modalTyreData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTyre(null);
  };

  const handleBrandFilter = (brand) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand],
    }));
  };

  const clearFilters = () => {
    setFilters({
      priceRange: { min: "", max: "" },
      brands: [],
      vehicleType: "All",
      tyreType: "All",
    });
    setSearchTerm("");
  };

  const hasActiveFilters =
    searchTerm ||
    filters.priceRange.min ||
    filters.priceRange.max ||
    filters.brands.length > 0 ||
    filters.vehicleType !== "All" ||
    filters.tyreType !== "All";

  // Show More / Show Less handlers
  const handleToggleShowMore = () => {
    setShowAllTyres(!showAllTyres);
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-white/15 backdrop-blur-sm py-12 px-4 relative border border-white/25 shadow-xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
              <span className="text-lg text-gray-600">Loading tyres...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white/15 backdrop-blur-sm py-12 px-4 relative border border-white/25 shadow-xl">
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
    <>
      <div className="bg-white/15 backdrop-blur-sm py-12 px-4 relative border border-white/25 shadow-xl">
        {/* Burnout tire marks pattern */}
        <div
          className="absolute inset-0 opacity-12 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='80' viewBox='0 0 400 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23000000'%3E%3C!-- Straight tire marks --%3E%3Cpath d='M0 25 Q50 20 100 25 Q150 30 200 25 Q250 20 300 25 Q350 30 400 25' stroke-width='10' opacity='0.4' stroke-linecap='round'/%3E%3Cpath d='M0 35 Q50 30 100 35 Q150 40 200 35 Q250 30 300 35 Q350 40 400 35' stroke-width='8' opacity='0.3' stroke-linecap='round'/%3E%3Cpath d='M0 55 Q50 50 100 55 Q150 60 200 55 Q250 50 300 55 Q350 60 400 55' stroke-width='10' opacity='0.4' stroke-linecap='round'/%3E%3Cpath d='M0 65 Q50 60 100 65 Q150 70 200 65 Q250 60 300 65 Q350 70 400 65' stroke-width='8' opacity='0.3' stroke-linecap='round'/%3E%3C!-- Tire tread marks --%3E%3Cg opacity='0.3'%3E%3Crect x='10' y='23' width='3' height='4'/%3E%3Crect x='18' y='24' width='3' height='3'/%3E%3Crect x='26' y='23' width='3' height='4'/%3E%3Crect x='34' y='24' width='3' height='3'/%3E%3Crect x='42' y='23' width='3' height='4'/%3E%3Crect x='50' y='24' width='3' height='3'/%3E%3Crect x='58' y='23' width='3' height='4'/%3E%3Crect x='66' y='24' width='3' height='3'/%3E%3Crect x='74' y='23' width='3' height='4'/%3E%3Crect x='82' y='24' width='3' height='3'/%3E%3Crect x='90' y='23' width='3' height='4'/%3E%3Crect x='98' y='24' width='3' height='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "600px 120px",
            backgroundRepeat: "repeat-x",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Title with Admin Controls */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              OUR WIDE COLLECTION
            </h2>

            {/* Admin Status and Controls */}
            <div className="flex items-center gap-4">
              {isAdmin && (
                <>
                  <span className="text-sm text-green-600 font-medium">
                    Admin Mode
                  </span>
                  <button
                    onClick={handleAddTyre}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add New Tyre
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
                  placeholder="Search tyres by brand, model, or size..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-6 py-3 border rounded-lg transition-colors ${
                  showFilters
                    ? "bg-orange-50 border-orange-500 text-orange-600"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                <Filter className="w-5 h-5" />
                Filters
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div className="bg-gray-50 p-6 rounded-lg border">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Vehicle Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vehicle Type
                    </label>
                    <select
                      value={filters.vehicleType}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          vehicleType: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                    >
                      <option value="All">All Types</option>
                      <option value="Car">Car</option>
                      <option value="Bike">Bike</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Tyre Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tyre Type
                    </label>
                    <select
                      value={filters.tyreType}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          tyreType: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                    >
                      <option value="All">All Types</option>
                      {availableTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range (₹)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.priceRange.min}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            priceRange: {
                              ...prev.priceRange,
                              min: e.target.value,
                            },
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.priceRange.max}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            priceRange: {
                              ...prev.priceRange,
                              max: e.target.value,
                            },
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>

                  {/* Brand Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Brand
                    </label>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {availableBrands.map((brand) => (
                        <label key={brand} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.brands.includes(brand)}
                            onChange={() => handleBrandFilter(brand)}
                            className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {brand}
                          </span>
                        </label>
                      ))}
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

            {/* Results Count */}
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-gray-600">
                Showing {filteredTyres.length} of {tyres.length} tyres
              </p>
              {hasActiveFilters && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Active filters:</span>
                  <div className="flex gap-2 flex-wrap">
                    {searchTerm && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                        Search: "{searchTerm}"
                      </span>
                    )}
                    {filters.brands.map((brand) => (
                      <span
                        key={brand}
                        className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full"
                      >
                        {brand}
                      </span>
                    ))}
                    {filters.vehicleType !== "All" && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                        {filters.vehicleType}
                      </span>
                    )}
                    {filters.tyreType !== "All" && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                        Type: {filters.tyreType}
                      </span>
                    )}
                    {(filters.priceRange.min || filters.priceRange.max) && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                        Price: ₹{filters.priceRange.min || "0"} - ₹
                        {filters.priceRange.max || "∞"}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tyres Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {tyreToDisplay.length > 0 ? (
              tyreToDisplay.map((tyre) => (
                <TyreCard
                  key={tyre._id}
                  tyre={tyre}
                  onCheckOffers={handleCheckOffers}
                  onEdit={handleEditTyre}
                  onDelete={handleDeleteTyre}
                  isAdmin={isAdmin}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg mb-4">
                  No tyres found matching your criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="text-orange-600 hover:text-orange-700 font-medium"
                >
                  Clear filters to see all tyres
                </button>
              </div>
            )}
          </div>

          {/* Show More / Show Less Button */}
        {filteredTyres.length > INITIAL_DISPLAY_COUNT && (
          <div className="flex justify-center mb-8">
            <button
              onClick={handleToggleShowMore}
              className="flex items-center gap-2 bg-gradient-to-r from-[#ffce5a] to-[#eeb61d] hover:bg-gradient-to-r hover:from-[#fac445] hover:to-[#e8b62a] text-white font-semibold py-3 px-6 rounded-full text-lg transition-colors duration-200">
              {showAllTyres ? (
                <>
                  <EyeOff className="w-5 h-5" />
                  Show Less
                </>
              ) : (
                <>
                  <Eye className="w-5 h-5" />
                  Show More ({filteredTyres.length - INITIAL_DISPLAY_COUNT} more)
                </>
              )}
            </button>
          </div>
        )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button onClick={() => navigate("/contact")} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 min-w-48">
              CONTACT US
            </button>
            <button onClick={() => navigate("/contact")} className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 min-w-48">
              GET QUOTATION
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <TyreFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingTyre(null);
        }}
        onSubmit={handleFormSubmit}
        tyre={editingTyre}
        isLoading={isSubmitting}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingTyre(null);
        }}
        onConfirm={handleConfirmDelete}
        tyreName={
          deletingTyre ? `${deletingTyre.brand} ${deletingTyre.model}` : ""
        }
        isLoading={isSubmitting}
      />

      {/* Show Offer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50">
          <ShowOfferTyre
            isOpen={isModalOpen}
            onClose={closeModal}
            tyreData={selectedTyre}
          />
        </div>
      )}
    </>
  );
};

export default TyreDisplay;
