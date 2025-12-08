import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner2.png";
import bannerImg3 from "../../../assets/banner/banner3.png";

import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from "react-router";

const ReactBanner = () => {
  const bannerBtns = (
    <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4">
      <Link
        to="/dashboard/my-parcels"
        className="btn bg-primary outline-primary text-secondary rounded-full 
                        btn-xs sm:btn-sm md:btn-md lg:btn-lg 
                        flex items-center gap-1 sm:gap-2"
      >
        Track Your Parcel
        <FaArrowCircleRight className="hidden lg:block text-2xl -rotate-45" />
      </Link>

      <Link
        to="/rider"
        className="btn bg-transparent outline-primary text-secondary rounded-full 
                  btn-xs sm:btn-sm md:btn-md lg:btn-lg"
      >
        Be a Rider
      </Link>
    </div>
  );

  const slides = [
    {
      img: bannerImg1,
      bottom: "bottom-4 sm:bottom-8 md:bottom-12 lg:bottom-16",
    },
    {
      img: bannerImg2,
      bottom: "bottom-4 sm:bottom-9 md:bottom-14 lg:bottom-20",
    },
    {
      img: bannerImg3,
      bottom: "bottom-6 sm:bottom-12 md:bottom-16 lg:bottom-24",
    },
  ];

  return (
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      swipeable
      emulateTouch
      className="mt-3 md:mt-6 lg:mt-10"
    >
      {slides.map((slide, index) => (
        <div key={index} className="relative">
          {/* fully responsive image */}
          <img
            src={slide.img}
            alt={`Banner ${index + 1}`}
            className="w-full object-cover max-h-[300px] sm:max-h-[400px] md:max-h-[500px] lg:max-h-[650px]"
          />

          {/* button container */}
          <div
            className={`absolute left-4 sm:left-8 md:left-12 lg:left-20 bottom-2.5
            ${slide.bottom} 
            flex items-center`}
          >
            {bannerBtns}
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default ReactBanner;
