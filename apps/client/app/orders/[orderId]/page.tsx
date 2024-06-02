import { API_ORDERS_URL } from "@client/common/constants";
import { log } from "next/dist/server/typescript/utils";
import { notFound } from "next/navigation";

export default async function OrderDetails({
  params,
}: {
  params: { orderId: string };
}) {
  const order = await fetch(`${API_ORDERS_URL}/${params.orderId}`)
    .then((data) => data.json())
    .catch((error) => log(error));
  if (!order.id) return notFound();
  return (
    <div>
      OrderDetails:
      <p>order id: {order.id}</p>
      <p>order status: {order.status}</p>
    </div>
  );
}
