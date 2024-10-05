import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";


NProgress.configure({ 
    speed: 900,       // Increase the speed (default is 200)
    minimum: 3.0,     // Set minimum percentage to make it appear faster
    showSpinner: false // Disable spinner for a cleaner look
  })

const LoadingBar = () => {
  const location = useLocation();

  useEffect(() => {
    // Start progress bar on route change
    NProgress.set(10);
    NProgress.set(40);
    NProgress.set(70);
    NProgress.set(100);

  }, [location]); // Trigger on every location change

  return null; // No need to render anything
};

export default LoadingBar;
