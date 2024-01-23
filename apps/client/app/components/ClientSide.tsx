"use client";
import { useEffect, useState } from "react";
import { trpc } from "@client/app/trpc";

export const ClientSide = () => {
  const [data, setData] = useState("initState");
  useEffect(() => {
    /*    fetch('/api')
          .then((res) => res.text())
          .then((response) => setData(response))
          .catch((error) => console.log(error));*/

    trpc.hello
      .query({ name: "Client Side" })
      .then((response) => setData(response));

    return () => {};
  }, []);
  return <h1>Client side requested data:{data}</h1>;
};
