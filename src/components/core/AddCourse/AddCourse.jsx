import React from "react";
import StepsOfCourse from "./StepsOfCousre";

const AddCourse = () => {
  return (
    <div className="text-white flex">
      <div className="w-full max-w-2xl ">
        <h1 className="text-3xl font-bold p-4">Add Courses</h1>
        <div className="ml-5 mr-4">
          <StepsOfCourse />
        </div>
      </div>
      <div className="bg-richblack-500 p-4 rounded-md w-full max-w-[350px] h-fit text-white">
        <h1 className="text-lg font-semibold mb-5 text-start">
          ⚡ Code Upload Tips
        </h1>
        <ul className="list-disc list-outside pl-5 space-y-2 text-[12px] gap-5 mb-5">
          <li>Set the Course Price option or make it free.</li>
          <li>Standard size for the course thumbnail is 1024x576.</li>
          <li>Video section controls the course overview video.</li>
          <li>Course Builder is where you create & organize a course.</li>
          <li>Add Topics to create lessons, quizzes & assignments.</li>
          <li>Additional Data appears on the course page.</li>
          <li>Make Announcements to notify students.</li>
          <li>Notes go to all enrolled students at once.</li>
        </ul>
      </div>
    </div>
  );
};

export default AddCourse;
