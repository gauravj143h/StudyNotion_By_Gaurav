import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconBtn from "../../common/CommonButton";
import { FaChevronDown } from "react-icons/fa";

const VideoDetailsSidebar = ({ setReviewModal }) => {
    const { courseId } = useParams();
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    const setActiveFlags = () => {
      if (!courseSectionData.length) return;
      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );
      const currentSubSectionIndex = courseSectionData?.[
        currentSectionIndex
      ]?.subSection.findIndex((data) => data._id === subSectionId);
      const activeSubSectionId =
        courseSectionData[currentSectionIndex]?.subSection?.[
          currentSubSectionIndex
        ]?._id;
      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      setVideoBarActive(activeSubSectionId);
    };
    setActiveFlags();
  }, [courseSectionData, courseEntireData, location.pathname]);

  return (
    <div className="text-white h-[calc(100vh-3.5rem)] overflow-y-auto bg-richblack-800 p-6 w-full lg:max-w-[350px] border-r border-richblack-700">
      {/* Top Buttons */}
      <div className="mb-6 flex flex-col gap-4">
        <button
          className="text-sm text-yellow-50 hover:underline text-left"
          onClick={() => navigate("/dashboard/enrolled-courses")}
        >
          ← Back to Enrolled Courses
        </button>

        <IconBtn
          text="Add Review"
          onClick={() => setReviewModal(true)}
        />

        <div>
          <h2 className="text-lg font-semibold text-white">
            {courseEntireData?.courseName}
          </h2>
          <p className="text-sm text-richblack-300">
            {completedLectures?.length || 0} / {totalNoOfLectures} Lectures Completed
          </p>
        </div>
      </div>

      {/* Course Sections */}
      <div className="flex flex-col gap-3">
        {courseSectionData.map((course, index) => (
          <div key={index}>
            <button
              onClick={() => setActiveStatus(course?._id)}
              className="w-full flex items-center justify-between text-left bg-richblack-700 px-4 py-2 rounded-lg hover:bg-richblack-600"
            >
              <span className="text-sm font-medium text-white">
                {course?.sectionName}
              </span>
              <FaChevronDown
                className={`transition-transform duration-300 text-white ${
                  activeStatus === course?._id ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Subsections */}
            {activeStatus === course?._id && (
              <div className="mt-2 ml-4 flex flex-col gap-2">
                {course.subSection.map((topic, subIndex) => (
                  <div
                    key={subIndex}
                    className={`flex items-start gap-3 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      videoBarActive === topic._id
                        ? "bg-yellow-100 text-richblack-900"
                        : "bg-richblack-900 text-white hover:bg-richblack-700"
                    }`}
                    onClick={() => {
                      // Use courseId from URL params
                      navigate(
                        `/view-course/${courseId}/section/${course._id}/sub-section/${topic._id}`
                      );
                      setVideoBarActive(topic._id);
                    }}
                  >
                    <input
                      type="checkbox"
                      className="mt-1 accent-yellow-200"
                      checked={completedLectures.includes(topic?._id)}
                      readOnly
                    />
                    <span className="text-sm leading-5">{topic.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoDetailsSidebar;
