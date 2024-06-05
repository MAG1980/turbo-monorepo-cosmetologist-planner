import Link from "next/link";

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
        <Link href="/orders">Orders Nested Layout</Link>
      </h2>
      {children}
    </section>
  );
}
