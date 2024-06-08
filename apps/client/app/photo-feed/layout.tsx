export default function RootLayout({
  modal,
  children,
}: {
  modal: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section>
      {modal}
      {children}
    </section>
  );
}
