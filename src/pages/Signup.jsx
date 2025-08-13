// src/pages/Signup.jsx
import React, { useState } from 'react';
import AuthLayout from '../components/core/signuo&login/AuthLayout';
import HeaderSection from '../components/core/signuo&login/HeaderSection ';
import FormSection from '../components/core/signuo&login/FormSection';
import Poster from '../components/core/signuo&login/Poster';
import Button from '../components/core/HomePage/Button';
import post from "../assets/Images/signup.webp"
import HighlightText from '../components/core/HomePage/HighlightText';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from 'react-hot-toast';
import { setSignupData } from '../slice/authSlice';
import { sendOtp } from '../services/operations/authAPI';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Signup = () => {


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [accountType, setUserType] = useState('Student');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formdata, setfromdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "",
    phone: "",
    password: "",
    confirmPassword: "",
  
  });

  const { firstName, lastName, email, password, confirmPassword } = formdata
  const handleChange = (e) => {
    const { name, value } = e.target;
    setfromdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }
    // console.log("signup data ", formdata)
    const signupData = {
      ...formdata,
      accountType,
    }
// console.log("Signup datta" , signupData)
    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData))
    console.log("signupdata slice" , signupData)
    // Send OTP to user for verification
    dispatch(sendOtp(formdata.email, navigate))

    // Reset
    setfromdata({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
   
  }

  return (
    <AuthLayout
      header={
        <HeaderSection
          heading={<>Joins the millions learning to code with StudyNotion for free</>}
          accountType={accountType}
          setUserType={setUserType}
          description={
            <>
              {' '}
              <span className='block' >
                <HighlightText text="Education to future-proof your career" />
              </span>
            </>
          }
        />
      }
      form={
        <FormSection onSubmit={handleOnSubmit}>
          <div className="space-y-6 sm:space-y-6">
            {/* First & Last Name */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <label htmlFor="firstName" className="block text-sm font-medium text-white mb-1">
                  First Name<span className="text-red-500">*</span>
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter first name"
                  className="w-full p-3 border-gray-600 rounded-md bg-[#161D29] text-white"
                  value={formdata.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-full">
                <label htmlFor="lastName" className="block text-sm font-medium text-white mb-1">
                  Last Name<span className="text-red-500">*</span>
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Enter last name"
                  className="w-full p-3 border-gray-600 rounded-md bg-[#161D29] text-white"
                  value={formdata.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                Email Address<span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email address"
                className="w-full p-3 border-gray-600 rounded-md bg-[#161D29] text-white"
                value={formdata.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone Code & Number */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/3">
                <label htmlFor="countryCode" className="block text-sm font-medium text-white mb-1">
                  Country Code<span className="text-red-500">*</span>
                </label>
                <input
                  id="countryCode"
                  name="countryCode"
                  type="text"
                  placeholder="+91"
                  className="w-full p-3 border-gray-600 rounded-md bg-[#161D29] text-white"
                  value={formdata.countryCode}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-full sm:w-2/3">
                <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">
                  Phone Number<span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="12345 67890"
                  className="w-full p-3 border-gray-600 rounded-md bg-[#161D29] text-white"
                  value={formdata.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password & Confirm Password */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Password Field */}
              <div className="w-full relative">
                <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
                  Create Password<span className="text-red-500">*</span>
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className="w-full p-3 pr-10 border-gray-600 rounded-md bg-[#161D29] text-white"
                  value={formdata.password}
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

              {/* Confirm Password Field */}
              <div className="w-full relative">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-1">
                  Confirm Password<span className="text-red-500">*</span>
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className="w-full p-3 pr-10 border-gray-600 rounded-md bg-[#161D29] text-white"
                  value={formdata.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <span
                  className="absolute right-3 top-11 text-xl text-gray-400 cursor-pointer"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-md"
              >
                Create Account
              </button>
            </div>
          </div>
        </FormSection>
      }
      image={<Poster src={post} alt="Join our community" />}
    />
  );
};

export default Signup;
