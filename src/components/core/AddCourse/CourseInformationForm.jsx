import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../services/operations/courseDetailsAPI";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { BiUpload } from "react-icons/bi";
import RequirementField from "./RequirementField";
import { setStep, setCourse } from "../../../slice/courseSlice";
import IconBtn from "../../common/CommonButton";
import { COURSE_STATUS } from "../../../utils/constants";
import { toast } from "react-hot-toast";
import TagsInput from "./TagsInput";
import UploadThumbnail from "./Uplodthumnail";

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
 useEffect(() => {
  const getCategories = async () => {
    setLoading(true);
    const categories = await fetchCourseCategories();

    console.log("the categries are",categories)
    if (categories.length > 0) {
      setCourseCategories(categories);
    }
    setLoading(false);
  };

  if (editCourse && course) {
    setValue("courseTitle", course.courseName);
    setValue("courseShortDesc", course.courseDescription);
    setValue("coursePrice", course.price);
    setValue("courseBenefits", course.whatYouWillLearn);
    setValue("courseCategory", course.category?._id);
    setValue("courseRequirements", course.instructions);

    setTags(course.tag || []);
    setThumbnail(course.thumbnail || null);
  }

  getCategories();
}, []);


  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTitle !== course.courseName ||
      //currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      //currentValues.courseImage !== course.thumbnail ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString()
    )
      return true;
    else return false;
  };

  //handles next button click
  const onSubmit = async (data) => {
    console.log("Token ISSSSSS", token);
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("courseId", course._id);
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }

        if (JSON.stringify(tags) !== JSON.stringify(course.tag)) {
          formData.append("tag", JSON.stringify(tags));
        }

        // Update thumbnail if changed
        if (thumbnail && thumbnail !== course.thumbnail) {
          formData.append("thumbnail", thumbnail);
        }

        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }

        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }

        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }

        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory);
        }

        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          );
        }
        console.log("form data is :", formData);
        setLoading(true);

        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if (result) {
        dispatch(setStep(2));

          dispatch(setCourse(result));
        }
      } else {
        toast.error("NO Changes made so far");
      }
      console.log("PRINTING FORMDATA", formData);
      console.log("PRINTING result", result);

      return;
    }

    //create a new course
    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("status", COURSE_STATUS.DRAFT);
    formData.append("thumbnailImage", thumbnail);
    formData.append("tag", JSON.stringify(tags));

    setLoading(true);
    console.log("BEFORE add course API call");
    console.log("PRINTING FORMDATA", formData);
    console.log("Token ISSSSSS", token);
    const result = await addCourseDetails(formData, token);
    if (result) {
      dispatch(setStep(2));

      dispatch(setCourse(result));
    }
    setLoading(false);
    console.log("PRINTING FORMDATA", formData);
    console.log("PRINTING result", result);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-3xl mx-auto rounded-md border border-richblack-700 bg-richblack-800 p-6 space-y-8 text-white"
    >
      {/* Course Title */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="courseTitle" className="text-sm font-medium">
          Course Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="form-input rounded-md bg-richblack-700 px-3 py-2 text-sm placeholder:text-richblack-400 focus:outline-none focus:ring focus:ring-yellow-400"
        />
        {errors.courseTitle && (
          <span className="text-xs text-pink-200">
            Course Title is required
          </span>
        )}
      </div>

      {/* Short Description */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="courseShortDesc" className="text-sm font-medium">
          Course Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          className="min-h-[130px] rounded-md bg-richblack-700 px-3 py-2 text-sm placeholder:text-richblack-400 focus:outline-none focus:ring focus:ring-yellow-400"
        />
        {errors.courseShortDesc && (
          <span className="text-xs text-pink-200">
            Course Description is required
          </span>
        )}
      </div>

      {/* Price */}
      <div className="flex flex-col space-y-1 relative">
        <label htmlFor="coursePrice" className="text-sm font-medium">
          Course Price <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="coursePrice"
          type="number"
          placeholder="Enter Course Price"
          {...register("coursePrice", { required: true, valueAsNumber: true })}
          className="rounded-md bg-richblack-700 px-10 py-2 text-sm placeholder:text-richblack-400 focus:outline-none focus:ring focus:ring-yellow-400"
        />
        <HiOutlineCurrencyRupee className="absolute left-3 top-[28px] text-lg text-richblack-400" />
        {errors.coursePrice && (
          <span className="text-xs text-pink-200">
            Course Price is required
          </span>
        )}
      </div>

      {/* Category */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="courseCategory" className="text-sm font-medium">
          Course Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          id="courseCategory"
          defaultValue=""
          {...register("courseCategory", { required: true })}
          className="rounded-md bg-richblack-700 px-3 py-2 text-sm text-white placeholder:text-richblack-400 focus:outline-none focus:ring focus:ring-yellow-400"
        >
          <option value="" disabled>
            Choose a category
          </option>
          {!loading &&
            courseCategories.map((category, index) => (
              <option key={index} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="text-xs text-pink-200">
            Course Category is required
          </span>
        )}
      </div>

      {/* tags */}
      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Tags <sup className="text-pink-200">*</sup>
        </label>
        <TagsInput tags={tags} setTags={setTags} />
      </div>

      <div>
        <UploadThumbnail thumbnail={thumbnail} setThumbnail={setThumbnail} />
      </div>

      {/* Course Benefits */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="coursebenefits" className="text-sm font-medium">
          Benefits of the course <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="coursebenefits"
          placeholder="Enter Benefits of the course"
          {...register("courseBenefits", { required: true })}
          className="min-h-[130px] rounded-md bg-richblack-700 px-3 py-2 text-sm placeholder:text-richblack-400 focus:outline-none focus:ring focus:ring-yellow-400"
        />
        {errors.courseBenefits && (
          <span className="text-xs text-pink-200">Benefits are required</span>
        )}
      </div>

      {/* Requirements Field Component */}
      <RequirementField
        name="courseRequirements"
        label="Requirements / Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      {/* Buttons */}
      <div className="flex items-center justify-end gap-x-4">
        {editCourse && (
          <button
            type="button"
            onClick={() => dispatch(setStep(2))}
            className="rounded-md bg-richblack-300 px-5 py-2 text-sm font-medium text-black transition hover:bg-richblack-200"
          >
            Continue Without Saving
          </button>
        )}

        <IconBtn text={!editCourse ? "Next" : "Save Changes"} type="submit" />
      </div>
    </form>
  );
};

export default CourseInformationForm;
