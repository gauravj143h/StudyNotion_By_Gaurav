
// src/components/Auth/ImageSection.jsx
import React from 'react';
import bg from "../../../assets/Images/frame.png"
const ImageSection = ({ src, alt }) => (
<div className="h-full w-full flex items-center justify-center p-12 relative">
  {/* Second (background) image */}
  <div>
    <img 
      src={bg} 
      alt={alt} 
      className="object-contain max-h-full max-w-lg shadow-lg" 
    />
  </div>

  {/* First (overlay) image */}
  <div className="absolute left-[400px] top-[390px] transform -translate-x-1/2 -translate-y-1/2">
    <img 
      src={src} 
      alt={alt} 
      className="object-contain max-h-full max-w-lg shadow-lg" 
    />
  </div>
</div>

);

export default ImageSection;