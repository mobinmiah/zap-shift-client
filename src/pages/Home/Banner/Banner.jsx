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
    <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
      <Link
        to="/dashboard/my-parcels"
        className="btn bg-primary hover:bg-primary/90 text-secondary rounded-full 
                        btn-xs sm:btn-sm md:btn-md lg:btn-lg 
                        flex items-center gap-1 sm:gap-2 border-none
                        shadow-lg hover:shadow-xl transition-all duration-200
                        font-semibold"
      >
        Track Your Parcel
        <FaArrowCircleRight className="hidden lg:block text-lg -rotate-45 transition-transform group-hover:rotate-0" />
      </Link>

      <Link
        to="/rider"
        className="btn bg-white/90 hover:bg-white border-2 border-primary text-secondary rounded-full 
                  btn-xs sm:btn-sm md:btn-md lg:btn-lg
                  shadow-lg hover:shadow-xl transition-all duration-200
                  font-semibold backdrop-blur-sm"
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
        <div key={index} className="relative overflow-hidden">
          {/* fully responsive image */}
          <img
            src={slide.img}
            alt={`Banner ${index + 1}`}
            className="w-full object-cover max-h-[300px] sm:max-h-[400px] md:max-h-[500px] lg:max-h-[650px] transition-transform duration-700 hover:scale-105"
          />

          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>

          {/* button container */}
          <div
            className={`absolute left-4 sm:left-8 md:left-12 lg:left-20 bottom-2.5
            ${slide.bottom} 
            flex items-center z-10`}
          >
            {bannerBtns}
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default ReactBanner;
