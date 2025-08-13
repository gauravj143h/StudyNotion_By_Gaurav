import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createSubSection, updateSubSection } from "../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../slice/courseSlice";
import { RxCross1 } from "react-icons/rx";
import UploadThumbnail from "../Uplodthumnail";
import CommonButton from "../../../common/CommonButton";

const SubSectionModal = ({
  modalData,
  setModaldata,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData?.title || "");
      setValue("lectureDesc", modalData?.description || "");
        <div className="">
    <UploadThumbnail thumbnail={thumbnail} setThumbnail={setThumbnail} />
  </div>
    }
  }, [view, edit, modalData, setValue,thumbnail]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    return (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description
    );
  };

  const handleEditSubsection = async () => {
    console.log("in the sub section")
    const currentValues = getValues();
    const formdata = new FormData();
    formdata.append("sectionId", modalData.sectionId);
    formdata.append("subSectionId", modalData._id);

    if (currentValues.lectureTitle !== modalData.title) {
      formdata.append("title", currentValues.lectureTitle);
    }

    if (currentValues.lectureDesc !== modalData.description) {
      formdata.append("description", currentValues.lectureDesc);
    }

    if (thumbnail) {
      console.log("thumnail kigand maro ", thumbnail)
  formdata.append("video", thumbnail);
  console.log("gand maro iski ", thumbnail);
}
    setLoading(true);
    const result = await updateSubSection(formdata, token);
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      );
      dispatch(setCourse({ ...course, courseContent: updatedCourseContent }));
    }

    setModaldata(null);
    setLoading(false);
  };

  const onSubmit = async (data) => {
    if (view) return;

    if (edit) {
  if (!isFormUpdated() && !thumbnail) {
    toast.error("No changes made to the form.");
  } else {
    await handleEditSubsection();
  }
  return;
}


    const formdata = new FormData();
    formdata.append("sectionId", modalData);
    formdata.append("title", data.lectureTitle);
    formdata.append("description", data.lectureDesc);
    formdata.append("video", thumbnail);

    setLoading(true);
    const result = await createSubSection(formdata, token);
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section
      );
      dispatch(setCourse({ ...course, courseContent: updatedCourseContent }));
    }

    setModaldata(null);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center p-4">
      <div className="w-full max-w-xl rounded-lg bg-richblack-800 text-white px-6 py-5 shadow-lg relative">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-richblack-600 pb-3 mb-4">
          <h2 className="text-lg md:text-xl font-semibold capitalize">
            {view && "View"} {add && "Add"} {edit && "Edit"} Lecture
          </h2>
          <button
            onClick={() => setModaldata(null)}
            disabled={loading}
            className="text-richblack-300 hover:text-pink-500 transition-all"
          >
            <RxCross1 size={22} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Upload */}
         {!view && (
  <div className="">
    <UploadThumbnail thumbnail={thumbnail} setThumbnail={setThumbnail} />
  </div>
)}

          {/* Lecture Title */}
          <div>
            <label htmlFor="lectureTitle" className="text-sm font-medium text-richblack-5">
              Lecture Title <sup className="text-pink-200">*</sup>
            </label>
            <input
              id="lectureTitle"
              type="text"
              placeholder="Enter lecture title"
              disabled={view}
              {...register("lectureTitle", { required: true })}
              className={`mt-1 w-full rounded-md border bg-richblack-700 px-3 py-2 text-richblack-5 placeholder:text-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                errors.lectureTitle ? "border-pink-500" : "border-richblack-600"
              }`}
            />
            {errors.lectureTitle && (
              <p className="text-xs text-pink-200 mt-1">Lecture title is required</p>
            )}
          </div>

          {/* Lecture Description */}
          <div>
            <label htmlFor="lectureDesc" className="text-sm font-medium text-richblack-5">
              Lecture Description <sup className="text-pink-200">*</sup>
            </label>
            <textarea
              id="lectureDesc"
              placeholder="Enter lecture description"
              disabled={view}
              {...register("lectureDesc", { required: true })}
              className={`mt-1 w-full min-h-[100px] rounded-md border bg-richblack-700 px-3 py-2 text-richblack-5 placeholder:text-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                errors.lectureDesc ? "border-pink-500" : "border-richblack-600"
              }`}
            />
            {errors.lectureDesc && (
              <p className="text-xs text-pink-200 mt-1">Lecture description is required</p>
            )}
          </div>

          {/* Submit */}
          {!view && (
            <div className="text-right">
              <CommonButton
                type="submit"
                text={loading ? "Processing..." : edit ? "Save Changes" : "Save"}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SubSectionModal;
