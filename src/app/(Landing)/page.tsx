"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import PageLoader from "@/components/spinners/PageLoader";
import { Button } from "@/components/buttons/Button";

const Home = () => {
  const [showPageLoader, setShowPageLoader] = useState(true);
  const router = useRouter();

  // Show page loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPageLoader(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showPageLoader) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col justify-center items-center h-full gap-y-2">
      <span className="font-medium text-base text-tc_white text-center mb-4">
        Welcome to Shape Studio!
      </span>
      <h1 className="font-bold text-4xl text-tc_white text-center">
        Your Simple & Intuitive Design Editor
      </h1>
      <p className="font-normal text-15 text-tc_white text-center w-3/5 mt-3">
        Shape Studio lets you create, customize, and save designs effortlessly.
        Drag, resize, and arrange pre-built basic shapes to bring your ideas to
        life.
      </p>
      <div className="flex justify-center items-center w-full mt-4">
        <Button
          colorvariant="light"
          label="Start Design!"
          onClick={() => router.push("/studio")}
        />
      </div>
    </div>
  );
};

export default Home;
