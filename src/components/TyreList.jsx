import React, { useState, useEffect } from "react";
import TyreCard from "./ui/TyreCard";

const TyreList = () => {
  const [tyres, setTyres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTyres = async () => {
      try {
        const res = await fetch("${import.meta.env.VITE_API_URL}/tyres/get/top3");
        const data = await res.json();
        setTyres(data);
      } catch (error) {
        console.error("Error fetching tyres:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTyres();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading tyres...</p>;
  }

  return (
    <section className="py-3 rounded-xl ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {tyres.map((tyre) => (
          <TyreCard
            key={tyre._id}
            name={`${tyre.brand} ${tyre.model}`}
            price={tyre.price}
            image={tyre.images[0]}
          />
        ))}
      </div>
    </section>
  );
};

export default TyreList;
