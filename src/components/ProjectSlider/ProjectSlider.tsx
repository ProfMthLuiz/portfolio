import { Swiper, SwiperSlide } from "swiper/react";

import {
  EffectCoverflow,
  Pagination,
  Keyboard,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./ProjectSlider.css";

import { FaReact, FaLaravel, FaNodeJs } from "react-icons/fa6";

import GlassCard from "../../GlassCard";

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
        breakpoints={{
          // Mobile pequeno
          320: {
            slidesPerView: 1.5,
          },

          // Mobile / tablet pequeno
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },

          // Desktop
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        <SwiperSlide>
          <GlassCard
            title="Frontend"
            description="React • TypeScript • Next.js"
            icon={<FaReact />}
            color="mint"
            href="https://github.com/ProfMthLuiz"
          />
        </SwiperSlide>

        <SwiperSlide>
          <GlassCard
            title="Backend"
            description="Laravel • PHP • MySQL"
            icon={<FaLaravel />}
            color="violet"
            href="https://github.com/ProfMthLuiz"
          />
        </SwiperSlide>

        <SwiperSlide>
          <GlassCard
            title="Mobile"
            description="React Native"
            icon={<FaNodeJs />}
            color="ocean"
            href="https://github.com/ProfMthLuiz"
          />
        </SwiperSlide>

        <SwiperSlide>
          <GlassCard
            title="Frontend"
            description="React • TypeScript • Next.js"
            icon={<FaReact />}
            color="mint"
            href="https://github.com/ProfMthLuiz"
          />
        </SwiperSlide>

        <SwiperSlide>
          <GlassCard
            title="Backend"
            description="Laravel • PHP • MySQL"
            icon={<FaLaravel />}
            color="violet"
            href="https://github.com/ProfMthLuiz"
          />
        </SwiperSlide>

        <SwiperSlide>
          <GlassCard
            title="Backend"
            description="Laravel • PHP • MySQL"
            icon={<FaLaravel />}
            color="violet"
            href="https://github.com/ProfMthLuiz"
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
