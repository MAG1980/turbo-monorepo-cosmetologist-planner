export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2
        style={{
          color: "blue",
          backgroundColor: "whitesmoke",
          textAlign: "center",
        }}
      >
        Orders Nested Layout
      </h2>
      {children}
    </section>
  );
}
