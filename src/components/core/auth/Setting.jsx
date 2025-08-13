import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Axios } from "axios";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react"; // or use any delete icon you use
import ConformationModal from "../../common/ConformationModal";
import {
  updateDisplayPicture,
  updateProfile,
  deleteProfile
} from "../../../services/operations/authAPI";
import { changePassword } from "../../../services/operations/authAPI";
import UpdatePassword from "./UpdatePassword";

const Setting = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const navigate = useNavigate();
  const [form, setform] = useState({
    firstName:user?.firstName || "",
    lastName: user?.lastName ||"",
    dateOfBirth:user.additionalDetails?.dateOfBirth || "",
    gender: user.additionalDetails?.gender || "",
    contactNumber: user.additionalDetails?.contactNumber || "",
    about:user.additionalDetails?.about ||"",
  });

  const dispatch = useDispatch();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      toast.success(`Image selected: ${file.name}`);
    }
  };

  const handleprofileinfoupdate = () => {
    try {
      // Save (API call)
      console.log("uploading...");
      console.log("user is ",user.additionalDetails?.about);
      console.log("form data is " ,form)

      dispatch(updateProfile(token, form));
    } catch (e) {
      console.log("error while updating profile data", e);
    }
  };

  const handleDelete = () => {
    setSelectedImage(null);
    toast("Image selection cleared");
  };

  const [passwords, setPasswords] = useState({
   oldPassword :"", newPassword:"", confirmNewPassword :""
  });

  const handleUpdatePassword = async () => {
   try {
      await changePassword(token, passwords)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  };

  async function handleDeleteAccount() {
    try {
      dispatch(deleteProfile(token, navigate))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  const handleFileUpload = () => {
    try {
      console.log("uploading...");
      // setLoading(true)
      const formData = new FormData();
      formData.append("displayPicture", selectedImage);
      // console.log("formdata", formData)
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        // setLoading(false)
      });
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setform((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-richblack-900 text-white px-4">
      <div className="max-w-3xl w-full">
        <h1 className="text-2xl font-bold mb-6 ">Edit Profile</h1>

        {/* Image Upload Section */}
        <div className="flex items-center gap-6 mb-10 bg-richblack-700 p-8 rounded-lg shadow-lg">
          <img
            src={user?.image}
            alt="Profile"
            className="w-[60px] h-[60px] rounded-full object-cover border border-richblack-600"
          />
          <div>
            <p className="mb-2 text-sm text-richblack-200">
              Change the profile photo
            </p>
            <div className="flex gap-4">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current.click()}
                className="px-3 py-1 bg-richblack-200 text-white rounded hover:bg-richblack-600"
              >
                Select
              </button>
              <button
                onClick={handleFileUpload}
                disabled={!selectedImage}
                className={`px-3 py-1 rounded ${
                  selectedImage
                    ? "bg-yellow-500 text-black hover:bg-yellow-400"
                    : "bg-gray-500 text-white cursor-not-allowed"
                }`}
              >
                Upload
              </button>
              {selectedImage && (
                <button
                  className="bg-red-600 px-3 py-1 rounded text-white hover:bg-red-700 transition"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              )}
            </div>
            {selectedImage && (
              <p className="text-xs text-richblack-200 mt-2">
                Selected file:{" "}
                <span className="font-semibold">{selectedImage.name}</span>
              </p>
            )}
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-6 ">Profile Information</h1>
        {/* Profile Form */}
        <form className="flex flex-col gap-6 bg-richblack-700 p-8 rounded-lg shadow-lg">
          {/* Name */}
          <div className="flex gap-5">
            <div className="flex flex-col gap-2 w-1/2">
              <label htmlFor="firstName" className="text-sm text-richblack-200">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter you first name"
                id="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="bg-richblack-800 p-2 rounded text-white outline-none border border-richblack-600 focus:border-yellow-500"
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <label htmlFor="LastName" className="text-sm text-richblack-200">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="LastName"
                placeholder="Enter you last name"
                value={form.lastName}
                onChange={handleChange}
                className="bg-richblack-800 p-2 rounded text-white outline-none border border-richblack-600 focus:border-yellow-500"
              />
            </div>
          </div>

          {/* DOB and Gender */}
          <div className="flex gap-5">
            <div className="flex flex-col gap-2 w-1/2">
              <label
                htmlFor="dateOfBirth"
                className="text-sm text-richblack-200"
              >
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                value={form.dateOfBirth}
                onChange={handleChange}
                className="bg-richblack-800 p-2 rounded text-white outline-none border border-richblack-600 focus:border-yellow-500"
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <label htmlFor="Gender" className="text-sm text-richblack-200">
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                value={form.gender}
                onChange={handleChange}
                className="bg-richblack-800 p-2 rounded text-white outline-none border border-richblack-600 focus:border-yellow-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Contact Number */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="ContactNumber"
              className="text-sm text-richblack-200"
            >
              Contact Number
            </label>
            <input
              type="text"
              name="contactNumber"
              id="contactNumber"
              value={form.contactNumber}
              onChange={handleChange}
              className="bg-richblack-800 p-2 rounded text-white outline-none border border-richblack-600 focus:border-yellow-500"
              placeholder="e.g., 9876543210"
            />
          </div>

          {/* About */}
          <div className="flex flex-col gap-2">
            <label htmlFor="About" className="text-sm text-richblack-200">
              About
            </label>
            <textarea
              name="about"
              id="about"
              rows="4"
              value={form.about}
              onChange={handleChange}
              className="bg-richblack-800 p-2 rounded text-white outline-none border border-richblack-600 focus:border-yellow-500 resize-none"
              placeholder="Write something about yourself..."
            ></textarea>
          </div>
        </form>
        {/* Buttons below the form */}
        <div className="w-8/12 flex ">
          <div className="flex gap-5 items-end mt-6">
            <button
              onClick={handleprofileinfoupdate}
              className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-400 items-end"
            >
              Save
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                setform({
                  firstName: "",
                  lastName: "",
                  dateOfBirth: "",
                  gender: "",
                  contactNumber: "",
                  about: "",
                });
                toast("Form reset.");
              }}
              className="px-4 py-2 bg-richblack-700 text-white rounded hover:bg-richblack-600"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* section 3 */}

        {/* Password Update Section */}
       <UpdatePassword/>

        {/* Section 4: Delete Account */}
        <div className="mt-10 w-12/12 border border-richblack-600 p-6 rounded bg-pink-200 opacity-70 text-white">
          <h2 className="text-lg font-semibold text-white mb-2">
            Delete Account
          </h2>
          <p className="text-sm text-white mb-6">
            Deleting your account will permanently remove all your data
            including any paid courses. This action is irreversible.
          </p>

          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Delete Account",
                text2:
                  "Are you sure you want to delete your account? This action cannot be undone. All your courses and data will be lost.",
                btn1Text: "Cancel",
                btn2Text: "Confirm Delete",
                btn1Handler: () => setConfirmationModal(null),
                btn2Handler: handleDeleteAccount,
              })
            }
            className="flex items-center gap-2 bg-red-700/10 text-red-500 border border-red-700 px-4 py-2 rounded hover:bg-red-700/20 transition"
          >
            <Trash2 size={18} />
            Delete Account
          </button>
        </div>
      </div>
      {confirmationModal?.text1 && (
        <ConformationModal modalData={confirmationModal} />
      )}
    </div>
  );
};

export default Setting;
