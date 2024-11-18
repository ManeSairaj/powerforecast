"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RefreshButton({ onRefresh } = {}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    if (onRefresh) {
      await onRefresh();
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleClick}
      disabled={isLoading}
      aria-label="Refresh"
    >
      <motion.div
        animate={{ rotate: isLoading ? 360 : 0 }}
        transition={{
          duration: 1,
          ease: "linear",
          repeat: isLoading ? Infinity : 0,
        }}
      >
        <RefreshCw className="h-4 w-4" />
      </motion.div>
    </Button>
  );
}
