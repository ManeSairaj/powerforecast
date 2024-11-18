"use client";
import Topbar from "@/components/Navbar";
import HomeComponent from "@/components/HomeComponent";

const page = () => {
  return (
    <>
      <div className="h-fit w-screen flex flex-col flex-wrap">
        <Topbar />
        <HomeComponent />
      </div>
    </>
  );
};

export default page;
