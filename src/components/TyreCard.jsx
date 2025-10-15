import React from "react";
import {
  Edit,
  Trash2,
} from "lucide-react";

const TyreCard = ({ tyre, onCheckOffers, onEdit, onDelete, isAdmin }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
      {/* Admin Actions Overlay */}
      {isAdmin && (
        <div className="absolute top-2 right-2 flex gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(tyre);
            }}
            className="bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700 transition-colors shadow-lg"
            title="Edit Tyre"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(tyre);
            }}
            className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors shadow-lg"
            title="Delete Tyre"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Tyre Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-slate-200 flex items-center justify-center">
        <img
          src={
            tyre.images && tyre.images.length > 0
              ? `${tyre.images[0]}`
              : `/images/tyres/${tyre.images[0]}`
          }
          alt={`${tyre.brand} ${tyre.model}` || "Tyre Image"}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "/api/placeholder/400/300";
          }}
        />
      </div>

      {/* Tyre Details */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-lg mb-2">
          {tyre.brand} {tyre.model}
        </h3>

        {/* Tyre Specifications */}
        <div className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Size: </span>
          {tyre.size || "N/A"}
        </div>

        <div className="text-lg font-bold text-gray-900 mb-2">{tyre.price}</div>

        {tyre.originalPrice && tyre.originalPrice !== tyre.price && (
          <div className="text-sm text-gray-500 line-through mb-1">
            {tyre.originalPrice}
          </div>
        )}

        {tyre.discount && (
          <div className="text-sm text-green-600 font-medium mb-2">
            {tyre.discount}
          </div>
        )}

        {/* Additional Tyre Info */}
        {tyre.type && (
          <div className="text-xs text-gray-500 mb-2">Type: {tyre.type}</div>
        )}

        {/* Check Offers Button */}
        <button
          onClick={() => onCheckOffers(tyre)}
          className="w-full text-orange-600 font-medium text-sm py-2 px-4 border border-orange-600 rounded hover:bg-orange-50 transition-colors duration-200"
        >
          Check Offers
        </button>
      </div>
    </div>
  );
};

export default TyreCard;