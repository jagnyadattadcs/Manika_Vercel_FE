import { useEffect, useState } from "react";
import { X, Mail, User, MessageCircle, Send, Phone, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [submitType, setSubmitType] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000); 

    return () => clearTimeout(timer);
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
    // Clear status when user makes changes
    if (status) {
      setStatus('');
      setSubmitType('');
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\+]?[1-9]?[0-9]{7,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setStatus('');

    try {
      // API endpoint for contact form
      const API_URL = `${import.meta.env.VITE_API_URL}`;
      
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        // Add timeout using AbortController
        signal: AbortSignal.timeout(10000)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      setStatus(data.message || 'Message sent successfully! We\'ll get back to you soon.');
      setSubmitType('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setErrors({});
      
      // Auto-close modal after success
      setTimeout(() => {
        handleClose();
      }, 3000);

    } catch (err) {
      console.error('Contact form error:', err);
      
      let errorMessage = 'Something went wrong. Please try again or contact us directly.';
      
      if (err.name === 'AbortError') {
        errorMessage = 'Request timeout. Please check your connection and try again.';
      } else if (err.message.includes('429')) {
        errorMessage = 'Too many requests. Please try again in a few minutes.';
      } else if (err.message.includes('400')) {
        errorMessage = 'Please check your information and try again.';
      } else if (err.message.includes('500')) {
        errorMessage = 'Server error. Please try again later or contact us directly.';
      } else if (err.message.includes('Failed to fetch')) {
        errorMessage = 'Network error. Please check your connection and try again.';
      }
      
      setStatus(errorMessage);
      setSubmitType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close modal
  const handleClose = () => {
    setIsOpen(false);
    setFormData({ name: "", email: "", phone: "", message: "" });
    setErrors({});
    setStatus('');
    setSubmitType('');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Overlay */}
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-3 sm:p-4">
        {/* Modal Box - Optimized for mobile and desktop */}
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md mx-auto relative transform transition-all duration-300 max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
          
          {/* Compact Header */}
          <div className="bg-gradient-to-r from-orange-600 to-black p-4 sm:p-5 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 to-black"></div>
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-2 -left-4 w-12 h-12 bg-white/10 rounded-full blur-lg"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold">Get In Touch</h2>
                </div>
                
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
              
              <p className="text-blue-100 text-sm">
                We'll reach out to you promptly
              </p>
            </div>
          </div>

          {/* Scrollable Form Content */}
          <div className="p-4 sm:p-5 max-h-[calc(95vh-120px)] sm:max-h-[calc(90vh-140px)] overflow-y-auto">
            <div className="space-y-4">
              
              {/* Status Message */}
              {status && (
                <div className={`p-3 rounded-lg text-sm flex items-center gap-2 ${
                  submitType === 'success' 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {submitType === 'success' ? (
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                  )}
                  <span>{status}</span>
                </div>
              )}
              
              {/* Name Field */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2.5 sm:py-3 border ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base`}
                    placeholder="Enter your full name"
                    disabled={isSubmitting}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2.5 sm:py-3 border ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base`}
                    placeholder="your@email.com"
                    disabled={isSubmitting}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>

              {/* Phone Field */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2.5 sm:py-3 border ${
                      errors.phone ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base`}
                    placeholder="+91 98765 43210"
                    disabled={isSubmitting}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs">{errors.phone}</p>
                )}
              </div>

              {/* Message Field */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Message *
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                    <MessageCircle className="h-4 w-4 text-gray-400" />
                  </div>
                  <textarea
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2.5 sm:py-3 border ${
                      errors.message ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none text-sm sm:text-base`}
                    placeholder="Tell us about your inquiry..."
                    disabled={isSubmitting}
                  />
                </div>
                {errors.message && (
                  <p className="text-red-500 text-xs">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm sm:text-base font-medium text-white transition-all duration-200 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-600 to-black hover:from-orange-700 hover:to-black transform hover:scale-[1.02] active:scale-[0.98]'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center leading-relaxed">
                We respect your privacy and will never share your information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}