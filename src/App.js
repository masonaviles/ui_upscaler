import React, { useState } from "react";

const App = () => {
  const [imageFile, setImageFile] = useState(null);
  const [sizeFactor, setSizeFactor] = useState(2);
  const [noiseCancellation, setNoiseCancellation] = useState(0);
  const [colorEnhancement, setColorEnhancement] = useState(0);
  const [sharpening, setSharpening] = useState(0);

  const handleFileUpload = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleSizeFactorChange = (event) => {
    setSizeFactor(Number(event.target.value));
  };

  const handleNoiseCancellationChange = (event) => {
    setNoiseCancellation(Number(event.target.value));
  };

  const handleColorEnhancementChange = (event) => {
    setColorEnhancement(Number(event.target.value));
  };

  const handleSharpeningChange = (event) => {
    setSharpening(Number(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = 'https://ai-picture-upscaler.p.rapidapi.com/supersize-image';
    const data = new FormData();
    data.append('image', imageFile);
    data.append('sizeFactor', sizeFactor);
    data.append('imageStyle', 'default');
    data.append('noiseCancellationFactor', noiseCancellation);

    const options = {
      method: 'POST',
      headers: {
        'X-RapidAPI-Key': '810b826f54mshb2e4e8eab18545fp13dd8ajsn9dcd2fcf7fbe',
        'X-RapidAPI-Host': 'ai-picture-upscaler.p.rapidapi.com'
      },
      body: data
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="image-upload">Upload Image:</label>
          <input type="file" id="image-upload" onChange={handleFileUpload} />
        </div>
        <div>
          <label htmlFor="size-factor">Upscale Factor:</label>
          <select id="size-factor" value={sizeFactor} onChange={handleSizeFactorChange}>
            <option value={2}>2x</option>
            <option value={3}>3x</option>
            <option value={4}>4x</option>
          </select>
        </div>
        <div>
          <label htmlFor="noise-cancellation">Noise Cancellation:</label>
          <input
            type="range"
            id="noise-cancellation"
            min={0}
            max={100}
            value={noiseCancellation}
            onChange={handleNoiseCancellationChange}
          />
        </div>
        <div>
          <label htmlFor="color-enhancement">Color Enhancement:</label>
          <input
            type="range"
            id="color-enhancement"
            min={0}
            max={100}
            value={colorEnhancement}
            onChange={handleColorEnhancementChange}
          />
        </div>
        <div>
          <label htmlFor="sharpening">Sharpening:</label>
          <input
            type="range"
            id="sharpening"
            min={0}
            max={100}
            value={sharpening}
            onChange={handleSharpeningChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
