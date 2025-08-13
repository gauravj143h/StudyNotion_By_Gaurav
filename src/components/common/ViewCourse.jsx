import React, { useEffect, useState } from "react";
import VideoDetailsSidebar from "../core/viewcourse/VideoDetailsSidebar";
import { Outlet, useParams } from "react-router-dom";
import CourseReviewModal from "../core/viewcourse/ReviewCourseModal";
import { useDispatch, useSelector } from "react-redux";
import { getFullDetailsOfCourse } from "../../services/operations/courseDetailsAPI";
import {
  setCourseSectionData,
  setCompletedLectures,
  setTotalNoOfLectures,
  setEntireCourseData,
} from "../../slice/viewCourseSlice";

const ViewCourse = () => {
  console.log("in a view courese ************");
  const [reviewModal, setReviewModal] = useState(false);
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const setCourseSpecificDetails = async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
      dispatch(setEntireCourseData(courseData.courseDetails));
      dispatch(setCompletedLectures(courseData.completedVideos));
      let lectures = 0;
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length;
      });
      dispatch(setTotalNoOfLectures(lectures));
    };
    setCourseSpecificDetails();
  }, []);

  return (
    <>
     <div className="flex min-h-screen bg-richblack-900 text-white">
         <div className="w-[280px] border-r border-richblack-700 bg-richblack-800">
          <VideoDetailsSidebar setReviewModal={setReviewModal} />
             </div>
          <div className="flex-1 p-6">
            <Outlet />
          </div>
     
          {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
      </div>

    
    </>
  );
};

export default ViewCourse;
