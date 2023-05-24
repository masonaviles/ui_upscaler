import React, { useState, useEffect } from "react";
import { API_KEY } from "./config";

const App = () => {
  const [imageFile, setImageFile] = useState(null);
  const [results, setResults] = useState(null);
  const [upscaleFactor, setUpscaleFactor] = useState(1);
  const [noiseRemovalPercentage, setNoiseRemovalPercentage] = useState(0);
  const [colorEnhancementPercentage, setColorEnhancementPercentage] = useState(0);
  const [sharpeningPercentage, setSharpeningPercentage] = useState(0);

  useEffect(() => {
    // Make the request to the API
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("upscale_factor", upscaleFactor);
      formData.append("noise_removal_percentage", noiseRemovalPercentage);
      formData.append("color_enhancement_percentage", colorEnhancementPercentage);
      formData.append("sharpening_percentage", sharpeningPercentage);

      fetch("https://rapidapi.com/firdavscoder1/api/ai-picture-upscaler", {
        method: "POST",
        headers: {
          "X-RapidAPI-Key": API_KEY
        },
        body: formData
      })
        .then((response) => response.json())
        .then((results) => setResults(results));
    }
  }, [imageFile]);

  return (
    <div>
      <input
        type="file"
        id="image-file"
        onChange={(event) => setImageFile(event.target.files[0])}
      />
      <div>
        <label>Upscale factor</label>
        <input
          type="range"
          min="1"
          max="4"
          value={upscaleFactor}
          onChange={(e) => setUpscaleFactor(e.target.value)}
        />
      </div>
      <div>
        <label>Noise removal percentage</label>
        <input
          type="range"
          min="0"
          max="100"
          value={noiseRemovalPercentage}
          onChange={(e) => setNoiseRemovalPercentage(e.target.value)}
        />
      </div>
      <div>
        <label>Color enhancement percentage</label>
        <input
          type="range"
          min="0"
          max="100"
          value={colorEnhancementPercentage}
          onChange={(e) => setColorEnhancementPercentage(e.target.value)}
        />
      </div>
      <div>
        <label>Sharpening percentage</label>
        <input
          type="range"
          min="0"
          max="100"
          value={sharpeningPercentage}
          onChange={(e) => setSharpeningPercentage(e.target.value)}
        />
      </div>
      {results && <img src={results.image} alt="Upscaled Image" />}
    </div>
  );
};

export default App;
