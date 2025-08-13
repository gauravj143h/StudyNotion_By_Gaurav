import React, { useState } from "react";

const UploadThumbnail = ({ setThumbnail, thumbnail }) => {
  const [previewUrl, setPreviewUrl] = useState(null); 
  const [fileType, setFileType] = useState(""); // To track file type (image or video)

  // Handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setPreviewUrl(URL.createObjectURL(file)); // Preview
      setFileType(file.type.startsWith("image") ? "image" : "video"); // Check file type
    }
  };

  return (
    <div className="flex flex-col w-full">
      <label className="text-sm text-white font-medium">
        Upload File (Image or Video) <sup className="text-pink-200">*</sup>
      </label>

      {/* Upload Input */}
      <div className="flex justify-center mb-4">
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="cursor-pointer text-sm text-white file:py-2 file:px-6 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-black hover:file:bg-yellow-300"
        />
      </div>

      {/* Preview Section */}
      {previewUrl && (
        <div className="w-[80%] h-[250px] m-auto overflow-hidden">
          {fileType === "image" ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full rounded-md border border-richblack-600 object-cover"
            />
          ) : (
            <video
              src={previewUrl}
              controls
              className="w-full rounded-md border border-richblack-600 object-cover"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default UploadThumbnail;
