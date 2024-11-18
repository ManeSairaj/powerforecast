"use client";
import DynamicInfoCard from "@/components/DynamicInfoCard";
import HistoryChartComponent from "@/components/Chart/HistoryChartComponent";
import ChartComponent from "@/components/Chart/ChartComponent";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import Topbar from "@/components/Navbar";
import UserTable from "@/components/Table/UserTable";
import { Suspense } from "react";
import LightningLoader from "@/components/Loader/LightningLoader";
// import ThunderLoadingAnimation from "@/components/Loader/LightningRing";

export default function Home() {
  return (
    <>
      <Topbar />
      <Suspense
        fallback={
          <div className="flex h-full w-full justify-center items-center">
            <LightningLoader />
          </div>
        }
      >
        <div className="h-full p-8 w-screen flex justify-center items-center">
          <UserTable />
        </div>
      </Suspense>
    </>
  );
}
