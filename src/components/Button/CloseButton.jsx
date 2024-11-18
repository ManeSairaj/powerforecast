"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export default function CloseButton() {
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  const handleClose = async () => {
    setIsAnimating(true);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for animation to complete
    router.back();
  };

  const buttonVariants = {
    initial: { scale: 1, rotate: 0 },
    animate: {
      scale: [1, 1.2, 0],
      rotate: [0, 180, 360],
      transition: { duration: 0.5 },
    },
  };

  const iconVariants = {
    initial: { opacity: 1 },
    animate: { opacity: [1, 0, 1], transition: { duration: 0.5 } },
  };

  return (
    <div className="flex items-center justify-center bg-transparent">
      <motion.button
        className="p-1 dark:bg-white bg-black rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 focus:outline-none"
        onClick={handleClose}
        variants={buttonVariants}
        initial="initial"
        animate={isAnimating ? "animate" : "initial"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div variants={iconVariants}>
          <X className="w-6 h-6 text-gray-600" />
        </motion.div>
      </motion.button>
    </div>
  );
}
