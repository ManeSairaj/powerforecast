"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function LightningLoader({ size = 100, strokeWidth = 4 }) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const center = size / 2;
  const radius = (size - strokeWidth) / 2;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background ring */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(59, 130, 246, 0.2)"
          strokeWidth={strokeWidth}
        />

        {/* Lightning effect */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="url(#lightning-gradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1, rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* Lightning gradient */}
        <defs>
          <linearGradient
            id="lightning-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
            <stop offset="50%" stopColor="rgba(59, 130, 246, 1)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Lightning bolt */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ rotate: `${rotation}deg` }}
      >
        <motion.div
          className="w-1 h-8 bg-blue-500 rounded-full"
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1.2, opacity: 1 }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            boxShadow:
              "0 0 10px #3b82f6, 0 0 20px #3b82f6, 0 0 30px #3b82f6, 0 0 40px #3b82f6",
            transform: "translateY(-50%) rotate(15deg)",
          }}
        />
      </motion.div>
    </div>
  );
}
