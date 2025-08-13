import React, { useEffect, useState } from "react";
import CommonButton from "../../../common/CommonButton";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import {
  resetCourseState,
  setStep,
} from "../../../../slice/courseSlice";
import { useForm } from "react-hook-form";
import { COURSE_STATUS } from "../../../../utils/constants";
import { editCourseDetails } from "../../../../services/operations/courseDetailsAPI";

const PublishCourse = () => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  }, [course, setValue]);

  const goBack = () => {
    dispatch(setStep(2));
  };

  const goToCourse = () => {
    dispatch(resetCourseState());
  };

  const handleCoursePublish = async () => {
    const isAlreadyPublished =
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course.status === COURSE_STATUS.DRAFT &&
        getValues("public") === false);

    if (isAlreadyPublished) {
      goToCourse();
      return;
    }

    const formData = new FormData();
    formData.append("courseId", course._id);
    formData.append(
      "status",
      getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
    );

    setLoading(true);
    const result = await editCourseDetails(formData, token);

    if (result) {
      goToCourse();
    }

    setLoading(false);
  };

  const onSubmit = () => {
    handleCoursePublish();
  };

  return (
    <div className="text-white p-6 border border-richblack-600 rounded-lg bg-richblack-800 max-w-xl mx-auto mt-10 shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-yellow-400">🚀 Publish Course</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="public"
            {...register("public")}
            className="h-4 w-4 accent-yellow-400"
          />
          <label htmlFor="public" className="text-sm">
            Make this course public
          </label>
        </div>

        <div className="flex items-center justify-between gap-4">
          <CommonButton text="Back" onClick={goBack} />
          <CommonButton
            disabled={loading}
            text={loading ? "Saving..." : "Save & Publish"}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default PublishCourse;
