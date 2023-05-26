import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ImageUploader from "./components/ImageUploader";
import SettingsForm from "./components/SettingsForm";
import ResultImage from "./components/ResultImage";
import LoadingSpinner from "./components/LoadingSpinner";
import "./App.css";

const App = () => {
  const [isGeneralIncognito, setIsGeneralIncognito] = useState(false);
  const [isMobileChromeIncognito, setIsMobileChromeIncognito] = useState(false);
  const [isMobileSafariIncognito, setIsMobileSafariIncognito] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [sizeFactor, setSizeFactor] = useState(2);
  const [noiseCancellation, setNoiseCancellation] = useState(0);
  const [colorEnhancement, setColorEnhancement] = useState(0);
  const [sharpening, setSharpening] = useState(0);
  const [resultImage, setResultImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiRequests, setApiRequests] = useState(
    localStorage.getItem('apiRequests') || 0
  );

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

    // Check if user is in incognito mode
    if (isGeneralIncognito || isMobileChromeIncognito || isMobileSafariIncognito) {
      alert("API requests are not allowed in incognito mode.");
      return;
    }
  
    const storedApiRequests = localStorage.getItem('apiRequests');
    const storedDate = localStorage.getItem('date');
  
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const storedDay = Number(storedDate);
  
    if (storedApiRequests && currentDay === storedDay) {
      const storedRequests = Number(storedApiRequests);
      if (storedRequests >= 5) {
        alert("You have reached the maximum limit of API requests for today.");
        return;
      }
      setApiRequests(storedRequests + 1);
    } else {
      setApiRequests(1);
      localStorage.setItem('date', currentDay.toString());
    }
  
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

  useEffect(() => {
    const checkGeneralIncognito = () => {
      try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
      } catch (error) {
        setIsGeneralIncognito(true);
      }
    };
  
    checkGeneralIncognito();
  }, []);

  useEffect(() => {
    const checkMobileChromeIncognito = async () => {
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        const { usage, quota } = await navigator.storage.estimate();
        setIsMobileChromeIncognito(usage < quota * 0.1); // Check if usage is less than 10% of quota
      } else {
        setIsMobileChromeIncognito(false); // Storage API not supported, cannot determine incognito mode
      }
    };
    
    const checkMobileSafariIncognito = () => {
      if ('webkitTemporaryStorage' in window) {
        window.webkitTemporaryStorage.queryUsageAndQuota(
          (usedBytes, grantedBytes) => {
            setIsMobileSafariIncognito(usedBytes === 0 && grantedBytes === 0); // Check if used and granted bytes are both 0
          },
          () => {
            setIsMobileSafariIncognito(false); // Error occurred, cannot determine incognito mode
          }
        );
      } else {
        setIsMobileSafariIncognito(false); // Temporary Storage API not supported, cannot determine incognito mode
      }
    };
    

    checkMobileChromeIncognito();
    checkMobileSafariIncognito();
  }, []);

  console.log('isGeneralIncognito:', isGeneralIncognito);
  console.log('isMobileChromeIncognito:', isMobileChromeIncognito);
  console.log('isMobileSafariIncognito:', isMobileSafariIncognito);
  
  useEffect(() => {
    const storedApiRequests = localStorage.getItem('apiRequests');
    console.log('Retrieved API requests:', storedApiRequests);
  
    if (storedApiRequests) {
      setApiRequests(Number(storedApiRequests));
    }
  }, []);
  
  useEffect(() => {
    console.log('Setting API requests:', apiRequests);
    localStorage.setItem('apiRequests', apiRequests.toString());
  }, [apiRequests]);

  if (isGeneralIncognito || isMobileChromeIncognito || isMobileSafariIncognito) {
    return (
      <div className="container h-screen mx-auto">
        <div className="w-11/12 p-4 mx-auto mt-5 border rounded lg:w-1/2 lg:mx-auto bg-gray-50 drop-shadow-xl">
          <Header />
          <h1>❌ This App cannot be used in incognito mode. ❌</h1>
          <p><b>Please disable incognito mode to use this app.</b></p>
        </div>
      </div>
    );
  }
  
  // Render
  return (
    <div className="container h-screen mx-auto">
      <div className="w-11/12 p-4 mx-auto mt-5 border rounded lg:w-1/2 lg:mx-auto bg-gray-50 drop-shadow-xl">
        <Header />
        <div className="mb-2 text-center">
          Free Upscales: {apiRequests} / 5
        </div>
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
          isSubmitDisabled={apiRequests >= 5}
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
    </div>
  );
};

export default App;
