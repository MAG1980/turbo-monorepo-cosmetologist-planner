"use client";
import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(`Error fetching orders: ${error.message}`);
  }, [error]);
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex-col items-center justify-end">
          <h1 className="text-2xl text-red-500">Error fetching procedure</h1>
          <button
            className="block mx-auto bg-red-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => reset()}
          >
            Try again
          </button>
        </div>
      </div>
    </>
  );
}
