import React from "react";

const ImageUploader = ({ handleFileUpload }) => {
  return (
    <div>
      <label htmlFor="image-upload" className="font-bold">
        Upload Image:
      </label>
      <input type="file" id="image-upload" onChange={handleFileUpload} />
    </div>
  );
};

export default ImageUploader;
