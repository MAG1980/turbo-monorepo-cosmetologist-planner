import { NextRequest } from "next/server";
import { headers } from "next/headers";

export function GET(request: NextRequest) {
  const authorizationHeader = request.headers.get("Authorization");
  console.log({ authorizationHeader });
  const headersList = headers();
  console.log({ authorization: headersList.get("authorization") });
  return new Response("<h1>Profile API Data</h1>", {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
