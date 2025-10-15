import Tyre1 from "../assets/tyre1.jpg";
import Tyre2 from "../assets/tyre2.webp";
import Tyre3 from "../assets/tyre3.jpg";



export const tyreData = [
  {
    name: "MRF ZLX 205/55 R16",
    image: Tyre1,
    pricing: {
      "24-hrs": "₹8500",
      "12-hrs": "₹6200", 
      "06-hrs": "₹4800"
    },
    specs: {
      kilometer: "Size: 205/55 R16",
      extraKm: "Load: 91V",
      extraHr: "Tubeless"
    },
    features: {
      fuel: "All Season",
      capacity: "Passenger Car",
      transmission: "Radial",
      tank: "5 Year Warranty"
    }
  },
  {
    name: "CEAT SecuraDrive 185/65 R14",
    image: Tyre2,
    pricing: {
      "24-hrs": "₹5200",
      "12-hrs": "₹3800",
      "06-hrs": "₹2900"
    },
    specs: {
      kilometer: "Size: 185/65 R14",
      extraKm: "Load: 86H", 
      extraHr: "Tubeless"
    },
    features: {
      fuel: "All Weather",
      capacity: "Compact Car",
      transmission: "Radial",
      tank: "4 Year Warranty"
    }
  },
  {
    name: "Apollo Amazer 4G 175/70 R13",
    image:  Tyre3,
    pricing: {
      "24-hrs": "₹4100",
      "12-hrs": "₹3200",
      "06-hrs": "₹2500"
    },
    specs: {
      kilometer: "Size: 175/70 R13",
      extraKm: "Load: 82T",
      extraHr: "Tubeless"
    },
    features: {
      fuel: "Economy",
      capacity: "Small Car",
      transmission: "Radial",
      tank: "3 Year Warranty"
    }
  }
]; 