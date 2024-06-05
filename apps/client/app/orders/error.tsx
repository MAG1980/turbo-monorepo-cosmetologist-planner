"use client";
import { useEffect } from "react";

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.error(`Error fetching orders: ${error.message}`);
  }, [error]);
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl text-red-500">Error fetching orders</h1>
    </div>
  );
}
