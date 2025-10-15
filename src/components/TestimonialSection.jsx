import React from 'react';
import TestimonialsList from './TestimonialList';
import { testimonialsData } from '../data/TestimonialData';

// Main Testimonials Component
const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-pink-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-orange-600 text-sm font-medium tracking-wider uppercase mb-4">
            TESTIMONIALS
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            What our customers are<br />
            saying about us
          </h2>
        </div>

        {/* Testimonials List */}
        <TestimonialsList testimonials={testimonialsData} />
      </div>
    </section>
  );
};

export default TestimonialsSection;