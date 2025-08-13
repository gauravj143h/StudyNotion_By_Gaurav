import React, { useEffect, useState } from 'react'
import CourseRow from './CourseRow'
import { getAllCourses } from '../../../services/operations/courseDetailsAPI'
const MyCourse = () => {
  const [courseData, setCourseData] = useState([])
  
  const fetchCourses = async () => {
    const result = await getAllCourses()
    console.log("All courses are", result)
    setCourseData(result)  // Make sure result is an array
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  return (
    <div className="p-6 min-h-screen">
      <div className="rounded-lg overflow-hidden border border-white/20 text-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/20">
              <th className="w-[40%] py-3 px-4 text-left text-gray-300 font-medium">Course</th>
              <th className="w-[10%] py-3 px-4 text-left text-gray-300 font-medium">Duration</th>
              <th className="w-[10%] py-3 px-4 text-left text-gray-300 font-medium">Price</th>
              <th className="w-[10%] py-3 px-4 text-left text-gray-300 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {courseData.length > 0 ? (
              courseData.map((element) => (
                <CourseRow key={element.id} element={element}   />
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-400">
                  No courses available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
     
    </div>
  )
}

export default MyCourse
