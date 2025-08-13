import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CommonButton from "../../../common/CommonButton";
import { MdAddCircleOutline } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import NestedView from "./NestedView";
import { setCourse, setStep } from "../../../../slice/courseSlice";
import toast from "react-hot-toast";
import {
  createSection,
  updateSection,
} from "../../../../services/operations/courseDetailsAPI";

const CourseBuilderForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [editSectionName, setEditSectionName] = useState(null);
  const dispatch = useDispatch();

  const cancelHandler = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelHandler();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  const goBack = () => {
    dispatch(setStep(1));
    setValue("sectionName", "");
  };

  const submitHandler = async (data) => {
    setLoading(true);
    let result;
    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
          sectionId: editSectionName,
        },
        token
      );
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );
    }

    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }
    setLoading(false);
  };

  const goNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add at least one section");
      return;
    }

    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Each section must contain at least one lecture");
      return;
    }

    dispatch(setStep(3));
  };

  return (
    <div className="text-white px-6 py-4 bg-richblack-800 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-yellow-50">Course Builder</h2>

      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        {/* Section Name Input */}
        <div>
          <label htmlFor="sectionName" className="block mb-1 font-medium">
            Section Name <sup className="text-pink-500">*</sup>
          </label>
          <input
            id="sectionName"
            type="text"
            placeholder="Enter section name"
            {...register("sectionName", { required: true })}
            className="w-full rounded-md px-3 py-2 border border-richblack-400 bg-richblack-700 text-white placeholder:text-richblack-300 outline-none focus:ring focus:ring-yellow-300"
          />
          {errors.sectionName && (
            <span className="text-pink-400 text-sm mt-1 block">
              Section name is required
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <CommonButton
            type="submit"
            text={editSectionName ? "Update Section" : "Add Section"}
            outline
            customClasses="flex items-center gap-2"
          >
            <MdAddCircleOutline size={20} />
          </CommonButton>

          {editSectionName && (
            <button
              type="button"
              className="text-sm text-richblack-300 underline hover:text-yellow-200 transition"
              onClick={cancelHandler}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Nested View */}
      {course.courseContent.length > 0 && (
        <div className="mt-6">
          <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-10">
        <button
          onClick={goBack}
          className="bg-richblack-700 hover:bg-richblack-600 text-white font-medium px-5 py-2 rounded-md transition"
        >
          Back
        </button>
        <CommonButton text="Next" onClick={goNext} />
      </div>
    </div>
  );
};

export default CourseBuilderForm;
