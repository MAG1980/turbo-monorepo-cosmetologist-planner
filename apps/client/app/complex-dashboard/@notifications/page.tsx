import { Card } from "@client/components/card";
import Link from "next/link";

export default function Notifications() {
  return (
    <Card>
      <h1 className="text-center">Notifications</h1>

      <Link
        className="block text-center text-blue-500"
        href="/complex-dashboard/archived"
      >
        Archived
      </Link>
    </Card>
  );
}