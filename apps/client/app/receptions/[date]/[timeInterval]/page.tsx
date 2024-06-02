import { API_RECEPTIONS_URL } from "@client/common/constants";

export default async function Reception({
  params,
}: {
  params: { date: string; timeInterval: string };
}) {
  const reception = await fetch(
    `${API_RECEPTIONS_URL}/${params.date}/${params.timeInterval}`,
  )
    .then((reception) => reception.json())
    .catch((error) => console.log(error));
  return (
    <>
      <h1>Reception</h1>
      {reception ? (
        <ul>
          <li>Date: {reception.date}</li>
          <li>TimeInterval: {reception.timeInterval}</li>
          <li>Available: {reception.available.toString()}</li>
        </ul>
      ) : (
        <p>No data</p>
      )}
    </>
  );
}
