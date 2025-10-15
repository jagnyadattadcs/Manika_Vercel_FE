import React, { useState, useEffect } from "react";
import { X, Loader2, Save, Upload, Plus, Trash2 } from "lucide-react";

const TyreFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  tyre = null,
  isLoading,
}) => {
  const initialFormState = {
    brand: "",
    model: "",
    images: [],
    price: "",
    originalPrice: "",
    discount: "",
    size: "",
    type: "",
    pattern: "",
    compound: "",
    maxLoad: "",
    maxSpeed: "",
    offers: "",
    features: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  useEffect(() => {
    if (tyre) {
      // Handle existing tyre data
      let imageArray = [];
      if (tyre.images) {
        if (Array.isArray(tyre.images)) {
          imageArray = tyre.images;
        } else if (typeof tyre.images === 'string') {
          imageArray = tyre.images.includes(',') 
            ? tyre.images.split(',').map(img => img.trim())
            : [tyre.images];
        }
      }

      setFormData({
        brand: tyre.brand || "",
        model: tyre.model || "",
        images: imageArray,
        price: tyre.price || "",
        originalPrice: tyre.originalPrice || "",
        discount: tyre.discount || "",
        size: tyre.size || "",
        type: tyre.type || "",
        pattern: tyre.pattern || "",
        compound: tyre.compound || "",
        maxLoad: tyre.maxLoad || "",
        maxSpeed: tyre.maxSpeed || "",
        offers: Array.isArray(tyre.offers)
          ? tyre.offers.join(", ")
          : tyre.offers || "",
        features: Array.isArray(tyre.features)
          ? tyre.features.join(", ")
          : tyre.features || "",
      });
      
      // Set existing image URLs for preview
      setImagePreviewUrls(imageArray);
    } else {
      // Reset form for new tyre
      setFormData(initialFormState);
      setImageFiles([]);
      setImagePreviewUrls([]);
    }
  }, [tyre, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image file selection
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // Validate file types and sizes
      const validFiles = files.filter(file => {
        if (!file.type.startsWith('image/')) {
          alert(`${file.name} is not an image file`);
          return false;
        }
        if (file.size > 10 * 1024 * 1024) {
          alert(`${file.name} is too large. Maximum size is 10MB`);
          return false;
        }
        return true;
      });

      if (validFiles.length > 0) {
        setImageFiles(prev => [...prev, ...validFiles]);
        
        // Create preview URLs for new files
        const newPreviewUrls = validFiles.map(file => URL.createObjectURL(file));
        setImagePreviewUrls(prev => [...prev, ...newPreviewUrls]);
      }
    }
  };

  // Remove image from preview and files
  const removeImage = (index) => {
    // Check if this is a new file (exists in imageFiles) or existing image
    const existingImagesCount = formData.images.length;
    
    if (index < existingImagesCount) {
      // Removing an existing image (already uploaded)
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
    } else {
      // Removing a new file
      const fileIndex = index - existingImagesCount;
      if (imageFiles[fileIndex]) {
        URL.revokeObjectURL(imagePreviewUrls[index]);
        setImageFiles(prev => prev.filter((_, i) => i !== fileIndex));
      }
    }
    
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  // Upload images to Cloudinary
  const uploadImagesToCloudinary = async (files) => {
    const uploadPromises = files.map(async (file) => {
      const formDataUpload = new FormData();
      formDataUpload.append('Image', file);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/upload-cloudinary-image`, 
          {
            method: 'POST',
            body: formDataUpload,
          }
        );
        
        if (!response.ok) {
          throw new Error('Upload failed');
        }
        
        const data = await response.json();
        return data.url; // Return Cloudinary URL
      } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
      }
    });

    return Promise.all(uploadPromises);
  };

  const processArrayField = (value) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  const handleSubmit = async () => {
    try {
      setUploadingImages(true);
      
      let uploadedImageUrls = [...formData.images]; // Keep existing images
      
      // Upload new images to Cloudinary if any
      if (imageFiles.length > 0) {
        const newImageUrls = await uploadImagesToCloudinary(imageFiles);
        uploadedImageUrls = [...uploadedImageUrls, ...newImageUrls];
      }
      
      const processedData = {
        ...formData,
        images: uploadedImageUrls, // Use uploaded image URLs
        offers: processArrayField(formData.offers),
        features: processArrayField(formData.features),
      };
      
      onSubmit(processedData);
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Error uploading images. Please try again.');
    } finally {
      setUploadingImages(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {tyre ? "Edit Tyre" : "Add New Tyre"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left - Basic Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "brand", label: "Brand *" },
                  { name: "model", label: "Model *" },
                  { name: "price", label: "Price *", placeholder: "₹5,000" },
                  { name: "size", label: "Size *", placeholder: "195/65R15" },
                  {
                    name: "originalPrice",
                    label: "Original Price",
                    placeholder: "₹7,000",
                  },
                  {
                    name: "discount",
                    label: "Discount",
                    placeholder: "₹2,000 OFF",
                  },
                  {
                    name: "type",
                    label: "Type",
                    placeholder: "All-Season, Summer, Winter",
                  },
                  {
                    name: "pattern",
                    label: "Pattern",
                    placeholder: "Directional, Asymmetric",
                  },
                  {
                    name: "compound",
                    label: "Compound",
                    placeholder: "Hard, Soft, Medium",
                  },
                  { name: "maxLoad", label: "Max Load", placeholder: "91V" },
                  {
                    name: "maxSpeed",
                    label: "Max Speed",
                    placeholder: "240 km/h",
                  },
                ].map(({ name, label, placeholder }) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {label}
                    </label>
                    <input
                      type="text"
                      name={name}
                      value={formData[name]}
                      onChange={handleInputChange}
                      placeholder={placeholder || ""}
                      required={label.includes("*")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                ))}
              </div>

              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tyre Images
                </label>
                
                {/* Upload Button */}
                <div className="mb-4">
                  <label className="flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-colors">
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <span className="text-sm text-gray-600">
                        Click to upload images or drag and drop
                      </span>
                      <span className="text-xs text-gray-500 block mt-1">
                        PNG, JPG, WEBP up to 10MB each
                      </span>
                      <span className="text-xs text-orange-500 block mt-1">
                        Images will be uploaded to Cloudinary when you click Submit
                      </span>
                    </div>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Image Previews */}
                {imagePreviewUrls.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {imagePreviewUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                          {index + 1}
                        </div>
                        {/* Status indicator */}
                        {index < formData.images.length ? (
                          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                            Uploaded
                          </div>
                        ) : (
                          <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                            Pending
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right - Extra Fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Offers (comma-separated)
                </label>
                <textarea
                  name="offers"
                  value={formData.offers}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Free installation, Extended warranty, Old tyre exchange"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Features (comma-separated)
                </label>
                <textarea
                  name="features"
                  value={formData.features}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="All-weather performance, Enhanced grip, Low noise"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 p-6 border-t">
          <button
            type="button"
            onClick={onClose}
            disabled={uploadingImages}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || uploadingImages}
            className="flex items-center gap-2 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {(isLoading || uploadingImages) ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {uploadingImages ? 'Uploading Images...' : (tyre ? "Update Tyre" : "Add Tyre")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TyreFormModal;