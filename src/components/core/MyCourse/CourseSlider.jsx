import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Navigation, Autoplay } from "swiper/modules"; 
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Course_Card from "./Course_Card";

const CourseSlider = ({ courses }) => {
  console.log("Courses received in slider:", courses);

  return (
    <>
      {courses?.length ? (
        <Swiper
          spaceBetween={10}
          slidesPerView={3}
          loop={true}                     // ✅ Infinite loop
          autoplay={{
            delay: 1000,                  // ✅ Auto-slide every 2s
            disableOnInteraction: true,  // ✅ Continue after manual swipe
          }}
          // navigation={true}
          pagination={{ clickable: true }}
          modules={[FreeMode, Pagination, Navigation, Autoplay]} // ✅ Added Autoplay module
        >
          {courses.map((course, index) => (
            <SwiperSlide key={index}>
              <Course_Card course={course} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>No Course Found</p>
      )}
    </>
  );
};

export default CourseSlider;
