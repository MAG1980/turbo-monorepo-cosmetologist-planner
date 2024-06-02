import { API_ORDERS_URL } from "@client/common/constants";
import { log } from "next/dist/server/typescript/utils";
import { OrderEntity } from "@server/order/entities/Order.entity";

export default async function Orders() {
  const orders: { items: OrderEntity[] } | undefined = await fetch(
    API_ORDERS_URL,
  )
    .then((data) => data.json())
    .catch((error) => log(error));
  return (
    <div>
      Orders:
      {orders ? (
        <ul>
          {orders.items.map((order) => (
            <li key={order.id}>
              {order.id}: {order.status}
              <ul>
                {order.procedures.map((procedure) => (
                  <li key={procedure.id}>
                    {procedure.name}: {procedure.price}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders</p>
      )}
    </div>
  );
}
