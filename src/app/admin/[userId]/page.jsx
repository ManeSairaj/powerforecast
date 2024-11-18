"use client";

import HomeComponent from "@/components/HomeComponent";
import Topbar from "@/components/Navbar";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const params = useParams();
  console.log(params);

  useEffect(() => {
    if (params?.userId) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

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
