import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Meteors from "@/components/ui/meteors";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { ThemeProvider } from "@/components/theme-provider";
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col w-full">
              <div className="absolute -left-1/3 top-0 max-w-full">
                <Meteors number={50} />
              </div>
              <div className="fixed -z-30 top-20 opacity-25 w-screen h-screen justify-center items-center">
                <TextHoverEffect text="Power Forecast" duration={1} />
              </div>
              {children}
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
