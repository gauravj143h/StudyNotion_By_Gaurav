import React, { useEffect, useState } from 'react';
import apiConnector from '../../services/apiconnector';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { ratingsEndpoints } from '../../services/api';

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const { data } = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API);
        if (data?.success) {
          setReviews(data?.data);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchAllReviews();
  }, []);

  const truncateText = (text, wordLimit) => {
    const words = text?.split(' ');
    if (words?.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: true,
        }}
        pagination={{ clickable: true }}
        modules={[FreeMode, Pagination, Navigation, Autoplay]}
      >
        {reviews.map((review, index) => {
          const { user, review: reviewText, rating, course } = review;
          const fullName = `${user?.firstName} ${user?.lastName}`;
          const profileImage = user?.image || `https://api.dicebear.com/5.x/initials/svg?seed=${fullName.replace(" ", "")}`;

          return (
            <SwiperSlide key={review._id} className="bg-richblack-700 shadow-md rounded-lg p-6 space-y-2 h-full">
              <div className="flex items-center space-x-3">
                <img
                  src={profileImage}
                  alt="Profile Pic"
                  className="h-10 w-10 object-cover rounded-full"
                />
                <div>
                  <p className="font-semibold text-sm">{fullName}</p>
                  <p className="text-xs text-gray-500">{course?.courseName}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mt-2">
                {truncateText(reviewText, truncateWords)}
              </p>
              <p className="text-white font-medium text-sm">Rating: ⭐ {rating}</p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ReviewSlider;
