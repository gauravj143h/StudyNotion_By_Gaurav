// src/components/Auth/AuthLayout.jsx
import React from 'react';

// ... existing imports ...

const AuthLayout = ({ header, form, image }) => (
  <div className="min-h-screen flex flex-col md:flex-row bg-richblack-900">
    {/* Left Section (Form) */}
    <div className="w-full md:w-1/2 flex flex-col justify-center p-4 sm:p-6 md:p-8">
      <div className="max-w-md w-full mx-auto">
        {header}
        {form}
      </div>
    </div>
    
    {/* Right Section (Image) - Hidden on small screens */}
    <div className="hidden md:block w-full md:w-1/2 bg-gray-100">
      {image}
    </div>
  </div>
);

// ... existing export ...
export default AuthLayout;