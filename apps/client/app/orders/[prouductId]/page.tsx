import { API_ORDERS_URL } from "@client/common/constants";
import { log } from "next/dist/server/typescript/utils";

export default async function OrderDetails({
  params,
}: {
  params: { prouductId: string };
}) {
  const order = await fetch(`${API_ORDERS_URL}/${params.prouductId}`)
    .then((data) => data.json())
    .catch((error) => log(error));
  return (
    <div>
      OrderDetails:
      <p>order id: {order.id}</p>
      <p>order status: {order.status}</p>
    </div>
  );
}
