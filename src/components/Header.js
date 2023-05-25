import React, { useState } from "react";

const Header = () => {
  const [isDescriptionVisible, setDescriptionVisible] = useState(false);

  const toggleDescription = () => {
    setDescriptionVisible(!isDescriptionVisible);
  };

  return (
    <header className="p-5 py-4 mb-5 bg-blue-500">
      <h1 className="mb-4 text-2xl font-bold text-center text-white">🧐 Image AI Upscaler</h1>
      <div className={`p-2 bg-white rounded ${isDescriptionVisible ? 'w-full' : 'w-10'}`}>
        <div className="flex items-center">
          <button
            className="flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full"
            onClick={toggleDescription}
          >
            <span className="text-gray-600 text-l">{isDescriptionVisible ? "-" : "?"}</span>
          </button>
        </div>
        {isDescriptionVisible && (
          <div className="mx-1 my-2">
            <p>
              The AI-powered app is an image upscaling and enhancement tool. Using artificial intelligence algorithms, it can enhance the quality and resolution of images.
            </p>
            <h2 className="flex-grow my-1">
              <b>How to use Image AI Upscaler</b>
            </h2>
            <ol className="pl-6 list-decimal">
              <li className="mb-2">Upload your image.</li>
              <li className="mb-2">Choose from a range of enhancement settings, such as sharpness adjustments or increasing the level of detail.</li>
              <li className="mb-2">Click the "Upscale & Enhance" button and let the AI algorithms do their magic.</li>
              <li>Within seconds, receive the enhanced image, ready for download and sharing.</li>
            </ol>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
