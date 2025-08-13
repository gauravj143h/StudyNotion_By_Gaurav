import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getinstructorDashboard } from "../services/operations/profileAPI";
import { fetchInstructorCourses } from "../services/operations/courseDetailsAPI";
import { Link } from "react-router-dom";
import InstructorChart from "./InstructorChart";

const InstructorDashboard = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [course, setCourse] = useState([]);

  useEffect(() => {
    const getCourseDataWithStats = async () => {
      setLoading(true);

      const instructorApiData = await getinstructorDashboard(token);
      const result = await fetchInstructorCourses(token);

      if (instructorApiData.length) {
        setInstructorData(instructorApiData);
      }

      if (result) {
        setCourse(result);
      }
      setLoading(false);
    };
    getCourseDataWithStats();
  }, [token]);

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  );
  const totalStudent = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  );

  return (
    <div className="p-6 text-white">
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Hi {user?.firstName} 👋</h1>
        <p className="text-gray-300">Let's start something new today</p>
      </div>

      {loading ? (
        <div className="text-center text-lg font-semibold">Loading...</div>
      ) : course.length > 0 ? (
        <div className="space-y-8">
          {/* Chart */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <InstructorChart course={instructorData} />
          </div>

          {/* Statistics */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Statistics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
                <p className="text-gray-400">Total Courses</p>
                <p className="text-2xl font-bold">{course.length}</p>
              </div>
              {/* <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
                <p className="text-gray-400">Total Students</p>
                <p className="text-2xl font-bold">{totalStudent}</p>
              </div> */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
                <p className="text-gray-400">Total Income</p>
                <p className="text-2xl font-bold">₹{totalAmount}</p>
              </div>
            </div>
          </div>

          {/* Courses */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your Courses</h2>
              <Link
                to="/dashboard/my-courses"
                className="text-blue-400 hover:underline"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {course.slice(0, 3).map((courseItem, index) => (
                <div
                  key={courseItem._id || index}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
                >
                  <img
                    src={courseItem.thumbnail}
                    alt={courseItem.courseName}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <p className="font-semibold text-lg mb-2">
                      {courseItem.courseName}
                    </p>
                    <div className="flex justify-between text-gray-400 text-sm">
                      <p>
                        Students: {courseItem.studentsEnrolled.length}
                      </p>
                      <p>₹{courseItem.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-800 rounded-lg shadow-md">
          <p className="mb-4 text-lg">
            You have not created any courses yet.
          </p>
          <Link
            to="/dashboard/add-course"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium"
          >
            Create a Course
          </Link>
        </div>
      )}
    </div>
  );
};

export default InstructorDashboard;
