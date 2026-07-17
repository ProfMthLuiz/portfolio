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

import habitTracker from "../../assets/images/projects/habit_tracker.png";

import { FaReact, FaLaravel, FaNodeJs } from "react-icons/fa6";

import { SiTypescript } from "react-icons/si";

import GlassCard from "../GlassCard/GlassCard";

export default function ProjectSlider() {
  return (
    <section className="slider-section">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
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
          350: {
            slidesPerView: 1,
          },

          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },

          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },

          1600: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
      >
        <SwiperSlide>
          <GlassCard
            title="Frontend"
            description="React • TypeScript • Next.js"
            icons={[
              <FaReact key="react" />,
              <SiTypescript key="ts" />,
              <FaLaravel key="laravel" />,
            ]}
            color="mint"
            href="https://github.com/ProfMthLuiz"
            image="https://www.chromethemer.com/wallpapers/chromebook-wallpapers/images/960/db-super-chromebook-wallpaper.jpg"
          />
        </SwiperSlide>

        <SwiperSlide>
          <GlassCard
            title="Habit Tracker"
            description="Daily habit tracker"
            icons={[
              <FaReact key="react" />,
              <SiTypescript key="ts" />,
              <FaLaravel key="laravel" />,
            ]}
            color="orange"
            href="https://github.com/ProfMthLuiz"
            image={habitTracker}
          />
        </SwiperSlide>

        <SwiperSlide>
          <GlassCard
            title="Mobile"
            description="React Native"
            icons={[
              <FaReact key="react" />,
              <SiTypescript key="ts" />,
              <FaLaravel key="laravel" />,
            ]}
            href="https://github.com/ProfMthLuiz"
            color="orange"
            image="https://www.chromethemer.com/wallpapers/chromebook-wallpapers/images/960/db-super-chromebook-wallpaper.jpg"
          />
        </SwiperSlide>

        <SwiperSlide>
          <GlassCard
            title="Frontend"
            description="React • TypeScript • Next.js"
            icons={[
              <FaReact key="react" />,
              <SiTypescript key="ts" />,
              <FaLaravel key="laravel" />,
            ]}
            href="https://github.com/ProfMthLuiz"
            image="https://www.chromethemer.com/wallpapers/chromebook-wallpapers/images/960/db-super-chromebook-wallpaper.jpg"
          />
        </SwiperSlide>

        <SwiperSlide>
          <GlassCard
            title="Backend"
            description="Laravel • PHP • MySQL"
            icons={[
              <FaReact key="react" />,
              <SiTypescript key="ts" />,
              <FaLaravel key="laravel" />,
            ]}
            href="https://github.com/ProfMthLuiz"
            image="https://www.chromethemer.com/wallpapers/chromebook-wallpapers/images/960/db-super-chromebook-wallpaper.jpg"
          />
        </SwiperSlide>

        <SwiperSlide>
          <GlassCard
            title="Backend"
            description="Laravel • PHP • MySQL"
            icons={[
              <FaReact key="react" />,
              <SiTypescript key="ts" />,
              <FaLaravel key="laravel" />,
            ]}
            href="https://github.com/ProfMthLuiz"
            image="https://www.chromethemer.com/wallpapers/chromebook-wallpapers/images/960/db-super-chromebook-wallpaper.jpg"
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
