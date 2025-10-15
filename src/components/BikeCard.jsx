import React from 'react';
import {  Edit, Trash2 } from 'lucide-react';

const BikeCard = ({ bike, onCheckOffers, onEdit, onDelete, isAdmin }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 bg-gradient-to-br from-orange-100 to-orange-100 flex items-center justify-center">
        <img 
          src={bike.image?.[0] || `/images/bikes/${bike.image[0]}`}
          alt={bike.name || "Bike Image"}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "/api/placeholder/400/300"; 
          }}
        />
        
        {/* Admin Actions Overlay */}
        {isAdmin && (
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(bike);
              }}
              className="bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700 transition-colors shadow-lg"
              title="Edit Bike"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(bike);
              }}
              className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors shadow-lg"
              title="Delete Bike"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
       
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-lg mb-2">{bike.name}</h3>
                 
        <div className="text-lg font-bold text-gray-900 mb-2">
          {bike.finalPrice}
        </div>

        {bike.priceRange !== bike.finalPrice && (
          <div className="text-sm text-gray-500 line-through mb-1">
            {bike.priceRange}
          </div>
        )}

        {bike.discount && (
          <div className="text-sm text-green-600 font-medium mb-2">
            {bike.discount}
          </div>
        )}

        <div className="text-sm text-gray-600 mb-3">
          EMI from {bike.emiStartingFrom}
        </div>
                 
        <button 
          onClick={() => onCheckOffers(bike)}
          className="w-full text-orange-600 font-medium text-sm py-2 px-4 border border-orange-600 rounded hover:bg-orange-50 transition-colors duration-200">
          Check Offers
        </button>
      </div>
    </div>
  );
};

export default BikeCard;