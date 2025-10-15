import bike1 from "../assets/bike1.jpg"
import bike2 from "../assets/bike2.jpg"
import bike3 from "../assets/bike3.avif"


export const bikeData = [
  {
    image: bike1,
    name: 'Royal Enfield',
    priceRange: '₹1200 - ₹1500',
    availability: 'Available',
    kmPerDay: 200,
    extraKmRate: 5,
    extraHrRate: 100, 
    fuelType: 'Petrol',
    transmission: 'Manual',
    capacity: 2,
    onOfferClick: () => {
      console.log('Offer  requested.');
    },
  },
  {
    image: bike2,
    name: 'Royal Enfield',
    priceRange: '₹900 - ₹1100',
    availability: 'Available',
    kmPerDay: 150,
    extraKmRate: 4, 
    extraHrRate: 80, 
    fuelType: 'Petrol',
    transmission: 'Manual',
    capacity: 2,
    onOfferClick: () => {
      console.log('Offer details requested.');
    },
  },
  {
    image: bike3,
    name: 'Royal Enfield',
    priceRange: '₹500 - ₹700',
    availability: 'Available Soon',
    kmPerDay: 100,
    extraKmRate: 3, 
    extraHrRate: 50, 
    fuelType: 'Petrol',
    transmission: 'Automatic',
    capacity: 2,
    onOfferClick: () => {
      console.log('Offer details  requested.');
    },
  },
];