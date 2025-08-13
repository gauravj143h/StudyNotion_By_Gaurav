import React from 'react'
import { Link } from 'react-router-dom'

const Course_Card = ({ course }) => {
  return (
    <div className="w-full">
      <Link to={`/course/${course?._id}`}>
{console.log("king yek j=hi he",course?.id)}
        <div className="shadow-md hover:shadow-xl hover:scale-[1.02] overflow-hidden rounded-lg">
          {/* Thumbnail */}
          <div className="w-full h-[300px]">
            
            <img 
              src={course?.thumbnail} 
              alt={course?.courseName || "Course Thumbnail"} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Course Info */}
          <div className="p-3">
            <p className="text-md font-semibold truncate">
              {course?.courseName}
            </p>
            <p className="text-sm text-gray-500">
              {`${course?.instructor?.firstName} ${course?.instructor?.lastName}`}
            </p>
          </div>

          {/* Rating & Price */}
          <div className="flex items-center justify-between px-3 pb-3">
            <span className="text-yellow-500 text-sm">⭐ {course?.rating || "4.5"}</span>
            <p className="text-md font-bold text-blue-600">
              ₹{course?.price}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}


export default Course_Card
