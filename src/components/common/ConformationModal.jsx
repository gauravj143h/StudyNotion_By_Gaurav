import React from 'react'
import CommonButton from './CommonButton'

const ConformationModal = ({ modalData }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-black">
        <div className="mb-4">
          <p className="text-lg font-semibold">{modalData.text1}</p>
          <p className="text-sm text-gray-700 mt-1">{modalData.text2}</p>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <CommonButton
            onClick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />
          <button
            onClick={modalData?.btn2Handler}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white transition-all bg-black"
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConformationModal
