"use client";
import { useEffect, useState } from "react";

export const ClientSide = () => {
  const [data, setData] = useState("initState");
  useEffect(() => {
    fetch("/api")
      .then((res) => res.text())
      .then((response) => setData(response))
      .catch((error) => console.log(error));

    return () => {};
  }, []);
  return <h1>Client side requested data:{data}</h1>;
};
