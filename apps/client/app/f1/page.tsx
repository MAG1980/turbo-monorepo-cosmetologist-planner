import Link from "next/link";

export default function F1() {
  return (
    <div className="flex flex-col gap-4">
      <h1>F1 page</h1>
      <Link className="text-blue-500 underline" href="/f1/f2">
        Go to F2
      </Link>
      <Link className="text-blue-500 underline" href="/about">
        Go to About
      </Link>
      <Link className="text-blue-500 underline" href="/orders">
        Go to Orders
      </Link>
    </div>
  );
}
