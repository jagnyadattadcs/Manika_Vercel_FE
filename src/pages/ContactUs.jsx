import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, Download, Loader2 } from 'lucide-react';
import { useLocation } from 'react-router-dom'; 
import Header from '../components/Header';
import Footer from '../components/Footer';

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

const ContactUs = () => {
  const location = useLocation(); 
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitType, setSubmitType] = useState('');

  // Admin CSV download states
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const adminToken = useLocalStorage("adminToken");
  const isAdmin = !!adminToken;


  // Check if user is admin on component mount
  useEffect(() => {
    const checkAdminStatus = () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Decode JWT token to check role
          const payload = JSON.parse(atob(token.split('.')[1]));
          setIsAdmin(payload.role === 'admin');
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, []);

  // Effect to handle pre-filled message from navigation state
  useEffect(() => {
    if (location.state?.prefilledMessage) {
      setForm(prev => ({
        ...prev,
        message: location.state.prefilledMessage
      }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/contact`, form);
      setStatus(res.data.message);
      setSubmitType('success');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setStatus('Something went wrong. Please try again or contact us directly.');
      setSubmitType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle CSV download
  const handleDownloadCSV = async () => {
    setIsDownloading(true);
    setDownloadSuccess(false);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/export-contacts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob', // Important for file downloads
      });

      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      // Generate filename with current date
      const currentDate = new Date().toISOString().split('T')[0];
      link.setAttribute('download', `customer-queries-${currentDate}.csv`);
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      // Show success message
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000); // Hide after 3 seconds

    } catch (error) {
      console.error('Error downloading CSV:', error);
      // You could add error handling here similar to the form submission
    } finally {
      setIsDownloading(false);
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: ["+91 98765 43210", "+91 87654 32109"],
      description: "Call us during business hours"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: ["info@najmotors.com", "support@najmotors.com"],
      description: "We'll respond within 24 hours"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Address",
      details: ["NAJ Motors", "Nayapalli, Bhubaneswar", "Odisha 751015"],
      description: "Visit our showroom"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: ["Mon - Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 5:00 PM", "Sun: Closed"],
      description: "Best time to visit"
    }
  ];

  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-6">Get In Touch</h1>
            <p className="text-xl text-orange-300 max-w-2xl mx-auto">
              Have questions about our bikes or services? We're here to help! 
              Reach out to us and we'll get back to you as soon as possible.
            </p>
            {/* Show product reference if coming from product details */}
            {(location.state?.bikeName || location.state?.tyreName) && (
              <div className="mt-4 inline-block bg-orange-500 bg-opacity-20 border border-orange-400 rounded-lg px-4 py-2">
                <p className="text-orange-200 text-sm">
                  Inquiry about: <span className="font-semibold text-orange-100">
                    {location.state?.bikeName || location.state?.tyreName}
                  </span>
                  {location.state?.productType && (
                    <span className="ml-2 text-xs bg-orange-400 bg-opacity-30 px-2 py-1 rounded">
                      {location.state.productType}
                    </span>
                  )}
                </p>
              </div>
            )}

            {/* Admin CSV Download Button */}
            {isAdmin && (
              <div className="mt-8">
                <button
                  onClick={handleDownloadCSV}
                  disabled={isDownloading}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none mx-auto"
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Download Customer Queries (CSV)
                    </>
                  )}
                </button>

                {/* Success Message */}
                {downloadSuccess && (
                  <div className="mt-4 inline-flex items-center gap-2 bg-green-500 bg-opacity-20 border border-green-400 rounded-lg px-4 py-2">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <p className="text-green-200 text-sm font-medium">
                      CSV downloaded successfully!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 border border-gray-100">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-black mb-4">Send us a Message</h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
                {(location.state?.bikeName || location.state?.tyreName) && (
                  <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-orange-800 text-sm">
                      <span className="font-medium">Regarding:</span> {location.state?.bikeName || location.state?.tyreName}
                      {location.state?.productType && (
                        <span className="ml-2 text-xs bg-orange-200 px-2 py-1 rounded">
                          {location.state.productType}
                        </span>
                      )}
                    </p>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your.email@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Message
                    {location.state?.prefilledMessage && (
                      <span className="text-orange-600 text-xs ml-2">(Pre-filled with bike details)</span>
                    )}
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell us about your inquiry, preferred bike models, or any questions you have..."
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 outline-none resize-none"
                    rows="8"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>

                {status && (
                  <div className={`p-4 rounded-lg flex items-center gap-3 ${
                    submitType === 'success' 
                      ? 'bg-green-50 border border-green-200 text-green-800' 
                      : 'bg-red-50 border border-red-200 text-red-800'
                  }`}>
                    {submitType === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    )}
                    <p className="text-sm font-medium">{status}</p>
                  </div>
                )}
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-black mb-4">Contact Information</h2>
                <p className="text-gray-600 text-lg">
                  Multiple ways to reach us. Choose what works best for you.
                </p>
              </div>

              <div className="grid gap-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="bg-orange-100 p-3 rounded-lg">
                        <div className="text-orange-600">
                          {info.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-black mb-2">{info.title}</h3>
                        <div className="space-y-1">
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-gray-700 font-medium">{detail}</p>
                          ))}
                        </div>
                        <p className="text-gray-500 text-sm mt-2">{info.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ContactUs;