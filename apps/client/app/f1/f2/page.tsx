import Link from "next/link";

export default function f2() {
  return (
    <div>
      <h1>f2 page</h1>
      <Link className="text-blue-500 underline" href="/f1/f3">
        Go to F3
      </Link>
    </div>
  );
}
