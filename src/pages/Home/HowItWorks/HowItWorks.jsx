import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";

const HowItWorks = () => {
  const steps = [
    {
      title: "Booking Pick & Drop",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      title: "Cash On Delivery",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      title: "Delivery Hub",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      title: "Booking SME & Corporate",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
      titleClass: "font-bold text-xl text-secondary",
      descClass: "font-medium text-desc",
    },
  ];

  return (
    <div className="my-10 md:my-16 lg:my-24 space-y-6 md:space-y-8 text-center">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
        How It Works
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {steps.map((step, i) => (
          <div
            key={i}
            className="p-6 md:p-8 bg-white rounded-xl shadow-md hover:shadow-xl 
                       transition-all duration-300 transform hover:-translate-y-2
                       hover:bg-primary hover:text-secondary text-left"
          >
            <CiDeliveryTruck className="text-4xl md:text-5xl lg:text-6xl text-secondary mb-4" />

            <div className="space-y-2">
              <h3
                className={`${
                  step.titleClass || "text-lg md:text-xl font-semibold"
                }`}
              >
                {step.title}
              </h3>

              <p
                className={`${
                  step.descClass || "text-base-content/70 text-sm md:text-base"
                }`}
              >
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
