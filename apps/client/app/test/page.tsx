import dynamic from "next/dynamic";
import { ClientSide } from "@client/components/ClientSide";
import { ServerSide } from "@client/components/ServerSide";

const Calendar = dynamic(() => import("@client/components/Calendar"), {
  ssr: false,
});
export default function () {
  return (
    <>
      <Calendar />
      <ClientSide />
      <ServerSide />
    </>
  );
}
