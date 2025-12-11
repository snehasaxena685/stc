import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function CarouselSwiper() {
  return (
    <div style={{ width: "100%", padding: "20px 0" }}>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        style={{ paddingBottom: "40px" }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          900: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        }}
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="carousel-card">
            <img src="/images/banner1.jpg" className="carousel-img" />
            <div className="carousel-content">
              <h3>Headlining Hard</h3>
              <p>Lorem ipsum dolor sit amet...</p>
              <button className="carousel-btn">Get Info</button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="carousel-card">
            <img src="/images/banner2.jpg" className="carousel-img" />
            <div className="carousel-content">
              <h3>Advanced Training</h3>
              <p>Short description of course...</p>
              <button className="carousel-btn">Get Info</button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="carousel-card">
            <img src="/images/Mansion_pic.jpg" className="carousel-img" />
            <div className="carousel-content">
              <h3>CFTRI Campus</h3>
              <p>A beautiful learning environment.</p>
              <button className="carousel-btn">Get Info</button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
