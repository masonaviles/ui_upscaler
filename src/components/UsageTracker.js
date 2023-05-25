import React, { useState, useEffect } from "react";

const UsageTracker = () => {
  const [usageCount, setUsageCount] = useState(0);

  const incrementUsageCount = () => {
    setUsageCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    const storedCount = localStorage.getItem('usageCount');
    if (storedCount) {
      setUsageCount(parseInt(storedCount));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('usageCount', usageCount.toString());
  }, [usageCount]);

  return null; // or you can render a specific component if needed
};

export default UsageTracker;
