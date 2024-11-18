"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Zap,
  Receipt,
  DollarSign,
  Icon,
  Thermometer,
  GlassWater,
} from "lucide-react";
import NumberTicker from "./ui/number-ticker";

// type InfoCardProps = {
//   numericalValue: number
//   textValue: string
//   label: string
//   icon: 'activity' | 'zap' | 'receipt' | 'dollar'
//   unit?: string
// }

// const iconMap: Record<InfoCardProps['icon'], Icon> = {
//   activity: Activity,
//   zap: Zap,
//   receipt: Receipt,
//   dollar: DollarSign,
// }

const iconMap = {
  activity: Activity,
  zap: Zap,
  receipt: Receipt,
  dollar: DollarSign,
  temp: Thermometer,
  humidity: GlassWater,
};

// export default function DynamicInfoCard({ numericalValue, textValue, label, icon, unit = '' }: InfoCardProps) {
export default function DynamicInfoCard({
  numericalValue,
  textValue,
  label,
  icon,
  unit = "",
}) {
  const [isVisible, setIsVisible] = useState(false);
  const IconComponent = iconMap[icon];

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 m-4 w-full max-w-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              {label}
            </h2>
            <IconComponent className="w-6 h-6 text-blue-500" />
          </div>
          <div className="space-y-2">
            {/* <motion.p
              key={numericalValue}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-3xl font-bold text-gray-900 dark:text-gray-100"
            >
              {numericalValue}
              {unit && <span className="text-lg ml-1">{unit}</span>}
              </motion.p> */}
            <motion.p
              key={numericalValue}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-3xl font-bold text-gray-900 dark:text-gray-100"
            >
              <NumberTicker value={numericalValue} decimalPlaces={1} />
              {unit && <span className="text-lg ml-1">{unit}</span>}
            </motion.p>
            <motion.p
              key={textValue}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-md text-gray-600 dark:text-gray-400"
            >
              {textValue}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
