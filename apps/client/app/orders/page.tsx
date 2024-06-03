import { API_ORDERS_URL } from "@client/common/constants";
import { log } from "next/dist/server/typescript/utils";
import { OrderEntity } from "@server/order/entities/Order.entity";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    //Определяет заголовок по умолчанию для дочерних сегментов. Он игнорирует title.template из родительских сегментов.
    absolute: "Orders",
  },
};

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
              <Link href={`/orders/${order.id}`}>
                {order.id}: {order.status}
              </Link>
              <ul>
                {order.procedures.map((procedure) => (
                  <li key={procedure.id}>
                    <Link href={`/procedures/${procedure.id}`}>
                      {procedure.name}: {procedure.price}
                    </Link>
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
