import React from "react";

const ImageUploader = ({ handleFileUpload }) => {
  return (
    <div className="px-2 py-3 mb-4 border border-gray-400 rounded">
      <label htmlFor="image-upload" className="mr-2 font-bold">
        Upload Image:
      </label>
      <input type="file" id="image-upload" className="w-full mt-1" onChange={handleFileUpload} />
    </div>
  );
};

export default ImageUploader;
