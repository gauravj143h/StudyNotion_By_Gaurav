import React, { useState } from "react";

const TagsInput = ({ tags, setTags, placeholder = "Enter a tag" }) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        setTags([...tags, input.trim()]);
        setInput("");
      }
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="w-full">
      {/* Tags Display */}
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm"
          >
            {tag}
            <button
              type="button"
              className="ml-1 text-red-500 hover:text-red-700"
              onClick={() => removeTag(index)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {/* Input */}
      <input
        type="text"
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full rounded-md bg-richblack-700 px-3 py-2 text-sm text-white placeholder:text-richblack-400 focus:outline-none focus:ring focus:ring-yellow-400"
      />
    </div>
  );
};

export default TagsInput;
