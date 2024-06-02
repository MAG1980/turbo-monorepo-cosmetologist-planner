import { API_RECEPTIONS_URL } from "@client/common/constants";
import { ReceptionEntity } from "@server/reception/entities/Reception.entity";

export default async function ReceptionsTimes({
  params,
}: {
  params: { slug: string[] };
}) {
  let url = API_RECEPTIONS_URL;
  const { slug } = params;

  if (slug.length === 1) {
    url += `?date=${slug[0]}`;
  }
  if (slug.length === 2) {
    url += `?date=${slug[0]}&timeInterval=${slug[1]}`;
  }
  console.log({ url });

  const data: ReceptionEntity | ReceptionEntity[] | null = await fetch(url)
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
      return null;
    });

  return (
    <>
      <h1>ReceptionsTimes</h1>
      {data && Array.isArray(data) && (
        <ul>
          {data.map((reception) => (
            <li key={reception?.date.toString() + reception?.timeInterval}>
              {reception.date.toString()} : {reception.timeInterval} :{" "}
              {reception.available.toString()}
            </li>
          ))}
        </ul>
      )}
      {data && !Array.isArray(data) && data.date && (
        <ul>
          <li>
            {data.date.toString()} : {data?.timeInterval} :{" "}
            {data.available?.toString()}
          </li>
        </ul>
      )}
      {!Array.isArray(data) && !data?.date && <p>No data</p>}
    </>
  );
}
