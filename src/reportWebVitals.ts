// reportWebVitals.ts
// ----------------------------------------------------
// This file is responsible for measuring and reporting performance metrics
// in your React application. It uses the `web-vitals` library to collect
// important performance metrics such as CLS (Cumulative Layout Shift), FID
// (First Input Delay), FCP (First Contentful Paint), LCP (Largest Contentful Paint),
// and TTFB (Time to First Byte).
//
// These metrics help evaluate the user experience and can be used to improve
// performance in a meaningful way.
//
// By default, these metrics can be logged to the console or sent to an analytics endpoint.
// The function `reportWebVitals` is designed to be called in `index.tsx` to track
// the app's performance.
// ----------------------------------------------------

import { ReportHandler } from 'web-vitals'; // Import the ReportHandler type from the web-vitals package

// Function to report web vitals performance metrics
// `onPerfEntry` is an optional parameter. If provided and it's a function, 
// the performance metrics will be captured and passed to the handler.
const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamically import the 'web-vitals' package to measure specific web vitals
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Get and report each metric using the provided `onPerfEntry` handler
      getCLS(onPerfEntry);  // Measures Cumulative Layout Shift (visual stability)
      getFID(onPerfEntry);  // Measures First Input Delay (interactivity)
      getFCP(onPerfEntry);  // Measures First Contentful Paint (visual loading)
      getLCP(onPerfEntry);  // Measures Largest Contentful Paint (load performance)
      getTTFB(onPerfEntry); // Measures Time to First Byte (backend response speed)
    });
  }
};

export default reportWebVitals;  // Export the function to be used in the app
