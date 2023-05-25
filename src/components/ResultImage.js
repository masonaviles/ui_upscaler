import React from "react";

const ResultImage = ({ resultImage, handleSaveImage }) => {
  return (
    <div className="mt-4">
      <button
        onClick={handleSaveImage}
        className="px-4 py-2 mx-auto mb-4 text-white bg-blue-500 rounded sm:mx-0 sm:ml-auto hover:bg-blue-600"
      >
        Save Image
      </button>

      <img
        src={resultImage}
        alt="Upscaled"
        className="h-auto max-w-full mb-4"
      />
    </div>
  );
};

export default ResultImage;
