import React, { useState } from "react";
import AuthLayout from "../components/core/signuo&login/AuthLayout";
import HeaderSection from "../components/core/signuo&login/HeaderSection ";
import FormSection from "../components/core/signuo&login/FormSection";
import Poster from "../components/core/signuo&login/Poster";
import Button from "../components/core/HomePage/Button";
import post from "../assets/Images/login.webp";
import HighlightText from "../components/core/HomePage/HighlightText";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { login } from "../services/operations/authAPI";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
 

  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setUserType] = useState('Student');
   const dispatch = useDispatch()
   const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "", 
    password: "",
    // accountType
  });

  const { email, password } = formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Login logic here using formData.email and formData.password
    dispatch(login(email,password,navigate)) ;
    console.log("Login submitted", email,password,navigate);
  };

  return (
    <AuthLayout
      header={
        <HeaderSection
          heading={<>Welcome Back</>}
          accountType={accountType}
          setUserType={setUserType}
          description={
            <>
              Build Skills For today, tomorrow, and beyond{" "}
              <span>
                <HighlightText text="Education to future-proof your career" />
              </span>
            </>
          }
        />
      }
      form={
        <FormSection onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white mb-1"
              >
                Email Address<span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email address"
                className="w-full p-3 border-gray-600 rounded-md bg-[#161D29] text-white"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Input */}
            <div className=" relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white mb-1"
              >
                Password<span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="w-full p-3 pr-10 border-gray-600 rounded-md bg-[#161D29] text-white"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className="absolute right-3 top-11 text-xl text-gray-400 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="text-right">
              <a
                href="/forgotpass"
                className="text-blue-600 text-sm hover:underline"
              >
                Forgot password?
              </a>
            </div>
          </div>

          <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-md"
              >
                Login
              </button>
            </div>
        </FormSection>
      }
      image={<Poster src={post} alt="Learning experience" />}
    />
  );
};

export default Login;
