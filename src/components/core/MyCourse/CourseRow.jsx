import React, { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import ConformationModal from "../../common/ConformationModal"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCourse, fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../slice/courseSlice';

const CourseRow = ({ element }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null); // ✅ fixed naming
  const { token } = useSelector((state) => state.auth);

  const handleConfirmDelete = async (courseId) => {
    await deleteCourse({ courseId: courseId }, token);
    const result = await fetchInstructorCourses(token);
    if (result) {
      dispatch(setCourse(result));
    }
    setConfirmationModal(null);
  }

  return (
    <>
      <tr>
        <td className="px-4 py-4">
          <div className="flex gap-4 items-start">
            <img
              src={element.thumbnail}
              alt={element.title}
              className="w-[230px] h-[140px] rounded-md object-cover"
            />
            <div>
              <h2 className="font-semibold text-lg">{element.courseName}</h2>
              <p className="text-sm text-gray-300 mb-2">{element.courseDescription}</p>
              <p className="text-xs text-gray-400">
                Created: {element.createdAt} | {element.createdTime}
              </p>
              <span
                className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${
                  element.status === 'Published'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-pink-500 text-white'
                }`}
              >
                {element.status}
              </span>
            </div>
          </div>
        </td>
        <td className="px-4 py-4 align-top">2h 30m</td>
        <td className="px-4 py-4 align-top">{element.price}</td>
        <td className="px-4 py-4 align-top">
          <div className="flex items-center gap-2">
            <button className="hover:text-yellow-400 "onClick={() => {
                      navigate(`/dashboard/edit-course/${element._id}`)
                    }}>
              <Pencil size={16} />
            </button>
            <button
              className="hover:text-red-400"
              onClick={() =>
                setConfirmationModal({
                  text1: "Are you sure?",
                  text2: "This course will be permanently deleted from the database.",
                  btn1Text: "Delete",
                  btn2Text: "Cancel",
                  btn1Handler: () => handleConfirmDelete(element._id),
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
            >
              <Trash2 size={16} />
            </button>
          </div>
        </td>
      </tr>

      {/* ✅ Modal outside <tr> */}
      {confirmationModal && <ConformationModal modalData={confirmationModal} />}
    </>
  )
}

export default CourseRow;
