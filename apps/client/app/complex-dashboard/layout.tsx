"use client";
import { useContext } from "react";
import { AuthContext } from "@client/components/contexts";

export default function DashboardLayout({
  login,
  notifications,
  users,
  revenue,
  children,
}: {
  login: React.ReactNode;
  notifications: React.ReactNode;
  users: React.ReactNode;
  revenue: React.ReactNode;
  children: React.ReactNode;
}) {
  const { isAuth } = useContext(AuthContext);
  return isAuth ? (
    <div>
      <div>{children}</div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>{users}</div>
          <div>{revenue}</div>
        </div>
        <div style={{ display: "flex", flex: 1 }}>{notifications}</div>
      </div>
    </div>
  ) : (
    login
  );
}
