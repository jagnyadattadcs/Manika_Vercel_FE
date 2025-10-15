import React, { useEffect, useState } from "react";
import BikeCard from "./ui/BikeCard";

export default function BikeList({ limit = 6 }) {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        // Fetch all bikes from API and slice client-side (limit prop controls how many to show)
        const res = await fetch(`${import.meta.env.VITE_API_URL}/bikes`);
        const data = await res.json();
        setBikes(data);
      } catch (err) {
        console.error("Error fetching bikes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBikes();
  }, []);

  if (loading) return <p>Loading bikes...</p>;

  // ensure we only render up to `limit`
  const bikesToRender = (bikes || []).slice(0, limit);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {bikesToRender.map((bike) => (
        <BikeCard
          key={bike._id}
          name={bike.name}
          price={bike.price}
          image={bike.image}
        />
      ))}
    </div>
  );
}
