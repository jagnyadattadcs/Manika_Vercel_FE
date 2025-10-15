import React from "react";

const BikeCard = ({ name, price, image }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
      <img
        src={ image[0]||`/images/bikes/${image[0]}`}
        alt={name}
        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute bottom-0 w-full bg-black/60 text-white p-4">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-sm">{price}</p>
      </div>
    </div>
  );
};

export default BikeCard;
