import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import ConformationModal from "../../../common/ConformationModal";
import SubSectionModal from "./SubSectionModal";
import {
  deleteSection,
  deleteSubSection,
} from "../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../slice/courseSlice";

const NestedView = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection({
      sectionId,
      courseId: course._id,
      token,
    });

    if (result) {
      dispatch(setCourse(result));
    }
    setConfirmationModal(null);
  };

  const handleDeleteSubSection = async (sectionId, subSectionId) => {
    const result = await deleteSubSection({ sectionId, subSectionId, token });

    if (result) {
      const updatedContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      );
      dispatch(setCourse({ ...course, courseContent: updatedContent }));
    }
    setConfirmationModal(null);
  };

  return (
    <div className="space-y-4 bg-richblack-700 rounded-md p-4">
      {course?.courseContent?.map((section) => (
        <details
          key={section._id}
          open
          className="border border-richblack-600 rounded-md"
        >
          <summary className="flex items-center justify-between px-4 py-2 bg-richblack-600 cursor-pointer">
            <div className="flex items-center gap-2 text-yellow-50 font-medium">
              <RxDropdownMenu />
              <p>{section.sectionName}</p>
            </div>
            <div className="flex items-center gap-4 text-richblack-25 text-lg">
              <button
                onClick={() =>
                  handleChangeEditSectionName(section._id, section.sectionName)
                }
                className="hover:text-yellow-100 transition"
              >
                <MdEdit />
              </button>
              <button
                onClick={() =>
                  setConfirmationModal({
                    text1: "Delete this Section?",
                    text2:
                      "All lectures in this section will be permanently deleted.",
                    btn1Text: "Delete",
                    btn2Text: "Cancel",
                    btn1Handler: () => handleDeleteSection(section._id),
                    btn2Handler: () => setConfirmationModal(null),
                  })
                }
                className="hover:text-red-400 transition"
              >
                <AiFillDelete />
              </button>
              <IoMdArrowDropdown />
            </div>
          </summary>

          {/* SubSections */}
          <div className="space-y-2 px-6 py-4 bg-richblack-800 rounded-b-md">
            {section?.subSection?.map((sub) => (
              <div
                key={sub._id}
                onClick={() => setViewSubSection(sub)}
                className="flex items-center justify-between bg-richblack-600 rounded-md px-4 py-2 cursor-pointer hover:bg-richblack-500 transition"
              >
                <div className="flex items-center gap-2 text-white">
                  <RxDropdownMenu />
                  <p>{sub.title}</p>
                </div>
                <div className="flex items-center gap-4 text-lg">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditSubSection({ ...sub, sectionId: section._id });
                    }}
                    className="hover:text-yellow-100 transition"
                  >
                    <MdEdit />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmationModal({
                        text1: "Delete this Sub-section?",
                        text2:
                          "This lecture will be removed permanently from the section.",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () =>
                          handleDeleteSubSection(section._id, sub._id),
                        btn2Handler: () => setConfirmationModal(null),
                      });
                    }}
                    className="hover:text-red-400 transition"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            ))}

            {/* Add SubSection Button */}
            <button
              onClick={() => setAddSubSection(section._id)}
              className="mt-3 flex items-center gap-2 text-yellow-50 hover:text-yellow-100 transition"
            >
              <AiOutlinePlus />
              <p>Add Lecture</p>
            </button>
          </div>
        </details>
      ))}

      {/* SubSection Modal */}
      {addSubSection && (
        <SubSectionModal
          modalData={addSubSection}
          setModaldata={setAddSubSection}
          add={true}
        />
      )}
      {editSubSection && (
        <SubSectionModal
          modalData={editSubSection}
          setModaldata={setEditSubSection}
          edit={true}
        />
      )}
      {viewSubSection && (
        <SubSectionModal
          modalData={viewSubSection}
          setModaldata={setViewSubSection}
          view={true}
        />
      )}

      {/* Confirmation Modal */}
      {confirmationModal && (
        <ConformationModal modalData={confirmationModal} />
      )}
    </div>
  );
};

export default NestedView;
