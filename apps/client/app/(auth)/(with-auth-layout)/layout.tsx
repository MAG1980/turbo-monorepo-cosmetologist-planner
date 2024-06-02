export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2
        style={{
          color: "red",
          backgroundColor: "whitesmoke",
          textAlign: "center",
        }}
      >
        Auth Nested Layout
      </h2>
      {children}
    </section>
  );
}
