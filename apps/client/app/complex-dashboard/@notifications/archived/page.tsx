import { Card } from "@client/components/card";
import Link from "next/link";

export default function ArchivedNotifications() {
  return (
    <Card>
      <h1 className="text-center">Archived Notifications</h1>
      <div>
        <Link
          className="block text-center text-blue-500"
          href="/complex-dashboard"
        >
          Default
        </Link>
      </div>
    </Card>
  );
}
