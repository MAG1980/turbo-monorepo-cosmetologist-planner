import { API_RECEPTIONS_URL } from "@client/common/constants";
import { ReceptionEntity } from "@server/reception/entities/Reception.entity";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Receptions",
};

export default async function AllReceptions() {
  const receptions: ReceptionEntity[] = await fetch(API_RECEPTIONS_URL)
    .then((receptions) => receptions.json())
    .catch((error) => console.log(error));
  return (
    <>
      <h1>Receptions</h1>
      <ul>
        <li>Date: timeInterval: availability:</li>
        {receptions.map((reception) => (
          <li key={`${reception.date} + ${reception.timeInterval}`}>
            {reception.date.toString()} : {reception.timeInterval} :{" "}
            {reception.available.toString()}
          </li>
        ))}
      </ul>
    </>
  );
}
