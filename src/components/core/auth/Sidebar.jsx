import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sidebarLinks } from "../../../data/dashboard-links";
import SidebarLink from "./SidebarLink";
import ConformationModal from "../../common/ConformationModal";
import { logout } from "../../../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import { VscSignOut, VscSettingsGear } from "react-icons/vsc";

const Sidebar = () => {
  const [confirmationModel, setConfirmationModel] = useState(null);
  const { user, loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (profileLoading || authLoading) {
    return <div className="mt-10 text-white">Loading....</div>;
  }

  return (
    <div className="text-white min-w-[222px] border-r border-richblack-700 bg-richblack-800 px-4 py-10 flex flex-col">
      <div className="flex flex-col gap-2">
        {sidebarLinks.map((link) => {
          if (link.type && user?.accountType !== link.type) return null;
          return <SidebarLink key={link.id} link={link} iconName={link.icon} />;
        })}

        {/* Divider */}
        <div className="my-4 h-[1px] bg-richblack-600 w-full"></div>

        {/* Settings */}
        <SidebarLink
          link={{ name: "Settings", path: "/dashboard/settings" }}
          iconName="VscSettingsGear"
        />
      </div>

      {/* Logout */}
      <div className="mt-4 px-2 ml-1">
        <button
          onClick={() =>
            setConfirmationModel({
              text1: "Are you sure?",
              text2: "You will be logged out of your account.",
              btn1Text: "Logout",
              btn2Text: "Cancel",
              btn1Handler: () => dispatch(logout(navigate)),
              btn2Handler: () => setConfirmationModel(null),
            })
          }
          className="flex items-center gap-2 text-sm hover:text-yellow-400 transition-all"
        >
          <VscSignOut className="text-lg" />
          <span>Logout</span>
        </button>
      </div>

      {confirmationModel && <ConformationModal modalData={confirmationModel} />}
    </div>
  );
};

export default Sidebar;
