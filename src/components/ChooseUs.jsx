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
      icon: Users,
      title: "Exceptional Customer Service",
      description: "Our dedicated team of motorcycle enthusiasts provides personalized recommendations and comprehensive support throughout your entire rental experience with unmatched attention to detail.",
      stats: "98% Satisfaction",
      highlight: "Expert Staff",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      shadowColor: "shadow-blue-500/30"
    },
    {
      icon: DollarSign,
      title: "Competitive Pricing",
      description: "Transparent pricing with absolutely no hidden fees, flexible rental packages, and exclusive discounts for extended rentals and returning customers who choose quality.",
      stats: "Best Rates",
      highlight: "No Hidden Fees",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      shadowColor: "shadow-green-500/30"
    },
    {
      icon: Shield,
      title: "Safety & Reliability",
      description: "All motorcycles undergo rigorous safety inspections with comprehensive insurance coverage and 24/7 roadside assistance for complete peace of mind on every journey.",
      stats: "100% Insured",
      highlight: "Safety First",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      shadowColor: "shadow-red-500/30"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer support and emergency assistance ensuring you're never alone on your journey, with instant response times day or night, anywhere you ride.",
      stats: "Always Available",
      highlight: "Instant Response",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      shadowColor: "shadow-purple-500/30"
    }
  ];

  return (
    <section 
      id="choose-us-section"
      className="relative bg-white py-15 px-6 overflow-hidden">

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Premium Header */}
        <div className={`text-center mb-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center mb-8 bg-gradient-to-r from-red-100 via-orange-50 to-red-100 px-10 py-4 rounded-full shadow-2xl border border-red-200/50 backdrop-blur-sm">
            <Sparkles className="w-6 h-6 text-red-600 mr-3 animate-pulse" />
            <span className="text-red-700 font-black text-base tracking-widest uppercase">Why Choose Us</span>
            <Sparkles className="w-6 h-6 text-red-600 ml-3 animate-pulse" />
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 via-red-600 to-gray-900 bg-clip-text text-transparent leading-tight mb-8 tracking-tight">
            Unmatched Quality &<br />
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Premium Excellence</span>
          </h2>
          
          <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
            Experience the pinnacle of motorcycle rental service where quality, reliability, and customer satisfaction converge to create extraordinary journeys.
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

        {/* Premium CTA Section */}
        <div className={`text-center transition-all duration-1000 ${ isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-gray-900 via-red-600 to-gray-900 rounded-3xl p-12 shadow-2xl border border-red-200/20 backdrop-blur-sm">
            <h3 className="text-4xl font-bold text-white mb-6">
              Ready to Experience Excellence?
            </h3>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have chosen quality, reliability, and premium service.
            </p>
            
            <button className="group inline-flex items-center bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-16 py-5 rounded-full font-bold text-xl shadow-2xl shadow-red-500/40 transition-all duration-300 hover:scale-105 hover:shadow-red-500/60 transform">
              Start Your Journey
              <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
            
            {/* Trust Indicators */}
            <div className="flex justify-center items-center gap-8 mt-8 text-gray-300">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-current mr-2" />
                <span className="font-semibold">5.0 Rating</span>
              </div>
              <div className="w-px h-6 bg-gray-600"></div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                <span className="font-semibold">1000+ Happy Customers</span>
              </div>
              <div className="w-px h-6 bg-gray-600"></div>
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-blue-400 mr-2" />
                <span className="font-semibold">100% Secure</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}