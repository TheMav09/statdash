// src/hooks/useWindowDimensions.ts
// ---------------------------------------------------------
// This is a custom React hook that listens for window resizing
// and returns the current window width and height.
//
// Custom hooks in React are a way to reuse stateful logic
// between components, keeping the code clean and DRY.
//
// Example Usage:
// const { width, height } = useWindowDimensions();
// ---------------------------------------------------------

import { useState, useEffect } from 'react';

// Define a type for the window dimensions state
interface WindowDimensions {
  width: number;
  height: number;
}

// Custom hook to get window dimensions
const useWindowDimensions = (): WindowDimensions => {
  // Initialize the state with the current window dimensions
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // useEffect hook to listen for window resizing and update the state accordingly
  useEffect(() => {
    // Define a function that updates the state with the current window dimensions
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add an event listener to the window resize event
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove the event listener when the component is unmounted
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array means this effect runs only on mount and unmount

  // Return the current window dimensions
  return windowDimensions;
};

export default useWindowDimensions;
