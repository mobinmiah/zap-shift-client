import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner2.png";
import bannerImg3 from "../../../assets/banner/banner3.png";

import { FaArrowCircleRight } from "react-icons/fa";

const ReactBanner = () => {
  const bannerBtns = (
    <div className="flex items-center gap-0.5 md:gap-2 lg:gap-4">
      <button className="btn bg-primary outline-primary text-secondary rounded-full btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl flex items-center gap-2">
        Track Your Parcel
        <FaArrowCircleRight className="hidden lg:block text-2xl -rotate-45" />
      </button>

      <button className="btn bg-transparent outline-primary text-secondary rounded-full btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">
        Be a Rider
      </button>
    </div>
  );

  const slides = [
    { img: bannerImg1, bottom: "bottom-5 md:bottom-9 lg:bottom-14" },
    { img: bannerImg2, bottom: "bottom-5 md:bottom-10 lg:bottom-20" },
    { img: bannerImg3, bottom: "bottom-7 md:bottom-14 lg:bottom-24" },
  ];

  return (
    <Carousel autoPlay infiniteLoop showThumbs={false} className="mt-3 lg:mt-8">
      {slides.map((slide, i) => (
        <div key={i} className="relative">
          <img src={slide.img} alt={`Banner ${i + 1}`} />

          <span
            className={`absolute left-6 md:left-12 lg:left-20 ${slide.bottom}`}
          >
            {bannerBtns}
          </span>
        </div>
      ))}
    </Carousel>
  );
};

export default ReactBanner;
