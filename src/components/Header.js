import React from "react";

const Header = () => {
  return (
    <header className="p-5 py-4 mb-5 bg-blue-500">
      <h1 className="mb-4 text-2xl font-bold text-center text-white">🧐 Image AI Upscaler</h1>
      <div className="p-4 bg-white rounded">
        <p className="mb-4">
          The AI-powered app is an image upscaling and enhancement tool. Using artificial intelligence algorithms, it can enhance the quality and resolution of images.
        </p>
        <h2 className="mb-2 text-center"><b>Use Image AI Upscaler</b></h2>
        <ol className="pl-6 list-decimal">
          <li className="mb-2">Upload your image.</li>
          <li className="mb-2">Choose from a range of enhancement settings, such as sharpness adjustments or increasing the level of detail.</li>
          <li className="mb-2">Click the "Upscale & Enhance" button and let the AI algorithms do their magic.</li>
          <li>Within seconds, receive the enhanced image, ready for download and sharing.</li>
        </ol>
      </div>
    </header>
  );
};

export default Header;
