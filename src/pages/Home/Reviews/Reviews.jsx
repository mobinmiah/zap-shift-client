import React, { use } from "react";
import merchantIcon from "../../../assets/location-merchant.png";
// import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
import ReviewCard from "./ReviewCard";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import "./styles.css";

// import required modules
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);
  // console.log(reviews);
  return (
    <div className="container flex flex-col items-center gap-10">
      <img className="max-w-2xs" src={merchantIcon} alt="" />
      <div className="space-y-6 max-w-3xl mx-3">
        <h2>What our customers are sayings</h2>
        <p className="text-center">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>
      <div>
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{
            delay: 1000,
          }}
          
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper max-w-max lg:max-w-7xl"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id} className="!w-[280px]">
              <div className="py-10 flex justify-center">
                <ReviewCard review={review} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Reviews;
