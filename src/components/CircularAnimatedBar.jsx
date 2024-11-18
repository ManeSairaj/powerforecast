"use client";

import { useEffect, useState } from "react";
import AnimatedCircularProgressBar from "./ui/AnimatedCircularProgress";

export function CircularAnimatedBar() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const handleIncrement = (prev) => {
      if (prev === 100) {
        return 100;
      }
      return prev + 10;
    };
    const interval = setInterval(() => setValue(handleIncrement), 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatedCircularProgressBar
      max={100}
      min={0}
      value={value}
      gaugePrimaryColor="rgb(79 70 229)"
      gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
    />
  );
}
