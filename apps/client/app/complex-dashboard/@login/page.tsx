import { Card } from "@client/components/card";
import Link from "next/link";

export default function Login() {
  return (
    <Card>
      <h1>
        Please,{" "}
        <span>
          <Link className="text-blue-500" href="/sign-in">
            login
          </Link>
        </span>
        to continue
      </h1>
    </Card>
  );
}
