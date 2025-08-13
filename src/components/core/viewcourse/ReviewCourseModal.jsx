import React, { useEffect } from "react";
import ReactStars from "react-stars";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import IconBtn from "../../common/CommonButton";
import { createRating } from "../../../services/operations/courseDetailsAPI";

const CourseReviewModal = ({ setReviewModal }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { entireCourseData } = useSelector((state) => state.viewCourse);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  }, []);

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating);
  };

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: entireCourseData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    );
    setReviewModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-40">
      <div className="w-[90%] max-w-[500px] rounded-lg bg-white p-6 shadow-lg">
        {/* Modal header */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-lg font-semibold text-richblack-900">Add Review</p>
          <button
            onClick={() => setReviewModal(false)}
            className="text-sm text-richblack-600 hover:text-richblack-900"
          >
            Close
          </button>
        </div>

        {/* Modal Body */}
        <div>
          {/* User Info */}
          <div className="mb-4 flex items-center gap-3">
            <img
              src={user?.image}
              alt="user"
              className="w-[50px] aspect-square rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-richblack-800">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-richblack-500">Posting Publicly</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
            />

            <div>
              <label htmlFor="courseExperience" className="text-sm font-medium text-richblack-700">
                Add Your Experience <span className="text-red-500">*</span>
              </label>
              <textarea
                id="courseExperience"
                placeholder="Add Your Experience here"
                {...register("courseExperience", { required: true })}
                className="w-full mt-1 min-h-[130px] rounded-md border border-richblack-200 p-3 text-sm text-richblack-900 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
              {errors.courseExperience && (
                <span className="text-sm text-red-500">Please add your experience</span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setReviewModal(false)}
                className="rounded-md border border-richblack-200 px-4 py-2 text-sm text-richblack-700 hover:bg-richblack-100"
              >
                Cancel
              </button>
              <IconBtn text="Save" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseReviewModal;
