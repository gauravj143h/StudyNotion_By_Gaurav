import React from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import CourseInformationForm from "./CourseInformationForm";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import PublishCourse from "./Publish/publish"
// import PublishCourse from './PublishCourse' // Uncomment when you have this

const StepsOfCourse = () => {
  const { step } = useSelector((state) => state.course);

  const steps = [
    { id: 1, title: "Course Information" },
    { id: 2, title: "Course Builder" },
    { id: 3, title: "Publish" },
  ];

  return (
    <>
      {/* Stepper Line */}
      <div className="flex items-center justify-between mb-10 px-8">
        {steps.map((item, index) => (
          <React.Fragment key={item.id}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold border-2
                ${
                  step === item.id
                    ? "bg-yellow-500 border-yellow-500 text-white"
                    : step > item.id
                    ? "bg-green-500 border-green-500 text-white"
                    : "bg-richblack-800 border-richblack-600 text-richblack-300"
                }`}
              >
                {step > item.id ? <FaCheck /> : item.id}
              </div>
              <p className="text-xs mt-2 text-center text-white max-w-[80px]">
                {item.title}
              </p>
            </div>

            {/* Dashes between steps */}
            {index < steps.length - 1 && (
              <div className="relative flex-1 mx-2 h-1">
                {/* Gray dotted line (background) */}
                <div className="absolute top-1/2 left-0 w-full border-t border-dashed border-richblack-600 translate-y-[-50%]" />

                {/* Animated yellow solid line (foreground) */}
                <div
                  className={`absolute top-1/2 left-0 h-[2px] translate-y-[-50%] transition-all duration-500 ease-in-out
        ${step > item.id ? "bg-yellow-500 w-full" : "w-0"}`}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Render the correct form */}
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse/>}
    </>
  );
};

export default StepsOfCourse;
