import React from "react";
import serviceImg from "../../../assets/service.png";

const Services = () => {
  const services = [
    {
      title: "Express & Standard Delivery",
      desc: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours.",
    },
    {
      title: "Nationwide Delivery",
      desc: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
      highlight: true,
    },
    {
      title: "Fulfillment Solution",
      desc: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    },
    {
      title: "Cash on Home Delivery",
      desc: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    },
    {
      title: "Corporate Service / Contract In Logistics",
      desc: "Customized corporate services which includes warehouse and inventory management support.",
    },
    {
      title: "Parcel Return",
      desc: "Through our reverse logistics facility we allow customers to return or exchange products with online merchants.",
    },
  ];

  return (
    <section className="py-5 lg:py-20">
      <div className="bg-secondary rounded-2xl p-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className={`text-base-100!`}>Our Services</h2>
          <p className={`text-base-100!`}>
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className={`p-4 lg:p-8 rounded-2xl shadow-lg bg-base-100 hover:shadow-xl transition transform hover:-translate-y-1 hover:bg-primary `}
            >
              {/* Icon Circle */}
              <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-6">
                {/* <CiDeliveryTruck className="text-3xl text-red-500" /> */}
                <img src={serviceImg} alt="" />
              </div>

              {/* Title */}
              <h3>{service.title}</h3>

              {/* Description */}
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
