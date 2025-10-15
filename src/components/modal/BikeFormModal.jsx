import React, {useEffect,useState} from 'react';
import {X, Save, Loader2, Plus, Trash2, Upload} from 'lucide-react';

// Bike Form Modal Component
const BikeFormModal = ({ isOpen, onClose, onSubmit, bike = null, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    priceRange: '',
    finalPrice: '',
    discount: '',
    emiStartingFrom: '',
    image: [],
    priority: 1,
    specs: {
      engine: '',
      mileage: '',
      maxPower: '',
      maxTorque: '',
      fuelTank: ''
    },
    specialOffers: [''],
    emiOptions: [{ duration: '', amount: '' }],
    availableColors: ['']
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  useEffect(() => {
    if (bike) {
      // Handle existing bike data
      let imageArray = [];
      if (bike.image) {
        if (Array.isArray(bike.image)) {
          imageArray = bike.image;
        } else if (typeof bike.image === 'string') {
          imageArray = bike.image.includes(',') 
            ? bike.image.split(',').map(img => img.trim())
            : [bike.image];
        }
      }

      setFormData({
        name: bike.name || '',
        priceRange: bike.priceRange || '',
        finalPrice: bike.finalPrice || '',
        discount: bike.discount || '',
        emiStartingFrom: bike.emiStartingFrom || '',
        image: imageArray,
        priority: bike.priority || 1,
        specs: {
          engine: bike.specs?.engine || '',
          mileage: bike.specs?.mileage || '',
          maxPower: bike.specs?.maxPower || '',
          maxTorque: bike.specs?.maxTorque || '',
          fuelTank: bike.specs?.fuelTank || ''
        },
        specialOffers: bike.specialOffers?.length > 0 ? bike.specialOffers : [''],
        emiOptions: bike.emiOptions?.length > 0 ? bike.emiOptions : [{ duration: '', amount: '' }],
        availableColors: bike.availableColors?.length > 0 ? bike.availableColors : ['']
      });
      
      // Set existing image URLs for preview
      setImagePreviewUrls(imageArray);
    } else {
      // Reset form for new bike
      setFormData({
        name: '',
        priceRange: '',
        finalPrice: '',
        discount: '',
        emiStartingFrom: '',
        image: [],
        priority: 1,
        specs: {
          engine: '',
          mileage: '',
          maxPower: '',
          maxTorque: '',
          fuelTank: ''
        },
        specialOffers: [''],
        emiOptions: [{ duration: '', amount: '' }],
        availableColors: ['']
      });
      setImageFiles([]);
      setImagePreviewUrls([]);
    }
  }, [bike, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('specs.')) {
      const specField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        specs: {
          ...prev.specs,
          [specField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle image file selection (just for preview, no upload yet)
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setImageFiles(prev => [...prev, ...files]);
      
      // Create preview URLs for new files
      const newPreviewUrls = files.map(file => URL.createObjectURL(file));
      setImagePreviewUrls(prev => [...prev, ...newPreviewUrls]);
    }
  };

  // Remove image from preview and files
  const removeImage = (index) => {
    // Check if this is a new file (exists in imageFiles) or existing image
    const existingImagesCount = formData.image.length;
    
    if (index < existingImagesCount) {
      // Removing an existing image (already uploaded)
      setFormData(prev => ({
        ...prev,
        image: prev.image.filter((_, i) => i !== index)
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

  // Handle Special Offers
  const handleSpecialOfferChange = (index, value) => {
    setFormData(prev => ({
      ...prev,
      specialOffers: prev.specialOffers.map((offer, i) => i === index ? value : offer)
    }));
  };

  const addSpecialOffer = () => {
    setFormData(prev => ({
      ...prev,
      specialOffers: [...prev.specialOffers, '']
    }));
  };

  const removeSpecialOffer = (index) => {
    if (formData.specialOffers.length > 1) {
      setFormData(prev => ({
        ...prev,
        specialOffers: prev.specialOffers.filter((_, i) => i !== index)
      }));
    }
  };

  // Handle EMI Options
  const handleEmiOptionChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      emiOptions: prev.emiOptions.map((option, i) => 
        i === index ? { ...option, [field]: value } : option
      )
    }));
  };

  const addEmiOption = () => {
    setFormData(prev => ({
      ...prev,
      emiOptions: [...prev.emiOptions, { duration: '', amount: '' }]
    }));
  };

  const removeEmiOption = (index) => {
    if (formData.emiOptions.length > 1) {
      setFormData(prev => ({
        ...prev,
        emiOptions: prev.emiOptions.filter((_, i) => i !== index)
      }));
    }
  };

  // Handle Available Colors
  const handleColorChange = (index, value) => {
    setFormData(prev => ({
      ...prev,
      availableColors: prev.availableColors.map((color, i) => i === index ? value : color)
    }));
  };

  const addColor = () => {
    setFormData(prev => ({
      ...prev,
      availableColors: [...prev.availableColors, '']
    }));
  };

  const removeColor = (index) => {
    if (formData.availableColors.length > 1) {
      setFormData(prev => ({
        ...prev,
        availableColors: prev.availableColors.filter((_, i) => i !== index)
      }));
    }
  };

  // Helper function to get color value for display
  const getColorValue = (colorName) => {
    const color = colorName.toLowerCase();
    if (color.includes('black') || color.includes('dark')) return '#000000';
    if (color.includes('white') || color.includes('pearl')) return '#ffffff';
    if (color.includes('red') || color.includes('racing red')) return '#dc2626';
    if (color.includes('blue')) return '#2563eb';
    if (color.includes('green')) return '#16a34a';
    if (color.includes('yellow')) return '#eab308';
    if (color.includes('orange')) return '#ea580c';
    if (color.includes('silver') || color.includes('grey') || color.includes('gray')) return '#6b7280';
    if (color.includes('gold')) return '#f59e0b';
    if (color.includes('purple')) return '#9333ea';
    return '#6b7280'; // default gray
  };

  const handleSubmit = async () => {
    try {
      setUploadingImages(true);
      
      let uploadedImageUrls = [...formData.image]; // Keep existing images
      
      // Upload new images to Cloudinary if any
      if (imageFiles.length > 0) {
        const newImageUrls = await uploadImagesToCloudinary(imageFiles);
        uploadedImageUrls = [...uploadedImageUrls, ...newImageUrls];
      }
      
      // Process the form data before submission
      const processedFormData = {
        ...formData,
        // Use uploaded image URLs
        image: uploadedImageUrls,
        // Filter out empty special offers
        specialOffers: formData.specialOffers.filter(offer => offer.trim().length > 0),
        // Filter out incomplete EMI options
        emiOptions: formData.emiOptions.filter(option => 
          option.duration.trim().length > 0 && option.amount.trim().length > 0
        ),
        // Filter out empty colors
        availableColors: formData.availableColors.filter(color => color.trim().length > 0),
        // Ensure priority is a number
        priority: parseInt(formData.priority) || 1
      };
      
      onSubmit(processedFormData);
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
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {bike ? 'Edit Bike' : 'Add New Bike'}
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bike Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority *
                </label>
                <input
                  type="number"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  min="1"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Lower numbers appear first (1 = highest priority)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range *
                </label>
                <input
                  type="text"
                  name="priceRange"
                  value={formData.priceRange}
                  onChange={handleInputChange}
                  placeholder="e.g., ₹1,50,000 - ₹2,00,000"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Final Price *
                </label>
                <input
                  type="text"
                  name="finalPrice"
                  value={formData.finalPrice}
                  onChange={handleInputChange}
                  placeholder="e.g., ₹1,75,000"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount *
                </label>
                <input
                  type="text"
                  name="discount"
                  value={formData.discount}
                  onChange={handleInputChange}
                  placeholder="e.g., Save ₹25,000"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  EMI Starting From *
                </label>
                <input
                  type="text"
                  name="emiStartingFrom"
                  value={formData.emiStartingFrom}
                  onChange={handleInputChange}
                  placeholder="e.g., ₹3,500/month"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Image Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bike Images
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
                      {index < formData.image.length ? (
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

            {/* Price and Colors Preview Section */}
            {(formData.finalPrice || formData.availableColors.some(color => color.trim())) && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Preview</h3>
                <div className="flex flex-wrap items-center gap-4">
                  {formData.finalPrice && (
                    <div className="text-2xl font-bold text-green-600">
                      {formData.finalPrice}
                    </div>
                  )}
                  {formData.discount && (
                    <div className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
                      {formData.discount}
                    </div>
                  )}
                  {formData.availableColors.some(color => color.trim()) && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">Colors:</span>
                      <div className="flex gap-2">
                        {formData.availableColors
                          .filter(color => color.trim())
                          .map((color, index) => (
                            <div 
                              key={index}
                              className="w-6 h-6 rounded-full border-2 border-gray-300 shadow-sm"
                              style={{
                                backgroundColor: getColorValue(color)
                              }}
                              title={color}
                            />
                          ))
                        }
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Specifications */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Engine *
                  </label>
                  <input
                    type="text"
                    name="specs.engine"
                    value={formData.specs.engine}
                    onChange={handleInputChange}
                    placeholder="e.g., 149.5cc"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mileage *
                  </label>
                  <input
                    type="text"
                    name="specs.mileage"
                    value={formData.specs.mileage}
                    onChange={handleInputChange}
                    placeholder="e.g., 50 km/l"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Power *
                  </label>
                  <input
                    type="text"
                    name="specs.maxPower"
                    value={formData.specs.maxPower}
                    onChange={handleInputChange}
                    placeholder="e.g., 13.2 hp"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Torque
                  </label>
                  <input
                    type="text"
                    name="specs.maxTorque"
                    value={formData.specs.maxTorque}
                    onChange={handleInputChange}
                    placeholder="e.g., 13.25 Nm"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fuel Tank Capacity *
                  </label>
                  <input
                    type="text"
                    name="specs.fuelTank"
                    value={formData.specs.fuelTank}
                    onChange={handleInputChange}
                    placeholder="e.g., 12 liters"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Available Colors */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Available Colors</h3>
                <button
                  type="button"
                  onClick={addColor}
                  className="flex items-center gap-1 text-orange-600 hover:text-orange-700 text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Color
                </button>
              </div>
              <div className="space-y-3">
                {formData.availableColors.map((color, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                      placeholder="e.g., Matte Black, Pearl White, Racing Red"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <div className="flex items-center gap-2">
                      {color && (
                        <div 
                          className="w-8 h-8 rounded border-2 border-gray-300 flex items-center justify-center text-xs font-medium"
                          style={{
                            backgroundColor: getColorValue(color),
                            color: color.toLowerCase().includes('white') || color.toLowerCase().includes('yellow') ? '#000' : '#fff'
                          }}
                          title={color}
                        >
                          {color.charAt(0).toUpperCase()}
                        </div>
                      )}
                      {formData.availableColors.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeColor(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Offers */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Special Offers</h3>
                <button
                  type="button"
                  onClick={addSpecialOffer}
                  className="flex items-center gap-1 text-orange-600 hover:text-orange-700 text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Offer
                </button>
              </div>
              <div className="space-y-3">
                {formData.specialOffers.map((offer, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="text"
                      value={offer}
                      onChange={(e) => handleSpecialOfferChange(index, e.target.value)}
                      placeholder="e.g., Zero down payment available"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    {formData.specialOffers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSpecialOffer(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* EMI Options */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">EMI Options</h3>
                <button
                  type="button"
                  onClick={addEmiOption}
                  className="flex items-center gap-1 text-orange-600 hover:text-orange-700 text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add EMI Option
                </button>
              </div>
              <div className="space-y-3">
                {formData.emiOptions.map((option, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="text"
                      value={option.duration}
                      onChange={(e) => handleEmiOptionChange(index, 'duration', e.target.value)}
                      placeholder="e.g., 12 months, 24 months"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      value={option.amount}
                      onChange={(e) => handleEmiOptionChange(index, 'amount', e.target.value)}
                      placeholder="e.g., ₹3,500/month"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    {formData.emiOptions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEmiOption(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
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
                {uploadingImages ? 'Uploading Images...' : (bike ? 'Update Bike' : 'Add Bike')}
              </button>
            </div>
          </div>
        </div>
      </div>A
    </div>
  );
};

export default BikeFormModal;