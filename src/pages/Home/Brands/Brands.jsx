import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import amazon from "../../../assets/brands/amazon.png";
import amazon_vector from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import star_people from "../../../assets/brands/start_people.png";
import { Autoplay } from "swiper/modules";

const Brands = () => {
  const brandLogos = [
    amazon,
    amazon_vector,
    casio,
    moonstar,
    randstad,
    star,
    star_people,
  ];
  return (
    <div className="mx-4">
      <h2>We've helped thousands of sales teams</h2>
      <div>
        <Swiper
          slidesPerView={4}
          centeredSlides={true}
          spaceBetween={30}
          grabCursor={true}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper border-b border-dashed border-secondary"
        >
          {brandLogos.map((logo, index) => (
            <SwiperSlide className="py-10" key={index}>
              <img src={logo} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Brands;
