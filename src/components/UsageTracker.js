import React, { useState } from "react";
import '@testing-library/jest-dom/extend-expect';


const UsageTracker = ({ handleSubmit }) => {
  const [clickCount, setClickCount] = useState(0);
  const [maxClicks, setMaxClicks] = useState(2); // Adjust the maximum click limit as needed

  const handleButtonClick = () => {
    if (clickCount + 1 <= maxClicks) {
      setClickCount(clickCount + 1);
      handleSubmit(); // Invoke the handleSubmit function passed as a prop
    }
  };

  return (
    <div>
      <p>Clicks: {clickCount}</p>
      {clickCount < maxClicks ? (
        <button onClick={handleButtonClick}>Submit</button>
      ) : (
        <p>Maximum click limit reached. Access restricted.</p>
      )}
    </div>
  );
};

export default UsageTracker;
