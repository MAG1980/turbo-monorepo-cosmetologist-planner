import dynamic from "next/dynamic";
import { ClientSide } from "@client/app/components/ClientSide";
import { ServerSide } from "@client/app/components/ServerSide";

const Calendar = dynamic(() => import("@client/app/components/Calendar"), {
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
