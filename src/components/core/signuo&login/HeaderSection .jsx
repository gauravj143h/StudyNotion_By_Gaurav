import React, { useState } from 'react';

const HeaderSection = ({ heading, description,accountType,setUserType }) => {
  // const [userType, setUserType] = useState('student');

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-richblack-5 mb-2">{heading}</h1>
      <p className="text-richblack-300 mb-6">{description}</p>

      {/* Student/Instructor Switcher */}
      <div className="flex border border-richblack-600 rounded-lg p-1 w-64 mb-8 bg-richblack-500 ml-2 mr-2 gap-3">
        <button
          className={`flex-1 py-2 px-4 rounded-md transition font-medium ${
            accountType === 'Student'
              ? 'bg-richblack-800 text-richblack-200'
              : 'text-richblack-200 hover:bg-richblack-700'
          }`}
          onClick={() => setUserType('Student')}
        >
          Student
        </button>
        <button
          className={`flex-1 py-2 px-4 rounded-md transition font-medium ${
            accountType === 'Instructor'
              ? 'bg-richblack-800 text-richblack-200'
              : 'text-richblack-200 hover:bg-richblack-700'
          }`}
          onClick={() => setUserType('Instructor')}
        >
          Instructor
        </button>
      </div>
    </div>
  );
};

export default HeaderSection;
