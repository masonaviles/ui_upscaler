import React, { useEffect } from "react";

const App = () => {
  useEffect(() => {
    const url = 'https://ai-picture-upscaler.p.rapidapi.com/supersize-image';
    const data = new FormData();
    data.append('image', '');
    data.append('sizeFactor', '2');
    data.append('imageStyle', 'default');
    data.append('noiseCancellationFactor', '0');

    const options = {
      method: 'POST',
      headers: {
        'X-RapidAPI-Key': '810b826f54mshb2e4e8eab18545fp13dd8ajsn9dcd2fcf7fbe',
        'X-RapidAPI-Host': 'ai-picture-upscaler.p.rapidapi.com'
      },
      body: data
    };

    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return <div>Hello, React!</div>;
};

export default App;
