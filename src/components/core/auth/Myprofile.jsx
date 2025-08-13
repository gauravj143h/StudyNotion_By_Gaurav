import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CommonButton from "../../common/CommonButton";
import { FiEdit2 } from "react-icons/fi";

const Myprofile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className="text-white p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      {/* Section 1: Profile Info */}
      <div className="bg-richblack-800 p-6 rounded-md flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <img
            src={user?.image}
            alt="Profile"
            className="w-[60px] h-[60px] rounded-full object-cover border border-richblack-600"
          />
          <div>
            <p className="text-lg font-semibold">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>
        <CommonButton
          text="Edit"
          icon={<FiEdit2 />}
          onClick={() => navigate("/dashboard/settings")}
        />
      </div>

      {/* Section 2: About */}
      <div className="bg-richblack-800 p-6 rounded-md mb-6">
        <div className="flex justify-between items-center mb-2">
          <p className="text-lg font-semibold">About</p>
          <CommonButton
            text="Edit"
            icon={<FiEdit2 />}
             onClick={() => navigate("/dashboard/settings")}
          />
        </div>
        <p className="text-richblack-300">
          {user?.additionalDetails?.about ?? "Write something about yourself"}
        </p>
      </div>

      {/* Section 3: Personal Details */}
      <div className="bg-richblack-800 p-6 rounded-md">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold">Personal Details</p>
          <CommonButton
            text="Edit"
            icon={<FiEdit2 />}
             onClick={() => navigate("/dashboard/settings")}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DetailItem label="First Name" value={user?.firstName} />
          <DetailItem label="Email" value={user?.email} />
          <DetailItem
            label="Gender"
            value={user?.additionalDetails?.gender ?? "Add gender"}
          />
          <DetailItem
            label="Phone"
            value={user?.additionalDetails?.contactNumber ?? "Add phone"}
          />
          <DetailItem
            label="Date of Birth"
            value={user?.additionalDetails?.dateOfBirth ?? "Add DOB"}
          />
        </div>
      </div>
    </div>
  );
};

// Reusable item block for personal info
const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-sm text-richblack-400">{label}</p>
    <p className="text-base">{value}</p>
  </div>
);

export default Myprofile;
