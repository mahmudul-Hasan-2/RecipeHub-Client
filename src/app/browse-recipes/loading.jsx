"use client";

import React from "react";
import { Spinner } from "@heroui/react";

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background gap-6">
      <Spinner
        size="lg"
        color="primary"
        label={
          <span className="text-primary font-bold">
            Fetching delicious data...
          </span>
        }
      />
      <p className="text-default-400 text-sm animate-pulse">
        Preparing your recipe experience...
      </p>
    </div>
  );
};

export default LoadingPage;
