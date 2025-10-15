import React, { useState, useEffect } from 'react';
import { 
  Users, 
  DollarSign, 
  Shield, 
  Clock,
  ArrowRight,
  Star,
  CheckCircle,
  Sparkles
} from 'lucide-react';

export default function ChooseUs() {
  const [activeFeature, setActiveFeature] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('choose-us-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Sparkles,
      title: "Premium Bike Selection",
      description: "Choose from the latest models, classic favorites, and exclusive bikes. Every bike is showroom-ready and maintained to perfection.",
      stats: "Top Brands",
      highlight: "Showroom Quality",
      color: "from-red-500 to-orange-500",
      bgColor: "bg-orange-50",
      shadowColor: "shadow-orange-500/30"
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description: "Our passionate bike experts help you find the perfect ride, explain features, and offer personalized advice for every enthusiast.",
      stats: "5-Star Service",
      highlight: "Bike Gurus",
      color: "from-blue-500 to-purple-500",
      bgColor: "bg-blue-50",
      shadowColor: "shadow-blue-500/30"
    },
    {
      icon: Star,
      title: "Test Ride Experience",
      description: "Enjoy a test ride before you buy. Feel the thrill, comfort, and style of your chosen bike in a safe, showroom environment.",
      stats: "100+ Test Rides",
      highlight: "Feel the Thrill",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      shadowColor: "shadow-green-500/30"
    },
    {
      icon: Shield,
      title: "After-Sales Support",
      description: "Comprehensive warranty, genuine parts, and dedicated service team. Your bike journey continues with our reliable support.",
      stats: "Trusted Service",
      highlight: "Warranty & Care",
      color: "from-gray-700 to-gray-900",
      bgColor: "bg-gray-100",
      shadowColor: "shadow-gray-500/30"
    }
  ];

  return (
    <section 
      id="choose-us-section"
      className="relative bg-white py-15 px-6 overflow-hidden">

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Showroom Header */}
        <div className={`text-center mb-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center mb-8 bg-gradient-to-r from-orange-100 via-red-50 to-orange-100 px-10 py-4 rounded-full shadow-2xl border border-orange-200/50 backdrop-blur-sm">
            <Sparkles className="w-6 h-6 text-orange-500 mr-3 animate-pulse" />
            <span className="text-orange-700 font-black text-base tracking-widest uppercase">Why Manika Automobile?</span>
            <Sparkles className="w-6 h-6 text-orange-500 ml-3 animate-pulse" />
          </div>
          <h2 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 via-orange-500 to-gray-900 bg-clip-text text-transparent leading-tight mb-8 tracking-tight">
            The Ultimate Bike<br />
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Showroom Experience</span>
          </h2>
          <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
            Discover the best bikes, expert advice, and a passion for riding—all under one roof. Your journey starts here!
          </p>
        </div>

        {/* Premium 4-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`group cursor-pointer transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <div className={`relative h-full p-8 rounded-3xl transition-all duration-500 transform ${
                activeFeature === index 
                  ? 'bg-white shadow-2xl scale-105 -translate-y-2' 
                  : 'bg-white/70 hover:bg-white/90 shadow-lg hover:shadow-xl'
              } backdrop-blur-sm border border-white/50`}>
                
                {/* Floating Icon */}
                <div className="relative mb-8">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 transform ${
                    activeFeature === index 
                      ? `bg-gradient-to-br ${feature.color} shadow-2xl ${feature.shadowColor} scale-110` 
                      : `${feature.bgColor} group-hover:scale-105`
                  }`}>
                    <feature.icon className={`w-10 h-10 transition-all duration-300 ${
                      activeFeature === index ? 'text-white' : 'text-gray-700'
                    }`} />
                  </div>
                  
                  {/* Highlight Badge */}
                  <div className={`absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
                    activeFeature === index 
                      ? 'bg-red-500 text-white shadow-lg' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {feature.highlight}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 leading-tight group-hover:text-red-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed text-base">
                    {feature.description}
                  </p>
                  
                  {/* Stats Badge */}
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center text-sm font-bold transition-all duration-300 ${
                      activeFeature === index ? 'text-red-600' : 'text-gray-700'
                    }`}>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      {feature.stats}
                    </div>
                    
                    {/* Premium Star Rating */}
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 transition-all duration-300 ${
                          activeFeature === index ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hover Gradient Overlay */}
                <div className={`absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 pointer-events-none ${
                  activeFeature === index ? 'opacity-5' : ''
                } bg-gradient-to-br ${feature.color}`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Showroom CTA Section */}
        <div className={`text-center transition-all duration-1000 ${ isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-gray-900 via-orange-500 to-gray-900 rounded-3xl p-12 shadow-2xl border border-orange-200/20 backdrop-blur-sm">
            <h3 className="text-4xl font-bold text-white mb-6">
              Ready to Ride Your Dream Bike?
            </h3>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Join hundreds of happy riders who found their perfect bike at Manika. Experience the difference today!
            </p>
            <button className="group inline-flex items-center bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-16 py-5 rounded-full font-bold text-xl shadow-2xl shadow-orange-500/40 transition-all duration-300 hover:scale-105 hover:shadow-orange-500/60 transform">
              Book a Test Ride
              <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
            {/* Trust Indicators */}
            <div className="flex justify-center items-center gap-8 mt-8 text-gray-300">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-current mr-2" />
                <span className="font-semibold">Top Showroom</span>
              </div>
              <div className="w-px h-6 bg-gray-600"></div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                <span className="font-semibold">500+ Happy Riders</span>
              </div>
              <div className="w-px h-6 bg-gray-600"></div>
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-blue-400 mr-2" />
                <span className="font-semibold">Genuine Warranty</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}