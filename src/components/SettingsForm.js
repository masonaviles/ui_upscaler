import React from "react";

const SettingsForm = ({
  sizeFactor,
  handleSizeFactorChange,
  noiseCancellation,
  handleNoiseCancellationChange,
  colorEnhancement,
  handleColorEnhancementChange,
  sharpening,
  handleSharpeningChange,
  isLoading,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:space-y-4" netlify>
      <div>
        <label htmlFor="size-factor" className="mr-2 font-bold">
          Upscale Factor:
        </label>
        <select
          id="size-factor"
          value={sizeFactor}
          onChange={handleSizeFactorChange}
          className="w-full p-2 mt-2 bg-gray-100 border border-gray-300 rounded"
        >
          <option value={2}>2x</option>
          <option value={3}>3x</option>
          <option value={4}>4x</option>
        </select>
      </div>
      <div className="my-2">
        <label htmlFor="noise-cancellation" className="mr-2 font-bold">
          Noise Cancellation:
        </label>
        <span>{noiseCancellation}</span>
        <input
          type="range"
          id="noise-cancellation"
          min={0}
          max={100}
          value={noiseCancellation}
          onChange={handleNoiseCancellationChange}
          className="w-full mt-2"
        />
      </div>
      <div>
        <label htmlFor="color-enhancement" className="mr-2 font-bold">
          Color Enhancement:
        </label>
        <span>{colorEnhancement}</span>
        <input
          type="range"
          id="color-enhancement"
          min={0}
          max={100}
          value={colorEnhancement}
          onChange={handleColorEnhancementChange}
          className="w-full mt-2"
        />
      </div>
      <div className="my-2">
        <label htmlFor="sharpening" className="mr-2 font-bold">
          Sharpening:
        </label>
        <span>{sharpening}</span>
        <input
          type="range"
          id="sharpening"
          min={0}
          max={100}
          value={sharpening}
          onChange={handleSharpeningChange}
          className="w-full mt-2"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Upscale & Enhance"}
      </button>
    </form>
  );
};

export default SettingsForm;
