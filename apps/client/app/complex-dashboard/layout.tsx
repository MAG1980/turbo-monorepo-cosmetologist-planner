export default function DashboardLayout({
  notifications,
  users,
  revenue,
  children,
}: {
  notifications: React.ReactNode;
  users: React.ReactNode;
  revenue: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>{children}</div>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>{users}</div>
          <div>{revenue}</div>
        </div>
        <div style={{ display: "flex", flex: 1 }}>{notifications}</div>
      </div>
    </div>
  );
}
