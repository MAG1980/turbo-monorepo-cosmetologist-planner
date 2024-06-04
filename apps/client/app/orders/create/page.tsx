"use client";

import { useRouter } from "next/navigation";

export default function CreateOrder() {
  const router = useRouter();
  const handleClick = () => {
    console.log("Order created");
    //Перенаправление на другую страницу
    // router.push("/orders");

    //Возврат на предыдущую страницу
    // router.back()

    //Переход на следующую страницу
    // router.forward();

    //Перезапись истории браузера (невозможно вернуться назад).
    router.replace("/");
  };
  return (
    <div>
      <h1>Create Order</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        Create
      </button>
    </div>
  );
}
