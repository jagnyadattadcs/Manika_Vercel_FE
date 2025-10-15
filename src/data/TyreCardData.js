import tyre1 from "../assets/tyre1.jpg";
import tyre2 from "../assets/tyre2.webp";
import tyre3 from "../assets/tyre3.jpg";


const tyreData = [
  {
    id: 1,
    name: "Michelin Pilot Sport 4",
    brand: "Michelin",
    size: "205/55R16",
    price: "₹12,500",
    rating: 4.7,
    reviews: 324,
    image: tyre1,
    category: "Performance",
    warranty: "5 years"
  },
  {
    id: 2,
    name: "Bridgestone Turanza T005",
    brand: "Bridgestone",
    size: "195/65R15",
    price: "₹8,750",
    rating: 4.4,
    reviews: 218,
    image:tyre2,
    category: "Touring",
    warranty: "4 years"
  },
  {
    id: 3,
    name: "Goodyear Assurance TripleMax 2",
    brand: "Goodyear",
    size: "185/60R14",
    price: "₹6,200",
    rating: 4.2,
    reviews: 156,
    image:tyre3,
    category: "All-Season",
    warranty: "3 years"
  },
  {
    id: 4,
    name: "Continental ContiPremiumContact 6",
    brand: "Continental",
    size: "225/45R17",
    price: "₹15,800",
    rating: 4.6,
    reviews: 289,
    image: tyre1,
    category: "Premium",
    warranty: "5 years"
  },
  {
    id: 5,
    name: "MRF Wanderer Street",
    brand: "MRF",
    size: "175/70R13",
    price: "₹4,900",
    rating: 4.0,
    reviews: 92,
    image: tyre3,
    category: "Budget",
    warranty: "2 years"
  },
  {
    id: 6,
    name: "Apollo Alnac 4G",
    brand: "Apollo",
    size: "215/60R16",
    price: "₹7,300",
    rating: 4.1,
    reviews: 167,
    image:tyre1,
    category: "All-Season",
    warranty: "3 years"
  },
  {
    id: 7,
    name: "Pirelli Cinturato P7",
    brand: "Pirelli",
    size: "235/50R18",
    price: "₹18,200",
    rating: 4.8,
    reviews: 401,
    image: tyre2,
    category: "Premium",
    warranty: "5 years"
  },
  {
    id: 8,
    name: "JK Tyre Ultima NXT",
    brand: "JK Tyre",
    size: "165/80R14",
    price: "₹5,400",
    rating: 3.9,
    reviews: 73,
    image: tyre3,
    category: "Economy",
    warranty: "2 years"
  },
  {
    id: 9,
    name: "Yokohama BluEarth-GT AE51",
    brand: "Yokohama",
    size: "245/40R19",
    price: "₹22,500",
    rating: 4.5,
    reviews: 198,
    image: tyre1,
    category: "Ultra High Performance",
    warranty: "4 years"
  },
  {
    id: 10,
    name: "CEAT SecuraDrive",
    brand: "CEAT",
    size: "155/65R13",
    price: "₹3,800",
    rating: 3.8,
    reviews: 112,
    image:tyre2,
    category: "Budget",
    warranty: "2 years"
  },
  {
    id: 11,
    name: "Falken Ziex ZE950",
    brand: "Falken",
    size: "255/35R20",
    price: "₹28,900",
    rating: 4.4,
    reviews: 145,
    image:tyre1,
    category: "Ultra High Performance",
    warranty: "4 years"
  },
  {
    id: 12,
    name: "TVS Eurogrip Protorq Extreme",
    brand: "TVS",
    size: "195/55R15",
    price: "₹6,900",
    rating: 4.0,
    reviews: 87,
    image: tyre2,
    category: "Performance",
    warranty: "3 years"
  }
];

// Function to get tyres by category
const getTyresByCategory = (category) => {
  return tyreData.filter(tyre => tyre.category.toLowerCase() === category.toLowerCase());
};

// Function to get tyres by price range
const getTyresByPriceRange = (minPrice, maxPrice) => {
  return tyreData.filter(tyre => {
    const price = parseInt(tyre.price.replace(/[₹,]/g, ''));
    return price >= minPrice && price <= maxPrice;
  });
};

// Function to get tyres by brand
const getTyresByBrand = (brand) => {
  return tyreData.filter(tyre => tyre.brand.toLowerCase() === brand.toLowerCase());
};

// Function to get tyres by size
const getTyresBySize = (size) => {
  return tyreData.filter(tyre => tyre.size === size);
};

export { tyreData, getTyresByCategory, getTyresByPriceRange, getTyresByBrand, getTyresBySize };