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
    <div className="my-10 lg:my-24 space-y-4 lg:space-y-8">
      <h2>How It Works</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <div
            key={i}
            className="p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 hover:bg-primary"
          >
            <CiDeliveryTruck className="text-3xl text-secondary" />

            <div className="mt-6 space-y-2">
              <h3 className={step.titleClass || "text-xl font-semibold"}>
                {step.title}
              </h3>

              <p className={step.descClass || "text-base-content/70"}>
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
