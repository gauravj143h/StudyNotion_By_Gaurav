import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

import countrycode from "../../data/countrycode.json"
const CommonForm = () => {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm();

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstname: "",
                lastname: "",
                message: "",
                phoneNo: ""
            });
        }
    }, [isSubmitSuccessful, reset]);

    const submitContactForm = async (data) => {
        console.log("Logging Data", data);
        try {
            setLoading(true);
            const response = { status: "OK" };
            console.log("Logging response", response);
            setLoading(false);
        } catch (error) {
            console.log("Error:", error.message);
            setLoading(false);
        }  
    };

    return (
       <div className="max-w-3xl mx-auto px-6 py-10 bg-richblack-500 shadow-lg rounded-lg text-black">
  <h1 className="text-3xl font-bold text-gray-800 mb-2">Get in Touch</h1>
  <p className="text-gray-600 mb-6">We'd love to hear from you. Please fill out this form.</p>

  <form onSubmit={handleSubmit(submitContactForm)} className="space-y-6">
    {/* Name Fields */}
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex flex-col w-full">
        <label htmlFor="firstname" className="text-sm font-medium text-gray-700 mb-1">First Name</label>
        <input
          type="text"
          id="firstname"
          placeholder="Enter first name"
          {...register("firstname", { required: true })}
          className="px-3 py-2 border border-richblack-400 bg-richblack-700 text-white placeholder:text-richblack-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"

        />
        {errors.firstname && <span className="text-red-500 text-sm">Please enter your name</span>}
      </div>

      <div className="flex flex-col w-full">
        <label htmlFor="lastname" className="text-sm font-medium text-gray-700 mb-1">Last Name</label>
        <input
          type="text"
          id="lastname"
          placeholder="Enter last name"
          {...register("lastname", { required: true })}
        className="px-3 py-2 border border-richblack-400 bg-richblack-700 text-white placeholder:text-richblack-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
        {errors.lastname && <span className="text-red-500 text-sm">Please enter your last name</span>}
      </div>
    </div>

    {/* Email */}
    <div className="flex flex-col">
      <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">Email</label>
      <input
        type="email"
        id="email"
        placeholder="Enter email"
        {...register("email", { required: true })}
        className="px-3 py-2 border border-richblack-400 bg-richblack-700 text-white placeholder:text-richblack-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"

      />
      {errors.email && <span className="text-red-500 text-sm">Please enter your email</span>}
    </div>

    {/* Phone Number */}
   <div className="flex flex-col">
  <label htmlFor="phonenumber" className="text-sm font-medium text-gray-700 mb-1">
    Phone Number
  </label>

  <div className="flex flex-row gap-3 w-full">
    {/* Country Code Dropdown */}
    <div className="w-[100px]">
      <select
        id="dropdown"
        className="w-full px-2 py-2  bg-gray-100 text-sm rounded bg-richblack-700 text-white placeholder:text-richblack-300 "
        {...register("countrycode", { required: true })}
      >
        {countrycode.map((element, index) => (
          <option key={index} value={element.code}>
            {element.code} - {element.country}
          </option>
        ))}
      </select>
    </div>

    {/* Phone Number Input */}
    <div className="flex-1">
      <input
        type="number"
        id="phonenumber"
        placeholder="12345 67890"
        className="w-full px-3 py-2 rounded   bg-richblack-700 text-white placeholder:text-richblack-300 "
        {...register("phoneNo", {
          required: { value: true, message: "Please enter Phone Number" },
          maxLength: { value: 10, message: "Invalid Phone Number" },
          minLength: { value: 8, message: "Invalid Phone Number" },
        })}
      />
      {errors.phoneNo && (
        <span className="text-red-500 text-sm mt-1">{errors.phoneNo.message}</span>
      )}
    </div>
  </div>
</div>


    {/* Message */}
    <div className="flex flex-col">
      <label htmlFor="message" className="text-sm font-medium text-gray-700 mb-1">Message</label>
      <textarea
        id="message"
        rows="5"
        placeholder="Enter your message"
        {...register("message", { required: true })}
      className="px-3 py-2 border border-richblack-400 bg-richblack-700 text-white placeholder:text-richblack-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
      {errors.message && <span className="text-red-500 text-sm">Please enter the message</span>}
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
    >
      {loading ? 'Sending...' : 'Send Message'}
    </button>
  </form>
</div>

       
    );
};

export default CommonForm;
