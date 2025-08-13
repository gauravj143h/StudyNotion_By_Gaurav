import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import Button from "../core/HomePage/Button";
import { FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import ProfileDashboard from "../core/auth/ProfileDashboard";
import apiconnector from "../../services/apiconnector";
import { categories } from "../../services/api";
import { IoCartOutline } from "react-icons/io5";
const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  // Dummy categories; in the future, replace with data from backend
  const [cat, setcategories] = useState([]); // or e.g. ['Technology', 'Health', 'Finance']

  const fetchcat = async () => {
    try {
      const result = await apiconnector("GET", categories.CATEGORIES_API);
      console.log("Printing sublinks result", result);
      setcategories(result.data.data);
    } catch (err) {
      console.log("while fetching cat data get this error ", err);
    }
  };
  useEffect(() => {
    fetchcat();
  }, []);
  return (
    <div className="flex  items-center border-b-[1px] justify-center h-[60px] border-b-richblack-700">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <div>
          <img src={logo} alt="" className="h-[30px]" />
        </div>

        <div className="">
          <ul className="flex flex-row justify-center gap-10 text-white">
            <li>
              <a
                href="/"
                className="no-underline text-white hover:text-gray-300"
              >
                Home
              </a>
            </li>
            <li
              className="relative"
              //   onMouseEnter={() => setDropdownOpen(true)}
              //   onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                className="no-underline text-white hover:text-gray-300 focus:outline-none flex flex-row gap-1"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Categories{" "}
                <FaChevronDown className="text-sm  items-center justify-center mt-[6px]" />
              </button>

              {dropdownOpen && (
                <ul className="absolute top-full left-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-10">
                  {cat.length > 0 ? (
                    cat.map((item, index) => (
                      <Link
                        to={`/catalog/${item?.name
                          ?.split(" ")
                          .join("-")
                          .toLowerCase()}`}
                        onClick={() => setDropdownOpen(false)}
                      >
                        <li
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          {item.name}{" "}
                          {/* assuming category objects have a `name` property */}
                        </li>
                      </Link>
                    ))
                  ) : (
                    <li className="px-4 py-2 text-gray-500">No data</li>
                  )}
                </ul>
              )}
            </li>
            <li>
              <a
                href="/Aboutus"
                className="no-underline text-white hover:text-gray-300"
              >
                About us
              </a>
            </li>
            <li>
              <a
                href="/contactus"
                className="no-underline text-white hover:text-gray-300"
              >
                Contact us
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-row gap-5 h-[30px] items-center">
          {token === null && (
            <>
              <Button active={false} linkto={"/login"}>
                Login
              </Button>
              <Button active={false} linkto={"/signup"}>
                Signup
              </Button>
            </>
          )}

          {token != null && (
            <>
              <ProfileDashboard />
              {/* <p className="text-white">
              <IoCartOutline />
              </p> */}
            </>
          )}

          <div>
            {user && user?.accountType != "Instructor" && (
              <Link
                to="/dashboard/cart"
                className="relative text-white inline-block"
              >
                <FaShoppingCart className="text-1xl" />
                {totalItems > 0 && (
                  <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
          </div>
        </div>

        {/* loginsinup/dahbord */}
      </div>
    </div>
  );
};

export default Navbar;
