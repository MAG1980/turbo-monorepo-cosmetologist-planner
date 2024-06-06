"use client";
import { FC, ReactNode, useState } from "react";
import { AuthContext } from "@client/components/contexts";

export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}): JSX.Element => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
