import React, { useState } from "react";
import Tooltip from "./Tooltip";

const Header = () => {
  const [isDescriptionVisible, setDescriptionVisible] = useState(false);

  const toggleDescription = () => {
    setDescriptionVisible(!isDescriptionVisible);
  };

  return (
    <header className="p-5 py-4 mb-2 bg-blue-500">
      <h1 className="mb-4 text-2xl font-bold text-center text-white">🧐 Image AI Upscaler</h1>
      <div className={`p-2 bg-white rounded ${isDescriptionVisible ? "w-full" : "w-10"}`}>
        <div className="relative flex items-start"> {/* Use items-start instead of items-center */}
          <Tooltip text={isDescriptionVisible ? "" : ""} onClick={toggleDescription} />
          {isDescriptionVisible && (
            <div className="ml-2">
              <p>
                The AI-powered app is an image upscaling and enhancement tool. Using artificial intelligence algorithms, it can enhance the quality and resolution of images.
              </p>
              <h2 className="mt-2">
                <b>How to use Image AI Upscaler</b>
              </h2>
              <ol className="pl-6 mb-2 list-decimal">
                <li className="mb-2">Upload your image.</li>
                <li className="mb-2">Choose from a range of enhancement settings, such as sharpness adjustments or increasing the level of detail.</li>
                <li className="mb-2">Click the "Upscale & Enhance" button and let the AI algorithms do their magic.</li>
                <li>Within seconds, receive the enhanced image, ready for download and sharing.</li>
              </ol>
              <p className="text-center">- - -</p>
              <p>** <i>The free version of this app allows 5 uses per day</i></p>
              <p><b>** Pro Version coming soon...</b></p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
