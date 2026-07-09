import { Swiper, SwiperSlide } from "swiper/react";

import {
  EffectCoverflow,
  Pagination,
  Keyboard,
  Autoplay,
} from "swiper/modules";

import { MapPin } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./ProjectSlider.css";

import { slides } from "./data";

export default function ProjectSlider() {
  return (
    <section className="slider-section">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        loop={true}
        spaceBetween={30}
        modules={[EffectCoverflow, Pagination, Keyboard, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        initialSlide={0}
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={`${slide.title}-${index}`}
            className="card"
            style={{
              backgroundImage: `
        linear-gradient(to top, #0f2027, #203a4300, #2c536400),
        url(${slide.image})
      `,
            }}
          >
            <span className="category" style={{ background: slide.color }}>
              {slide.category}
            </span>

            <div className="content">
              <h2>{slide.title}</h2>
              <p>
                <MapPin size={18} />
                {slide.location}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
