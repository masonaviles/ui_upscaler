import React, { useState } from "react";
import './App.css';


const App = () => {
  const [imageFile, setImageFile] = useState(null);
  const [sizeFactor, setSizeFactor] = useState(2);
  const [noiseCancellation, setNoiseCancellation] = useState(0);
  const [colorEnhancement, setColorEnhancement] = useState(0);
  const [sharpening, setSharpening] = useState(0);
  const [resultImage, setResultImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      const response = await fetch(url, options);
      const result = await response.blob();
      setResultImage(URL.createObjectURL(result));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleSaveImage = () => {
    if (resultImage) {
      const link = document.createElement('a');
      link.href = resultImage;
      const originalFileName = imageFile.name;
      let upscaleFactor = '';
  
      if (sizeFactor === 2) {
        upscaleFactor = '_x2';
      } else if (sizeFactor === 3) {
        upscaleFactor = '_x3';
      } else if (sizeFactor === 4) {
        upscaleFactor = '_x4';
      }
  
      let additionalInfo = '';
  
      if (noiseCancellation > 0) {
        additionalInfo += `_noise${noiseCancellation}`;
      }
  
      if (colorEnhancement > 0) {
        additionalInfo += `_color${colorEnhancement}`;
      }
  
      if (sharpening > 0) {
        additionalInfo += `_sharp${sharpening}`;
      }
  
      const newFileName = originalFileName.replace(/\.[^/.]+$/, "") + upscaleFactor + additionalInfo + ".png";
      link.download = newFileName;
      link.click();
    }
  };
  
  

  return (
    <div className="container w-1/2 p-4 mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="image-upload" className="font-bold">
            Upload Image:
          </label>
          <input type="file" id="image-upload" onChange={handleFileUpload} />
        </div>
        <div>
          <label htmlFor="size-factor" className="font-bold">
            Upscale Factor:
          </label>
          <select
            id="size-factor"
            value={sizeFactor}
            onChange={handleSizeFactorChange}
            className="w-full p-2 bg-gray-100 border border-gray-300 rounded"
          >
            <option value={2}>2x</option>
            <option value={3}>3x</option>
            <option value={4}>4x</option>
          </select>
        </div>
        <div>
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
            className="w-full"
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
            className="w-full"
          />
        </div>
        <div>
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
            className="w-full"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      {resultImage && (
        <div className="mt-4">
          <button
            onClick={handleSaveImage}
            className="px-4 py-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Save Image
          </button>
          <img src={resultImage} alt="Upscaled Image" className="h-auto max-w-full mb-4" />
        </div>
      )}
    </div>
  );
};

export default App;
