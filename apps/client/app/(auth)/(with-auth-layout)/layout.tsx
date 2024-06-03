"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Sign up", href: "/sign-up" },
  { name: "Sign in", href: "/sign-in" },
  { name: "Forgot password", href: "/forgot-password" },
  { name: "Reset password", href: "/reset-password" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <>
      <nav>
        <ul className="flex justify-around gap-4">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={isActive ? "font-bold text-blue-500 mr-4" : ""}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
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
    </>
  );
}
