import React from 'react';
import { Star } from 'lucide-react';

// Individual Testimonial Card Component
const TestimonialCard = ({ testimonial }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-full flex flex-col">
      {/* Star Rating */}
      <div className="flex gap-1 mb-6">
        {renderStars(testimonial.rating)}
      </div>
      
      {/* Review Text */}
      <p className="text-gray-700 text-lg leading-relaxed mb-8 flex-grow">
        {testimonial.review}
      </p>
      
      {/* Customer Info */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 text-lg">
            {testimonial.name}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;