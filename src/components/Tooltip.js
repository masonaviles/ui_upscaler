import React from "react";

const Tooltip = ({ text, onClick }) => (
  <div className="relative">
    <button
      className="flex items-center justify-center w-6 h-6 transition-transform duration-300 transform bg-gray-200 rounded-full hover:rotate-45"
      onClick={onClick}
    >
      <span className="text-gray-600 text-l">?</span>
    </button>
    {text && (
      <div className="absolute p-2 ml-2 text-gray-600 bg-gray-200 rounded left-full">
        {text}
      </div>
    )}
  </div>
);

export default Tooltip;
