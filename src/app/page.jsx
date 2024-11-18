"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  ArrowRight,
  Zap,
  PieChart,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();
  const route = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 100;
      setIsVisible(scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isVisible) {
      controls.start("visible");
    }
  }, [isVisible, controls]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const toDashboard = () => {
    route.push("/1");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="p-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2"
        >
          <Zap className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-blue-800">
            Power Forecast
          </span>
        </motion.div>
        <nav>
          <motion.ul
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex space-x-4 h-fit justify-center items-center"
          >
            {["Features", "How it Works", "Pricing", "Contact"].map((item) => (
              <motion.li key={item} variants={fadeInUp}>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {item}
                </a>
              </motion.li>
            ))}
            <motion.li className="h-fit flex justify-center items-center space-x-4">
              <SignedOut>
                <SignInButton
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-lg"
                  fallbackRedirectUrl="/1"
                />
              </SignedOut>
              <SignedIn>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-lg"
                  onClick={toDashboard}
                >
                  Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <UserButton />
              </SignedIn>
            </motion.li>
          </motion.ul>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-blue-900 mb-6"
          >
            Predict Your Energy Costs
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl text-blue-700 mb-8"
          >
            Our IoT device uses AI to forecast your energy usage and help you
            save money.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="inline-block"
          >
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
              Key Features
            </h2>
            <motion.div
              initial="hidden"
              animate={controls}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: <PieChart className="h-12 w-12 text-blue-600" />,
                  title: "Accurate Predictions",
                  description:
                    "AI-powered forecasts of your energy consumption",
                },
                {
                  icon: <TrendingUp className="h-12 w-12 text-green-600" />,
                  title: "Usage Insights",
                  description:
                    "Detailed analysis of your energy usage patterns",
                },
                {
                  icon: <DollarSign className="h-12 w-12 text-yellow-600" />,
                  title: "Cost Savings",
                  description: "Recommendations to reduce your energy bills",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-gray-50 p-6 rounded-lg shadow-md text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-blue-800 mt-4 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-20 bg-blue-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
              How It Works
            </h2>
            <motion.div
              initial="hidden"
              animate={controls}
              variants={stagger}
              className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8"
            >
              {[
                {
                  step: 1,
                  title: "Connect Device",
                  description:
                    "Plug in our IoT device to your main power supply",
                },
                {
                  step: 2,
                  title: "Gather Data",
                  description:
                    "The device collects energy usage data in real-time",
                },
                {
                  step: 3,
                  title: "Analyze",
                  description: "Our AI analyzes your consumption patterns",
                },
                {
                  step: 4,
                  title: "Predict",
                  description: "Get accurate cost predictions and saving tips",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4"
                  >
                    {item.step}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
              What Our Users Say
            </h2>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-blue-100 p-8 rounded-lg shadow-lg max-w-2xl mx-auto"
            >
              <p className="text-lg text-blue-800 italic mb-4">
                "Power Forecast has revolutionized how I manage my home's energy
                consumption. I've saved over 30% on my electricity bills since I
                started using it!"
              </p>
              <p className="text-blue-600 font-semibold">
                - Sairaj Mane, Homeowner
              </p>
            </motion.div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Saving?</h2>
            <p className="text-xl mb-8">
              Join thousands of satisfied users and take control of your energy
              costs today.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-white text-blue-600 hover:bg-blue-100 font-bold py-3 px-8 rounded-full text-lg">
                Order Your Power Forecast Device
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-blue-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Power Forecast. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
