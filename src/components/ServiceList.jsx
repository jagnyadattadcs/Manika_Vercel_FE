import React from "react";
import { Wrench, Droplets, ShieldCheck, Gauge } from "lucide-react";

const services = [
  {
    id: 1,
    name: "Bike Servicing",
    description: "Complete engine oil change, filter cleaning, and performance check.",
    icon: <Wrench className="w-8 h-8 text-blue-600" />,
  },
  {
    id: 2,
    name: "Oil Change",
    description: "Premium-grade oil replacement for smoother and longer engine life.",
    icon: <Droplets className="w-8 h-8 text-blue-600" />,
  },
  {
    id: 3,
    name: "Insurance Renewal",
    description: "Quick and easy bike insurance renewal with trusted partners.",
    icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
  },
  {
    id: 4,
    name: "Free Checkup",
    description: "Basic inspection and health checkup of your bike at zero cost.",
    icon: <Gauge className="w-8 h-8 text-blue-600" />,
  },
];

const ServiceList = () => {
  return (
    <div className="bg-square-grid py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 text-center border border-gray-100"
            >
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                {service.name}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceList;
