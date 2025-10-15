import React from "react";
import tyre from "../assets/tyree.png";

const ShowcaseSection = () => {
  return (
    <div className="bg-white py-1 px-4 mb-12">
      <div className="max-w-7xl mx-auto">
        {/* Hero Image Container */}
        <div className="relative rounded-xl overflow-hidden mb-8">
          <img 
            src={tyre}
            alt="MRF Tires Showcase - MOGRIP METEOR, REVZ-C1, NYLOGRIP EZEERIDE"
            className="w-full h-80 object-cover"
          />
        </div>
        
        {/* Description Text */}
        <div className="text-gray-600 leading-relaxed space-y-4">
          <p>
            At our showroom, we bring you the best of both worlds — powerful Bajaj bikes and the iconic Royal Enfield Bullet series, 
            built for performance, style, and reliability.
            Whether you're a city commuter or a long-distance rider, 
            we have the perfect bike to match your needs. All our bikes come fitted with MRF tires, trusted across India for their strong grip,
            excellent durability, and smooth performance on 
            every terrain. We not only sell two-wheelers, but also provide expert maintenance, servicing, 
            and genuine spare parts support. Our team is committed to delivering a smooth buying experience, 
            on-road assistance, and after-sales care. We also offer affordable finance options to help you ride home worry-free.
            Choose us for a complete biking solution — from rugged Royal Enfields to sporty 
            Bajaj models — all equipped with the unmatched quality of MRF tires. Step into our showroom and experience performance, safety, and trust under one roof.
          </p>
          <p>
            At our showroom, we bring you the best of both worlds — powerful Bajaj 
            bikes and the iconic Royal Enfield Bullet series, built for performance, style, 
            and reliability. Whether you're a city commuter or a long-distance rider, 
            we have the perfect bike to match your needs. All our bikes come fitted with MRF tires, 
            trusted across India for their strong grip, excellent durability, and smooth performance 
            on every terrain. We not only sell two-wheelers, but also provide expert maintenance, servicing, 
            and genuine spare parts support. Our team is committed to delivering a smooth buying experience, 
            on-road assistance, and after-sales care. We also offer affordable finance options to help you ride home worry-free.
            Choose us for a complete biking solution — from rugged Royal Enfields to sporty Bajaj models — all equipped with the unmatched quality of MRF tires. 
            Step into our showroom and experience performance, safety, and trust under one roof.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseSection;