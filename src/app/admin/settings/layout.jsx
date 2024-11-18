import { VelocityScroll } from "@/components/ui/scroll-based-velocity";
import React from "react";

export default function Layout({ children }) {
  return (
    <div className="relative">
      {children}
      <div className="flex absolute bottom-1/3 -z-30 left-0 w-full justify-center items-center">
        {/* <TextHoverEffect text="Power Forecast" /> */}
        <VelocityScroll
          text={"Power Forecast"}
          default_velocity={5}
          className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-neutral-500 drop-shadow-sm dark:text-white md:text-7xl md:leading-[5rem]"
        />
      </div>
    </div>
  );
}
