import React from "react";
import * as Icons from "react-icons/vsc";
import { NavLink, useLocation, matchPath } from "react-router-dom";

const SidebarLink = ({ link, iconName }) => {
  const Icon = Icons[iconName];
  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath(route, location.pathname) !== null;
  };

  return (
    <NavLink
      to={link.path}
      className={`relative flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium 
        transition-all duration-200 
        ${matchRoute(link.path)
          ? "bg-yellow-200 text-black font-semibold"
          : "hover:bg-richblack-700 hover:text-yellow-200 text-white"}`}
    >
      {/* Left Indicator */}
      <span
        className={`absolute left-0 top-0 h-full w-1 rounded-r-full bg-yellow-500 transition-all 
          ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}
      ></span>

      <Icon className="text-lg" />
      <span>{link.name}</span>
    </NavLink>
  );
};

export default SidebarLink;
