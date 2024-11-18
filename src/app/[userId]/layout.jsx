import Meteors from "@/components/ui/meteors";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export default function Layout({ children }) {
  return (
    <>
      <div className="absolute -left-1/3 top-0 max-w-full">
        <Meteors number={50} />
      </div>
      {children}
      <div className="fixed -z-30 top-20 opacity-25 w-screen h-screen justify-center items-center">
        <TextHoverEffect text="Power Forecast" duration={1} />
      </div>
    </>
  );
}
