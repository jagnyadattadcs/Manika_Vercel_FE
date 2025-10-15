import React from "react";

const TyreCard = ({ name, price, image }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
      <img
        src={image ||`/images/tyres/${image}`}
        alt={name}
        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute bottom-0 w-full bg-black/60 text-white p-4">
        <h3 className="text-xl font-bold">{name}</h3>
      </div>
    </div>
  );
};

export default TyreCard;
