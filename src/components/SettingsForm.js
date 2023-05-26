import React, { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";

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
  const [remainingTime, setRemainingTime] = useState(15 * 60); // 15 minutes in seconds
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleCaptchaChange = (value) => {
    setIsCaptchaVerified(!!value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:space-y-4" netlify="true">
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
      <ReCAPTCHA
        sitekey="6Lfl3D8mAAAAANqm-CKEGTlDMPVUYF1Swt_xickj"
        onChange={handleCaptchaChange}
      />
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        disabled={isLoading || remainingTime <= 0 || !isCaptchaVerified}
      >
        {isLoading
          ? "Loading..."
          : remainingTime <= 0
          ? "Max times reached"
          : "Upscale & Enhance"}
      </button>
    </form>
  );
};

export default SettingsForm;
