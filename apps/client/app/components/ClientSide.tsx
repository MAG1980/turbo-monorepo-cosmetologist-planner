"use client";
import { useEffect, useState } from "react";
import { UserEntity } from "@server/user/entities/User.entity";
import { API_USERS_URL } from "@client/common/constants";

export const ClientSide = () => {
  const [data, setData] = useState<UserEntity[]>([]);

  useEffect(() => {
    fetch(API_USERS_URL)
      .then((res) => res.json())
      .then((response) => {
        console.log({ response: response });
        setData(response);
      })
      .catch((error) => console.log(error));

    return () => {};
  }, []);
  return (
    <section>
      <h2>Client side requested data</h2>
      <ul>
        {data.map((user) => (
          <li key={user.id}>
            {user.name} : {user.email}
          </li>
        ))}
      </ul>
    </section>
  );
};
