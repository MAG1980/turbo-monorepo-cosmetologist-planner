import dynamic from "next/dynamic";
import { ServerSide } from "../components/ServerSide";
import { ClientSide } from "@client/app/components/ClientSide";

const Calendar = dynamic(() => import ( "@client/app/components/Calendar"), { ssr: false })
export default function () {
  return (
    <>
      <Calendar/>
      <ClientSide/>
      <ServerSide/>
    </>
  );
}
