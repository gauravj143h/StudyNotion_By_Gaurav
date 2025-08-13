import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);
 const navigate = useNavigate();
  const getEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      console.log("EndrollCourse are ---> ", response)
      setEnrolledCourses(response);
    } catch (error) {
      console.log("Unable to Fetch Enrolled Courses");
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  return (
    <div className="text-white w-11/12 mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Enrolled Courses</h1>

      {!enrolledCourses ? (
        <div className="text-center py-10 text-gray-400 text-lg">Loading...</div>
      ) : !enrolledCourses.length ? (
        <p className="text-center py-10 text-gray-400 text-lg">
          You have not enrolled in any course yet.
        </p>
      ) : (
        <div className="overflow-x-auto bg-gray-900 rounded-lg shadow-md">
          <div className="grid grid-cols-12 gap-4 bg-gray-800 px-6 py-4 border-b border-gray-700 text-gray-400 text-sm uppercase">
            <p className="col-span-6">Course</p>
            <p className="col-span-2 text-center">Duration</p>
            <p className="col-span-4 text-center">Progress</p>
          </div>

         {/* Course Names */}
          {enrolledCourses.map((course, i, arr) => (
            <div
              className={`flex items-center border border-richblack-700 ${
                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              }`}
              key={i}
            >
               <div
                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  )
                }}
              >
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold">{course.courseName}</p>
                  <p className="text-xs text-richblack-300">
                    {course.courseDescription.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>
              <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>
              <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                <p>Progress: {course.progressPercentage || 0}%</p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
