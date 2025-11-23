import React from "react";

const About = () => {
  return (
    <div className="py-5 lg:py-20 px-10 lg:px-24 mt-10 bg-base-100 flex flex-col justify-center items-center rounded-2xl">
      <div className="mb-12">
        <h2>About Us</h2>
        <p>
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>
      <div className="border-t border-base-300 space-y-5 lg:space-y-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 items-center gap-8 my-12">
          <h4 className="!text-2xl !font-extrabold !text-secondary">Story</h4>
          <h4 className="!text-2xl !text-base-300">Success</h4>
          <h4 className="!text-2xl !text-base-300">Team & Others</h4>
          <h4 className="!text-2xl !text-base-300">Mission</h4>
        </div>
        <div>
          <p className="">
            We started with a simple promise — to make parcel delivery fast,
            reliable, and stress-free. Over the years, our commitment to
            real-time tracking, efficient logistics, and customer-first service
            has made us a trusted partner for thousands. Whether it's a personal
            gift or a time-sensitive business delivery, we ensure it reaches its
            destination — on time, every time.
          </p>
          <p>
            We started with a simple promise — to make parcel delivery fast,
            reliable, and stress-free. Over the years, our commitment to
            real-time tracking, efficient logistics, and customer-first service
            has made us a trusted partner for thousands. Whether it's a personal
            gift or a time-sensitive business delivery, we ensure it reaches its
            destination — on time, every time.
          </p>
          <p>
            We started with a simple promise — to make parcel delivery fast,
            reliable, and stress-free. Over the years, our commitment to
            real-time tracking, efficient logistics, and customer-first service
            has made us a trusted partner for thousands. Whether it's a personal
            gift or a time-sensitive business delivery, we ensure it reaches its
            destination — on time, every time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
