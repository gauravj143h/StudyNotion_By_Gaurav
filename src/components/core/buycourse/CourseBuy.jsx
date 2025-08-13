import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { fetchCourseDetails } from "../../../services/operations/courseDetailsAPI";
import CommonButton from "../../common/CommonButton";
import { useDispatch, useSelector } from "react-redux";
import { buyCourse } from "../../../services/operations/StudentFeaturesApi";
import Footer from "../../common/Footer";
import GetAvgRating from "../../../utils/avgRating";
import RatingStars from "../../common/RatingStars";
import { studentEndpoints } from "../../../services/api";
import {ACCOUNT_TYPE} from "../../../utils/constants"
import toast from "react-hot-toast";
import { addToCart } from "../../../slice/cartslice";

const CourseBuy = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.profile);
  const [courseData, setCourseData] = useState(null);
  const [showSections, setShowSections] = useState(false);
  const [avgreview, setavgreview] = useState(0);

  const getCourseDetails = async () => {
    try {
      const result = await fetchCourseDetails(courseId);
      if (result?.success && result.data?.length > 0) {
        console.log("******CourseData******", result);
        setCourseData(result.data[0]);
      }
    } catch (err) {
      console.log("Error while fetching course details in CourseBuy:", err);
    }
  };

  // step of razorpay
  // step 1 - load the razorpay script
  // step 2 - load the modal of razor pay
  // for that we need modal options object

  useEffect(() => {
    getCourseDetails();
  }, [courseId]);

  useEffect(() => {
    const avg = GetAvgRating(courseData?.data?.courseContent?.ratingAndReviews);
    setavgreview(avg);
  }, [courseData]);

 const handlebuyButton = async () => {
  if (!token) {
    toast.error("Please login first");
    navigate("/login");
    return;
  }

  if (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
    toast.error("You are an instructor, you can't buy courses");
    return;
  }

  if (user?.accountType === ACCOUNT_TYPE.STUDENT) {
    await buyCourse(token, [courseId], user, navigate, dispatch);
  }
}

const handleAddButton = () => {
  if (token) {
    dispatch(addToCart(courseData));  // ✅ Pass the course details here
    navigate("/dashboard/cart");
  }
};


  const studentsEnrolled = courseData?.studentsEnrolled || [];
  const ratingAndReviews =
    courseData?.data?.courseDetails?.ratingAndReviews || [];
 
  return (
    <div>
      <div className="text-white bg-richblack-900 min-h-screen relative">
        {!courseData ? (
          <div className="text-center text-gray-400">
            Loading course details...
          </div>
        ) : (
          <div className="w-full bg-richblack-700 relative h-[500px]">
            <div className="flex flex-col lg:flex-row gap-8 max-w-4xl m-auto items-start relative">
              {/* Left: Course Header */}
              <div className="flex-1 mt-40">
                <h2 className="text-3xl font-semibold mb-2">
                  {courseData.courseName}
                </h2>
                <p className="text-gray-300 mb-3">
                  Created By:{" "}
                  <span className="text-yellow-400">
                    {courseData.instructor.firstName}{" "}
                    {courseData.instructor.lastName}
                  </span>
                </p>
                <div>
                  <span>{avgreview}</span>
                  <RatingStars Review_Count={avgreview} Star_Size={24} />
                  <span>{`(${ratingAndReviews.length}reviews)`}</span>
                  <span>{`${studentsEnrolled.length} students enrolled`}</span>
                </div>
                <p className="text-sm text-gray-400">
                  Created On:{" "}
                  {new Date(courseData.instructor.createdAt)
                    .toLocaleString("en-US", {
                      month: "long",
                      day: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                    .replace(",", " |")}
                </p>
              </div>

              {/* Right: Course Info & Buy */}
              <div className="bg-richblack-800 p-5 rounded-lg shadow-lg w-full lg:w-[320px] relative lg:-mt-10 top-40">
                <img
                  src={courseData.thumbnail}
                  alt="Course Thumbnail"
                  className="w-full h-[200px] object-cover rounded-md mb-4"
                />
                <p className="text-2xl font-semibold mb-4">
                  Rs. {courseData.price}
                </p>
                <div className="flex flex-col gap-4">
                  <CommonButton
                    text={
                      user && courseData?.studentsEnrolled.includes(user?._id)
                        ? "Go to course"
                        : "Buy now"
                    }
                    className="w-full mb-2"
                    onClick={handlebuyButton}
                  />
                  {user && courseData?.studentsEnrolled.includes(user?._id) ? (
                    ""
                  ) : (
                    <button
                      className="w-full py-2 bg-richblack-400 rounded-md hover:bg-gray-600 transition mb-3"
                      onClick={handleAddButton}
                    >
                      Add to
                    </button>
                  )}
                </div>

                <p className="text-xs text-gray-400 mb-4 mt-4">
                  30-Day Money-Back Guarantee
                </p>

                {/* Course Includes */}
                <div>
                  <p className="font-semibold mb-2">This Course Includes:</p>
                  <div
                    className="flex flex-col cursor-pointer bg-gray-800 px-3 py-2 rounded-md"
                    onClick={() => setShowSections((prev) => !prev)}
                  >
                      <div className=" text-sm text-gray-300">
                        {courseData?.instructions.map((section, index) => (
                          <p key={index}>
                            <span>{section}</span>
                          </p>
                        ))}
                      </div>
                  </div>
                </div>
              </div>
            </div>

            {/* What You'll Learn Section (Positioned Right) */}
            <div className="relative max-w-4xl ">
              <div className="absolute left-[35%] top-[52px] w-[50%] border-white shadow-lg">
                <h2 className="text-2xl font-semibold mb-6">
                  What you'll learn
                </h2>
                <div className="bg-richblack-800 p-4 rounded-lg border border-white shadow-lg">
                  <p className="text-sm">{courseData?.whatYouWillLearn}</p>
                </div>
              </div>
            </div>

            {/* Course Content Section */}
            <div className="bg-richblack-900 text-white py-12 px-6 absolute top-[700px] w-full">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold mb-4">Course Content</h2>
                <p className="text-gray-400 mb-6">
                  {courseData?.courseContent?.length} sections •{" "}
                  {courseData?.courseContent?.reduce(
                    (total, section) => total + section.subSection.length,
                    0
                  )}{" "}
                  lectures
                </p>

                {/* Accordion */}
                <div className="space-y-4">
                  {courseData?.courseContent?.map((section, index) => (
                    <div
                      key={section._id}
                      className="border border-richblack-700 rounded-md overflow-hidden"
                    >
                      <div
                        className="flex justify-between items-center bg-richblack-800 px-4 py-3 cursor-pointer"
                        onClick={() =>
                          setShowSections((prev) =>
                            prev === index ? null : index
                          )
                        }
                      >
                        <p className="font-medium">{section.sectionName}</p>
                        <span>{showSections === index ? "▲" : "▼"}</span>
                      </div>
                      {showSections === index && (
                        <div className="bg-richblack-700 px-4 py-3 text-sm">
                          {section.subSection.map((lecture) => (
                            <p
                              key={lecture._id}
                              className="py-1 border-b border-richblack-600"
                            >
                              {lecture.title}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* <Footer/> */}
    </div>
  );
};

export default CourseBuy;
