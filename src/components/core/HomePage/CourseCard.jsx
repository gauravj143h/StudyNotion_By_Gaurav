import React from "react";
import { IoMdContacts ,IoMdContact} from "react-icons/io";
const CourseCard = ({ course, isActive, setCurrentCard, isFirst }) => {
  return (
    <div
      className={`w-[280px] ${
        isFirst ? "bg-richblack-5" : "bg-richblack-800"
      } p-6 cursor-pointer mt-8
        ${isActive ? "border-yellow-500" : "border-transparent"} 
        }
        hover:border-yellow-500 transition-all duration-300 ${
          isFirst ? 'shadow-[18px_18px_0px_0px_yellow]' : ""
        } ${isFirst ? "text-richblack-800" : "text-richblack-200"} `}
      onClick={() => setCurrentCard(course.heading)}
    >
      <h3
        className={`text-lg font-semibold text-richblack-5 mb-2 ${
          isFirst ? "text-richblack-900" : "text-richblack-200"
        }`}
      >
        {course.heading}
      </h3>
      <p className="text-richblack-300 text-sm mb-2">{course.description}</p>

      <div className="flex flex-row justify-between mt-7">
        <div className="flex flex-row gap-2">
          <IoMdContacts />
          <p
            className={` ${
              isFirst ? "text-richblack-500" : "text-yellow-50"
            } text-sm`}
          >
            {course.level}
          </p>
        </div>

        <div className="flex flex-row gap-2">
             <IoMdContact />
          <p
            className={` ${
              isFirst ? "text-richblack-500" : "text-yellow-50"
            } text-sm`}
          >
            {course.lessionNumber}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
