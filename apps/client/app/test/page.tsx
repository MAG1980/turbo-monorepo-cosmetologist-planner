import { ServerSide } from "../components/ServerSide";
import { ClientSide } from "@client/app/components/ClientSide";

export default function () {
  return (
    <>
      <ClientSide />
      <ServerSide />
    </>
  );
}
