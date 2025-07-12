import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import bougies from "../assets/bougies.jpeg";
import frosty from "../assets/frosty.jpeg";
import paraiso from "../assets/paraiso.jpeg";
import sharpay from "../assets/sharpays.jpeg";

const images = [
  { src: bougies, alt: "Bougies" },
  { src: frosty, alt: "Frosty Bites" },
  { src: paraiso, alt: "Paraíso de Dios" },
  { src: sharpay, alt: "Sharpay Boutique" },
];

const CarouselCard = () => {
  return (
    <div className="carousel-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="carousel-slide-card">
              <img src={img.src} alt={img.alt} className="carousel-image" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarouselCard;
