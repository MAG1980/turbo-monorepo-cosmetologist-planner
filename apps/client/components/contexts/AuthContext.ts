import { createContext, Dispatch, SetStateAction } from "react";

export const AuthContext = createContext<{
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
}>({ isAuth: false, setIsAuth: () => {} });
