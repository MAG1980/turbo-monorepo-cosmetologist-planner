"use client";
import { useContext } from "react";
import { AuthContext } from "@client/components/contexts";

export const Header = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const buttonClassName = isAuth ? "bg-red-500" : "bg-green-500";
  return (
    <header
      className="flex justify-around"
      style={{ backgroundColor: "lightblue", padding: "1rem" }}
    >
      <p>Header</p>
      <button
        className={buttonClassName + " rounded-full  px-3 py-1 text-white"}
        onClick={() => setIsAuth(!isAuth)}
        type="button"
      >
        {isAuth ? "Logout" : "Login"}
      </button>
    </header>
  );
};
