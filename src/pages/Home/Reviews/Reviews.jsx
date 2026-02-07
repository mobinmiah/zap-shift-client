import React from "react";
import merchantIcon from "../../../assets/location-merchant.png";
import ReviewCard from "./ReviewCard";
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// Modules
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../components/Loading/Loading";

const Reviews = () => {
  // const reviews = use(reviewsPromise);
  const axios = useAxios();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await fetch("/reviews.json");
      if (!res.ok) {
        throw new Error('Failed to fetch reviews');
      }
      return res.json();
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 flex flex-col items-center gap-10 overflow-hidden">
      Top Icon
      <img className="w-32 md:w-40" src={merchantIcon} alt="Merchant" />

      <div className="space-y-4 max-w-3xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold">
          What our customers are saying
        </h2>
        <p className="text-base md:text-lg">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve alignment, reduce pain, and strengthen your body with
          ease!
        </p>
      </div>

      <Swiper
        modules={[EffectCoverflow, Pagination, Autoplay]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        autoplay={{ delay: 2500 }}
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 20 },
          640: { slidesPerView: 1.4, spaceBetween: 30 },
          768: { slidesPerView: 2, spaceBetween: 40 },
          1024: { slidesPerView: 3, spaceBetween: 50 },
        }}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 120,
          modifier: 1.2,
          slideShadows: true,
        }}
        className="w-full max-w-7xl py-10"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id} className="flex justify-center">
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
