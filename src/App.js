import React, { useState } from "react";
import Header from "./components/Header";
import ImageUploader from "./components/ImageUploader";
import SettingsForm from "./components/SettingsForm";
import ResultImage from "./components/ResultImage";
import LoadingSpinner from "./components/LoadingSpinner";
import "./App.css";

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
  
  
// Render
return (
  <div className="container w-1/2 p-4 mx-auto mt-5 border rounded bg-gray-50 drop-shadow-xl">
    <Header />
    <ImageUploader handleFileUpload={handleFileUpload} />
    <SettingsForm
      sizeFactor={sizeFactor}
      handleSizeFactorChange={handleSizeFactorChange}
      noiseCancellation={noiseCancellation}
      handleNoiseCancellationChange={handleNoiseCancellationChange}
      colorEnhancement={colorEnhancement}
      handleColorEnhancementChange={handleColorEnhancementChange}
      sharpening={sharpening}
      handleSharpeningChange={handleSharpeningChange}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
    />
    {isLoading ? (
      <LoadingSpinner />
    ) : resultImage ? (
      <ResultImage
        resultImage={resultImage}
        handleSaveImage={handleSaveImage}
      />
    ) : null}
  </div>
);
};

export default App;